// DAO DATA ACCESS OBJECT

// DAO X REPOSITORY
/*

    DAO => RELACIONADO DIRETAMENTE AO BANCO DE DADOS** DA TUA APLICAÇÃO
        LIST USER

    REPOSITORY => RELACIONA OS DADOS COM REGRAS NEGOCIO
        LIST ACTIVE USERS

    PARA MAIORIA DOS CASOS, EXEMPLOS, AULAS, PROJETOS REAIS
        ELES REPRESENTAM A MESMA


    ** PERSISTENCIA DE DADOS


    SERVICE VS REPOSITORY
        SERVICE SE COMPORTA DE MANEIRA PARECIDA COM A DO CONTROLLER EM UM MVC
        O REPOSITORY ELE MISTURA O ACESSO A INFORMAÇÃO (BANCO DE DADOS) COM FILTROS, REGRAS, ETC

*/


import { db } from "../config/database.js";

class UserDao {
    list(pagina) {
        const stmt = db.prepare('SELECT * FROM "users"');
        const users = stmt.all({pagina});
        // console.log({ users })
        
        return users;
    }

    save({ name, password, cpf, role, createdAt }) {
        const stmt = db.prepare('INSERT INTO users (name, password, cpf, role, created_at) VALUES (@name, @password, @cpf, @role, @createdAt)');
        return stmt.run({name, password, cpf, role, createdAt});
    }
}

export {
    UserDao
}