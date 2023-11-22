const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  type: {
    type: String,
    required: [true, 'El tipo es obligatorio'],
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
  },
  steps: [
    {
      type: String,
      required: [true, 'Los pasos son obligatorios'],
    },
  ],
});

module.exports = model('Exercise', exerciseSchema);
