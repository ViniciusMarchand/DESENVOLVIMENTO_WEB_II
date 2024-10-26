import { db } from "../config/database.js";

class PhoneDao {
    list() {
        const stmt = db.prepare('SELECT * FROM phones');
        // const stmt = db.prepare('SELECT name, email FROM users');
        const phones = stmt.all();
        
        return phones;
    }

    save({ number, user_id, createdAt }) {
        createdAt = createdAt && createdAt !== '' ? new Date(createdAt).toISOString() : new Date().toISOString();
        console.log({ number, user_id, createdAt });
        const stmt = db.prepare('INSERT INTO phones (number, user_id, created_at) VALUES (@number, @user_id, @createdAt)');
        stmt.run({number, user_id, createdAt});
    }

    delete(id) {
        const stmt = db.prepare('DELETE FROM phones WHERE user_id = ?');
        return stmt.run(id); 
    }
}

export {
    PhoneDao
}