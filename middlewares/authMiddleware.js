import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export default class AuthMiddleware {

    static async protect(req, res, next) {
        try {
            let token;
            if (req.headers && 
                req.headers.bearer) {
                token = req.headers.bearer;
            }
            if (!token) {
                return res.status(401).json(
                    { message: 'Não autorizado: sem token.'}
                );
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const userToVerify = await userModel.findOne({ 
                _id: decoded.id
            });
            if (!userToVerify || userToVerify.token !== token) {
                return res.status(401).json({ message: 'Não autorizado: token inválido.' });
            }
            req.id = decoded;
            next();
        } catch (error) {
            res.status(401).json(
                { message: 'Não autorizado: token falhou.', error: error.message }
            );
        }
    }
}

