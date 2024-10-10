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
        console.log("createUser", createUser);
        return createUser;
    }

    async authenticateUser(data) {
        const authenticateUser = await userModel.findOne({ email: data.email })
        if (!authenticateUser) {
            return authenticateUser;
        } 
        const checkPassword = await bcrypt.compare(data.password, authenticateUser.password);
        if (!checkPassword) {
            return false;
        }
        const processes = await ProcessModel.find({ "user": authenticateUser.id, "status": { $ne: "Concluído"}})
        if (processes == null) {
            return true
        }
        const secret = process.env.SECRET_TOKEN
        const token = jwt.sign({
            id: authenticateUser._id,
            type: authenticateUser.type,
            process: processes[0].id
        }, secret)
        return token;
    }

    async getUser(data) {
        try {
            const getUser = await userModel.findOne({ _id: data.id });
            return getUser;
        } catch (error) {
            throw Error("Houve problema ao buscar o usuário.");
        }
    }

    async updateUser(data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const updateUser = await userModel.findOneAndUpdate({ _id: data.id }, data);
        
        let infoCompare = {
            email: updateUser.email == data.email,
            password: updateUser.password == data.password
        }
        if (!Object.values(infoCompare).includes(false)) {
            return [updateUser, false];
        } 
        return [updateUser, true];
    }

    async deleteUser(data) {
        const deleteUser = await userModel.findOneAndDelete({ _id: data.id });
        return deleteUser;
    }
}