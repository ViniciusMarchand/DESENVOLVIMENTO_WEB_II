import Database from 'better-sqlite3';

import { dir } from '../dirroot.js';
console.log({ dir });

// faz o caminho ser AGNOSTICO ao Sistema operacional
import path from 'path';
const pathDB = path.join(dir, '..', 'dados.db');
console.log({ pathDB });

const db = new Database('dados.db', {
   verbose: console.log 
});

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        cpf VARCHAR(11) UNIQUE,
        role TEXT NOT NULL,
        avatar_url TEXT,
        created_at TEXT 
    )
`);


db.exec(`
    CREATE TABLE IF NOT EXISTS phones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT NOT NULL,
        user_id INTEGER,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        user_id INTEGER,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`);


export {
    db
}