const Libro = require("./libro.model");

async function obtenerLibroMongo(filtros = {}) {
    filtros.eliminado = filtros.eliminado || false;
    const libroFiltrado = await Libro.find(filtros, { eliminado: 0, creadoEn: 0, actualizadoEn: 0, autor_id: 0 });
    return { resultados: libroFiltrado };
}

async function obtenerUnicoLibroMongo(id) {
    return await Libro.findById(id);
}

async function crearLibroMongo(datos) {
    return await Libro.create(datos);
}

async function actualizarLibroMongo(id, cambios) {
    return await Libro.findByIdAndUpdate(id, cambios);
}

async function eliminarLibroMongo(id) {
    return await Libro.findByIdAndUpdate(id, { eliminado: true });
}

module.exports = {
    crearLibroMongo,
    obtenerUnicoLibroMongo,
    obtenerLibroMongo,
    actualizarLibroMongo,
    eliminarLibroMongo,
};
