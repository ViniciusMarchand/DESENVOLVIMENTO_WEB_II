import { EmailDao } from "../models/email-dao.js";
import { PhoneDao } from "../models/phone-dao.js";
import { UserDao } from "../models/user-dao.js";
import { User } from "../models/user-model.js";

function listaUsers(req, res) {
    const userDao = new UserDao();

    const { pagina } = req.params;

    const usersRaw = userDao.list(pagina);

    // IDEALMENTE MAPEAMOS OS USERS (RAW/ BRUTA-CRUA DO BANCO DE DADOS PARA O MODEL USER)
    const users = usersRaw.map(u => new User(u.id, u.name, undefined, u.cpf, u.role, undefined));
    // no banco esta salvo como created_at (snake case)
    // no model estamos utilizando camelCase

    const data = {
        title: "WEB II",
        users
    }
    res.render('users-listagem', { data });
    // o return é opcional aqui, cuidado para nao dar dois renders ao mesmo tempo
}

function paginaAddUser(req, res) {
    const data = {
        title: "WEB II - Add User",
    }
    res.render('users-formulario', { data });
}

// TRATAMENTO DE ERROS
// TRATAMENTO DE INPUT (REQ.BODY TEM QUE SER VALIDO)
// LOGS
// TRATAMENTO DE ERRO COM O BANCO
// AUTENTICACAO
// AUTORIZAÇÃO
function addUser(req, res) {
    try {
        const userDao = new UserDao();

        const dados = req.body;

        const emailDao = new EmailDao();
        const phoneDao = new PhoneDao();
        try {
            const newUser = new User(dados.name, dados.password, dados.cpf, dados.role);
            const lastIdCreated = userDao.save(newUser).lastInsertRowid;

            if (Array.isArray(dados.email)) {
                dados.email.forEach(email => {
                    emailDao.save({
                        email,
                        user_id: lastIdCreated,
                        createdAt: new Date().toISOString()
                    });
                });
            } else {
                emailDao.save({
                    email: dados.email,
                    user_id: 1,
                    createdAt: new Date().toISOString()
                });
            }

            if (Array.isArray(dados.phone)) {
                dados.phone.forEach(phone => {
                    phoneDao.save({
                        number:phone,
                        user_id: lastIdCreated,
                        createdAt: new Date().toISOString()
                    });
                });
            } else {
                phoneDao.save({
                    number: dados.phone,
                    user_id: 1,
                    createdAt: new Date().toISOString()
                });
            }

        } catch (error) {
            // por exemplo, o cpf já existe 
            res.status(400).send(error.message);
        }
        res.redirect("/users");
    } catch (error) {
        res.status(500).send("HOUVE UM ERRO AO ADICIONAR USUARIO");
    }
}


function detalhaUser(req, res) {
    const { id } = req.params;
    // consulta o banco
    // vai carregar o dados
    // vai mandar para a tua view
    res.send("DETALHES DO USUARIO ID " + id);
}


async function paginaUpdateUser(req, res) {
    const { id } = req.params;
    const userDao = new UserDao();
    const emails = await userDao.getEmailsByUserId(id); 
    const phones = await userDao.getPhonesByUserId(id); 

    
    try {
        const user = await userDao.getById(id); 
        const data = {
            title: "WEB II - Update User",
            user,
            emails,
            phones
        };
        // console.log({ data });
        // console.log(data.emails);
        // console.log(data.phones);
        res.render('users-update', { data });
    } catch (error) {
        res.status(500).send("Erro ao carregar os dados do usuário.: " + error.message);
    }
}


async function updateUser(req, res) {
    const { id } = req.params;
    const userDao = new UserDao();
    const emailDao = new EmailDao();
    const phoneDao = new PhoneDao();
    
    const dados = req.body;

    console.log({ dados });

    try {
        userDao.update(id, {
            name: dados.name,
            password: dados.password, 
        });

        
        await emailDao.delete(id);

        // Atualiza os emails
        if (Array.isArray(dados['emails[]'])) {
            dados['emails[]'].forEach((email, index) => {
                emailDao.save({
                    email,
                    user_id: id,
                    createdAt: dados['emailCreatedAt[]'][index]
                });
            });
        } else {
            emailDao.save({
                email: dados['emails[]'],
                user_id: id,
                createdAt: dados['emailCreatedAt[]']
            });
        }

        // Deleta todos os telefones antigos relacionados ao usuário
        await phoneDao.delete(id);

        // Atualiza os telefones
        if (Array.isArray(dados['phones[]'])) {
            dados['phones[]'].forEach((phone, index) => {
                phoneDao.save({
                    number: phone,
                    user_id: id,
                    createdAt: dados['phoneCreatedAt[]'][index]
                });
            });
        } else {
            phoneDao.save({
                number: dados['phones[]'],
                user_id: id,
                createdAt: dados['phoneCreatedAt[]']
            });
        }

        res.redirect("/users");
    } catch (error) {
        res.status(500).send("Erro ao atualizar usuário: " + error);
    }
}


export {
    addUser,        // O cpf tem que  ser unico + o perfil (ADMIN/CLIENTE) já é setado na etapa inicial
    listaUsers,     // paginacao (a cada 5) e filtro (pelo nome)
    paginaAddUser,
    // detalhes de usuario  (ver todos os dados de usuario + telefones, emails)
    // exclusao de usuario  (NAO POSSO REMOVER ADMINS)
    // update de usuario (EXCETO PERFIL (admin/cliente) e CPF, todos os outros dados do usuario, telefones e emails podem ser atualizados inclusive setando qual o email/telefone principal)

    // usuario tem que ter multiplos telefones (apenas 1 principal) 1:m
    // usuario tem que ter multiplos emails (apenas 1 principal)    1:m

    // INDIVIDUAL ou DUPLA E VCS TEM DUAS SEMANAS =)

    detalhaUser,
    paginaUpdateUser,
    updateUser
};
