import jwt from 'jsonwebtoken';

function getUserByReq(req) {

    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.APP_SECRET);
    
    return user;
}

export {
    getUserByReq
}