import AuthService from '../services/authService.js';
import ErrorHandler from '../utils/errorHandler.js';

export default class AuthController {

    async loginAccount(req, res, next) {
        try {
            const authService = new AuthService();
            const authenticateUser = await authService.authenticateUser(req.body);
            if (authenticateUser === null) {
                return next(new ErrorHandler(404, "O e-mail informado não está cadastrado."));
            }
            if (authenticateUser === true) {
                return next(new ErrorHandler(403, "Não foi possível encontrar um processo para esse usuário."));
            }
            if (authenticateUser === false) {
                return next(new ErrorHandler(401, "A senha informada está inválida."));
            }
            return res.status(200).json({ message: 'Login aprovado', token: authenticateUser });
        } catch (error) {
            // return next(new ErrorHandler(500, 'Erro ao tentar realizar o login'));
            return next(new ErrorHandler(500, error));
        }
    }

    async createAccount(req, res, next) {
        try {
            const authService = new AuthService();
            const createUser = await authService.createUser(req.body);
            return res.status(201).json(createUser);
        } catch (error) {
            return next(new ErrorHandler(500, error));
        }
    }

    async verifyToken(req, res, next) {
        try {
            const authService = new AuthService();
            const verifyAuthentication = await authService.verifyAuthentication(req.body);
            return res.status(200).json(verifyAuthentication)
        } catch (error) {
            return next(new ErrorHandler(500, error));
        }
    }

}