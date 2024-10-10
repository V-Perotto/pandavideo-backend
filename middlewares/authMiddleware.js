import jwt from 'jsonwebtoken';

export default class AuthMiddleware {

    async protect(req, res, next) {
        try {
            let token;
            if (req.headers.authorization && 
                req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }
            if (!token) {
                return res.status(401).json(
                    { message: 'Não autorizado: sem token.', error: error.message }
                );
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json(
                { message: 'Não autorizado: token falhou.', error: error.message }
            );
        }
    }
}

