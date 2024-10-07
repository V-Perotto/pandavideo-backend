const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json(
          { message: 'Usuário e senha são obrigatórios!' }
        );
    }
    if (password.length < 8) {
        return res.status(400).json(
          { message: 'A senha deve ter pelo menos 8 caracteres.' }
        );
    }

    const user = new User({ username, password });
    await user.save();
    
    const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao se conectar', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json(
        { message: 'Usuário e senha são obrigatórios!' }
      );
    }

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(
        { message: 'Credenciais inválidas.' }
      );
    }
    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao entrar na conta', error });
  }
};
