// controllers/userController.js

//ARRUMAR ERRO: colocar o nome certo no arquivo do model (antes estava ../models/userService).
const userModel = require('../models/userModel');


//ARRUMAR ERRO: EXPORTAR FUNÇÃO.
exports.getAllUsers = async (req, res) => {
  try {
    //ARRUMAR ERRO: NOME DOS MÉTODOS DO USERMODEL.
    const users = await userModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//ARRUMAR ERRO: EXPORTAR FUNÇÃO.
exports.getUserById = async (req, res) => {
  try {
    //ARRUMAR ERRO: NOME DOS MÉTODOS DO USERMODEL.
    const user = await userModel.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//ARRUMAR ERRO: EXPORTAR FUNÇÃO.
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    //ARRUMAR ERRO: NOME DOS MÉTODOS DO USERMODEL.
    const newUser = await userModel.create(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//ARRUMAR ERRO: EXPORTAR FUNÇÃO.
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    //ARRUMAR ERRO: NOME DOS MÉTODOS DO USERMODEL.
    const updatedUser = await userModel.update(req.params.id, name, email);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//ARRUMAR ERRO: EXPORTAR FUNÇÃO.
exports.deleteUser = async (req, res) => {
  try {
    //ARRUMAR ERRO: NOME DOS MÉTODOS DO USERMODEL.
    const deletedUser = await userModel.delete(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


