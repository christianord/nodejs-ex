var mongoose = require('mongoose');

var usuarioSchema = new mongoose.Schema({

    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    email: { type: String, unique: true, required: [true, 'El email es requerido'] },
    password: { type: String, required: [true, 'El password es requerido'] },
    imagen: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE' }
});

module.exports = mongoose.model('Usuario', usuarioSchema);