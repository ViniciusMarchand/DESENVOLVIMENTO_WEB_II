import { EmailDao } from "../models/email-dao.js";
import { Email } from "../models/email-model.js";
import { PhoneDao } from "../models/phone-dao.js";
import { Phone } from "../models/phone-model.js";
import { UserDao } from "../models/user-dao.js";
import { User } from "../models/user-model.js";

function listaUsers(req, res) {
    const userDao = new UserDao();

    const pagina  = req.query.pagina;

    const name = req.query.name;

    if(!pagina)
        res.redirect("/users?pagina=1")

    let usersRaw, totalUsers;
    
    if(name==undefined || name==""){
        usersRaw = userDao.list(pagina);  
        totalUsers = userDao.totalUsers();
    } else {
        usersRaw = userDao.listByName(pagina, name);
        totalUsers = userDao.totalUsersByName(name);
    }

    const totalPages = Math.ceil(totalUsers / 5);

    // IDEALMENTE MAPEAMOS OS USERS (RAW/ BRUTA-CRUA DO BANCO DE DADOS PARA O MODEL USER)
    const users = usersRaw.map(u => new User(u.id, u.name, undefined, u.cpf, u.role, undefined));
    // no banco esta salvo como created_at (snake case)
    // no model estamos utilizando camelCase

    const usersWithEmails = users.map(u => {
        const emilDao = new EmailDao();
        const telefoneDao = new PhoneDao();
        
        const emailsRaw = emilDao.findByUserId(u.id);
        const telefonesRaw = telefoneDao.findByUserId(u.id);
        const emails = emailsRaw.map(e => new Email(e.id, e.email, e.user_id, e.created_at));
        const telefones = telefonesRaw.map(t => new Phone(t.id, t.number, t.user_id));

        return {
            ...u,
            emails: emails,
            telefones: telefones
        }
    });
    
    console.log({ usersWithEmails });

    const data = {
        title: "WEB II",
        users: usersWithEmails,
        totalPages,
        pagina,
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
            const newUser = new User(0, dados.name, dados.password, dados.cpf, dados.role);
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
                    user_id: lastIdCreated,
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
                    user_id: lastIdCreated,
                    createdAt: new Date().toISOString()
                });
            }
        } catch (error) {
            // por exemplo, o cpf já existe 
            res.status(400).send(error.message);
        }
        res.redirect("/users?pagina=1");
    } catch (error) {
        res.status(500).send("HOUVE UM ERRO AO ADICIONAR USUARIO");
    }
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

async function paginaDetailsUser(req, res) {
    const { id } = req.params;

    try {
        const userDao = new UserDao();
        const emails = await userDao.getEmailsByUserId(id);
        const phones = await userDao.getPhonesByUserId(id);
    
        const user = await userDao.getById(id);
    
        const data = {
            title: "WEB II - Detalhes do Usuário",
            user,
            emails,
            phones
        };

        console.log(data.phones)
    
        res.render('users-details', { data });
        
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

async function deleteUser(req, res) {
    const { id } = req.params;
    const userDao = new UserDao();
    const emailDao = new EmailDao();
    const phoneDao = new PhoneDao();

    try {
        const user = userDao.findByUserId(id);
        if (user.role === 'ADMIN') {
            res.status(400).send("Não é possível deletar um usuário administrador.");
            return;
        }

        emailDao.delete(id);
        phoneDao.delete(id);
        userDao.delete(id);

        res.redirect("/users");
    } catch (error) {
        res.status(500).send("Erro ao deletar usuário: " + error);
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

    // detalhaUser,
    paginaUpdateUser,
    updateUser,
    deleteUser,
    paginaDetailsUser
};
