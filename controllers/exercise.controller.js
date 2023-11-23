const bcrypt = require('bcryptjs');
const { Exercise } = require('../models/');
const { createAccessToken } = require('../utils');

const getExercises = async (req, res) => {
  const exercises = await Exercise.find().sort({ createdAt: -1 });
  res.json({
    status: 'success',
    msg: 'Ejercicios obtenidos',
    data: exercises,
  });
};

const getExercise = async (req, res) => {
  const { id } = req.params;

  const exercise = await Exercise.findById(id);

  if (!exercise) {
    return res.status(404).json({
      status: 'error',
      msg: 'Ejercicio no encontrado',
      data: { id },
    });
  }

  res.json({
    status: 'success',
    msg: 'Ejercicio obtenido',
    data: exercise,
  });
};

const createExercise = async (req, res) => {
  const { name, type, description, steps } = req.body;

  try {
    const exercise = new Exercise({
      name,
      type,
      description,
      steps,
    });

    const exerciseSaved = await exercise.save();
    res.json({ status: 'success', msg: 'Ejercicio creado', data: exercise.toJSON() });
  } catch (error) {
    console.log('create error', error);
    res.status(500).json({ status: 'error', msg: 'Fallo del servidor', data: error });
  }
};

const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...rest } = req.body;
    console.log(rest);

    console.log(rest);

    const userUpdate = await Exercise.findByIdAndUpdate(id, { ...rest }, { new: true });

    res.json({
      userUpdate,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', msg: 'Fallo del servidor', data: error });
  }
};

const deleteExercise = async (req, res) => {
  const { id } = req.params;

  await Exercise.findByIdAndDelete(id);

  res.json({
    status: 'success',
    msg: 'Ejercicio eliminado',
    data: { id },
  });
};
module.exports = {
  getExercises,
  createExercise,
  updateExercise,
  getExercise,
  deleteExercise,
};
