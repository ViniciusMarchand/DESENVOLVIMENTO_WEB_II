import { db } from "../config/database.js";

class EmailDao {
    list() {
        try {
            const stmt = db.prepare('SELECT * FROM emails');
            const emails = stmt.all();
            
            return emails;
        } catch (error) {
            console.error(error);
        }
    }
    
    save({ email, user_id, createdAt }) {
        try {
            createdAt = createdAt && createdAt !== '' ? new Date(createdAt).toISOString() : new Date().toISOString();
            console.log({ email, user_id, createdAt });
            const stmt = db.prepare('INSERT INTO emails (email, user_id, created_at) VALUES (@email, @user_id, @createdAt)');
            stmt.run({email, user_id, createdAt});
        } catch (error) {
            console.error(error);
        }
    }
    
    delete(id) {
        try {
            const stmt = db.prepare('DELETE FROM emails WHERE user_id = ?');
            return stmt.run(id); 
        } catch (error) {
            console.error(error);
        }
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