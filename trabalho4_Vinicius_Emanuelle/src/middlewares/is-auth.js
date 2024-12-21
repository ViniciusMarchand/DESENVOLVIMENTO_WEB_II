import jsonwebtoken from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    // valida jwt e insere o usuario no req
    const token = req.headers.authorization?.split(' ')[1] ?? null;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const user = jsonwebtoken.verify(token, process.env.APP_SECRET);

        if(!user.valid){
            return res.status(401).json({ error: 'Valide seu email' });
        }

        req.user = user;
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

export { isAuth };