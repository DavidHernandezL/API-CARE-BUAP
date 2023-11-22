const bcrypt = require('bcryptjs');
const { User } = require('../models/');
const { createAccessToken } = require('../utils');

const getUsers = async (req, res) => {
  const { limit = 5 } = req.query;
  let users = [];

  if (!limit) {
    users = await User.find().sort({ createdAt: -1 });
  } else {
    users = await User.find().sort({ createdAt: -1 }).limit(parseInt(limit));
  }
  res.json({
    status: 'success',
    msg: 'Usuarios obtenidos',
    data: users,
  });
};

const createUser = async (req, res) => {
  const { fullName, studentId, email, password, image } = req.body;

  const isEmailRegistered = await User.findOne({ email });

  if (isEmailRegistered) {
    return res.status(400).json({
      status: 'error',
      msg: 'El correo ya está registrado',
      data: { email },
    });
  }

  const isStudentIdRegistered = await User.findOne({ studentId });

  if (isStudentIdRegistered) {
    return res.status(400).json({
      status: 'error',
      msg: 'La matricula ya está registrada',
      data: { studentId },
    });
  }

  try {
    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(password, salt);
    const user = new User({
      fullName,
      studentId,
      email,
      password: passwordEncrypted,
      image,
    });

    const userSaved = await user.save();

    const token = await createAccessToken({ id: userSaved._id }, '30d');
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.json({ status: 'success', msg: 'Usuario creado', data: userSaved.toJSON() });
  } catch (error) {
    res.status(500).json({ status: 'error', msg: 'Fallo del servidor', data: error });
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
  getUsers,
  createUser,
  updateUser,
};
