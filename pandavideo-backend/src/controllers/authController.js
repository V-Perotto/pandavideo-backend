import AuthService from '../services/authService.js';
import ErrorHandler from '../utils/errorHandler.js';

export default class AuthController {

    async loginAccount(req, res, next) {
        try {
            const authService = new AuthService();
            const response = await authService.authenticateUser(req.body);
            if (response.status === null) {
                return next(new ErrorHandler(
                    404, response.message
                ));
            }
            if (response.status === false) {
                return next(new ErrorHandler(
                    401, `Erro de status False: {response.message}`
                ));
            }
            return res.status(200).json({ 
                message: 'Login aprovado', 
                token: response.message 
            });
        } catch (error) {
            return next(new ErrorHandler(
                500, `Erro ao tentar realizar o login: ${error}`
            ));
        }
    }

    async createAccount(req, res, next) {
        try {
            const { password } = req.body;
            const authService = new AuthService();
            const response = await authService.createUser(req.body);
            if (response.status) {
                const authenticateUser = await authService.authenticateUser(
                    { email: req.body.email, password: password }
                );
                return res.status(201).json(authenticateUser);
            }
            return next(new ErrorHandler(400, `Erro de campos ao criar conta ${response.message}`));
        } catch (error) {
            return next(new ErrorHandler(500, `Erro ao criar conta: ${error}`));
        }
    }

    async getUsers(req, res, next) {
        try {
            const authService = new AuthService();
            const users = await authService.getUsers(req.body);
            return res.status(200).json(users)
        } catch (error) {
            return next(new ErrorHandler(500, error.message));
        }
    }

}