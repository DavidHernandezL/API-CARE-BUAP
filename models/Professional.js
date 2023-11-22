const { Schema, model } = require('mongoose');

const professionalSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  type: {
    type: String,
    required: [true, 'El tipo es obligatorio'],
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
  },
  page: {
    type: String,
    required: [true, 'La página es obligatoria'],
  },
  address: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
  },
});

module.exports = model('Professional', professionalSchema);
