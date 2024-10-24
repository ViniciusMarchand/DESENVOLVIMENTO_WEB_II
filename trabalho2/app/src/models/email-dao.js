import { db } from "../config/database.js";

class EmailDao {
    list() {
        const stmt = db.prepare('SELECT * FROM emails');
        const emails = stmt.all();
        
        return emails;
    }

    save({ email, user_id, createdAt }) {
        const stmt = db.prepare('INSERT INTO emails (email, user_id, created_at) VALUES (@email, @user_id, @createdAt)');
        stmt.run({email, user_id, createdAt});
    }
}

export {
    EmailDao
}