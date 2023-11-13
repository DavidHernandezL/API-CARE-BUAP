const bcrypt = require('bcryptjs');
const { User } = require('../models/');
const { createAccessToken } = require('../utils');

const getUser = async (req, res) => {
  const { id } = req.user;

  const userFounded = await User.findById(id);

  if (!userFounded) return res.status(400).json({ msg: 'El usuario no existe' });

  res.json(userFounded);
};

const createUser = async (req, res) => {
  const { fullName, studentId, email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(password, salt);
    const user = new User({
      fullName,
      studentId,
      email,
      password: passwordEncrypted,
    });

    const userSaved = await user.save();
    const token = await createAccessToken({ id: userSaved._id }, '30d');
    res.cookie('token', token);
    res.json(userSaved);
  } catch (error) {
    

    res.status(500).json({
      msg: 'Fallo en el servidor',
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { password, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const userUpdate = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    userUpdate,
  });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
};
