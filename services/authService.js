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

        data.password = await bcrypt.hash(data.password, 8);
        const createUser = await userModel.create(data);
        return createUser;
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
            { expiresIn: '10m' }
        );
        await userModel.findOneAndUpdate(
            { _id: data.id }, 
            { token: token}
        );
        return token;
    }

    async verifyAuthentication(data) {
        const verification = await userModel.findOne({ 
            id: data._id,
            token: data.token 
        });
        const compareToken = await compare(
            verification.token,
            data.token
        )
        if (!compareToken) {
            return false;
        }
        return true;
    }
}