import { db } from "../config/database.js";

class PhoneDao {
    list() {
        const stmt = db.prepare('SELECT * FROM phones');
        // const stmt = db.prepare('SELECT name, email FROM users');
        const phones = stmt.all();
        
        return phones;
    }

    save({ number, user_id, createdAt }) {
        const stmt = db.prepare('INSERT INTO phones (number, user_id, created_at) VALUES (@number, @user_id, @createdAt)');
        stmt.run({number, user_id, createdAt});
    }

    findByUserId(userId) {
        userId = parseInt(userId);
        const stmt = db.prepare('SELECT * FROM phones WHERE user_id = @userId');
        const phones = stmt.all({ userId });
        
        return phones;
    }
}

export {
    PhoneDao
}