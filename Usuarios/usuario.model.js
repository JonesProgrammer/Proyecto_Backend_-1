const mongoose = require("mongoose");

const esquemaUsuario = new mongoose.Schema({
    correo: { type: String, required: true, unique: [true, "Este correo ya esta en uso"] },
    nombre: { type: String, required: true },
    contraseña: { type: String, required: true },
    eliminado: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Usuario", esquemaUsuario);
