import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import userModel from '../models/userModel.js';

export default class AuthService {

    async createUser(data) {        
        const userExists = await userModel.find({
            email: data.email
        });
        if (userExists.length > 0) {
            return { 
                status: false, 
                message: "Esse usuário já existe." 
            };
        }
        if (data.password.length < 8) {
            return { 
                status: false, 
                message: "O tamanho da senha é inválido, insira outra senha." 
            };
        }
        data.password = await bcrypt.hash(data.password, 10);
        data.token = "";
        const userCreated = await userModel.create(data);
        return { status: true, message: userCreated };
    }

    async authenticateUser(data) {
        const authenticateUser = await userModel.findOne({ 
            email: data.email 
        });
        if (!authenticateUser) {
            return { status: null, message: "O e-mail informado não está cadastrado." };
        }
        const checkPassword = await bcrypt.compare(
            data.password, 
            authenticateUser.password
        );
        if (!checkPassword) {
            return { status: false, message: "A senha informada está inválida." };
        }
        const token = jwt.sign(
            { id: authenticateUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        await userModel.findOneAndUpdate(
            { _id: authenticateUser._id }, 
            { $set: { token: token } },
            { new: true}
        );
        return { status: true, message: token };
    }

    async getUsers() {
        const users = await userModel.find({});
        return users;
    }
}