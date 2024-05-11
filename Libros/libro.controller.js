const { crearLibroMongo, obtenerLibroMongo, eliminarLibroMongo, actualizarLibroMongo, obtenerUnicoLibroMongo } = require("./libro.actions");

async function obtenerLibrosFiltrados(consulta) {
    return await obtenerLibroMongo(consulta);
}

async function obtenerLibroPorId(id) {
    return await obtenerUnicoLibroMongo(id);
}

async function crearLibro(datos, id) {
    datos["autor_id"] = id;
    return await crearLibroMongo(datos);
}

function actualizarLibro(datos) {
    const { _id, ...cambios } = datos;
    return actualizarLibroMongo(_id, cambios);
}

function eliminarLibro(id) {
    return eliminarLibroMongo(id);
}

module.exports = {
    obtenerLibrosFiltrados,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};
