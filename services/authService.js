import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import userModel from '../models/userModel.js';

export default class AuthService {

    async createUser(data) {        
        const userExists = await userModel.find({
            email: data.email
        });
        if (userExists.length > 0) {
            throw Error("Esse usuário já existe.");
        }
        if (data.password.length < 8) {
            throw Error("O tamanho da senha é inválido, insira outra senha.");
        }
        data.password = await bcrypt.hash(data.password, 10);
        data.token = "";
        await userModel.create(data);
        return true;
    }

    async authenticateUser(data) {
        const authenticateUser = await userModel.findOne({ 
            email: data.email 
        });
        const checkPassword = await bcrypt.compare(
            data.password, 
            authenticateUser.password
        );
        if (!checkPassword) {
            return false;
        }
        const token = jwt.sign(
            { id: authenticateUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        const teste = await userModel.findOneAndUpdate(
            { _id: authenticateUser._id }, 
            { $set: { token: token } },
            { new: true}
        );
        return token;
    }

    async getUsers() {
        const users = await userModel.find({});
        return users;
    }
}