import { db } from "../config/database.js";

class EmailDao {
    list() {
        const stmt = db.prepare('SELECT * FROM emails');
        const emails = stmt.all();
        
        return emails;
    }

    save({ email, user_id, createdAt }) {
        console.log("AAAAAAAAAAA", { email, user_id, createdAt });
        const stmt = db.prepare('INSERT INTO emails (email, user_id, created_at) VALUES (@email, @user_id, @createdAt)');
        stmt.run({email, user_id, createdAt});
    }

    findByUserId(userId) {
        userId = parseInt(userId);
        console.log({ userId });
        const stmt = db.prepare('SELECT * FROM emails WHERE user_id = @userId');
        const emails = stmt.all({ userId });
        
        return emails;
    }
}

export {
    EmailDao
}