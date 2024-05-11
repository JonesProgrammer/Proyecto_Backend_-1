const mongoose = require("mongoose");

const esquemaLibro = new mongoose.Schema({
    genero: { type: String, required: true },
    fecha_de_publicacion: { type: String, required: true },
    publicador: { type: String, required: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    id_autor: { type: String, required: true, immutable: true },
    eliminado: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Libro', esquemaLibro);
