const { crearUsuarioMongo, obtenerUsuarioMongo, eliminarUsuarioMongo, actualizarUsuarioMongo, iniciarSesionUsuarioMongo, obtenerUsuarioPorIdMongo } = require("./usuario.actions");

async function obtenerUsuario(consulta) {
    return await obtenerUsuarioMongo(consulta);
}

async function encontrarUsuarioPorId(id) {
    return await obtenerUsuarioPorIdMongo(id);
}

async function iniciarSesionUsuario(datos) {
    return await iniciarSesionUsuarioMongo(datos);
}

async function crearUsuario(datos) {
    return await crearUsuarioMongo(datos);
}

function actualizarUsuario(datos) {
    const { _id, ...cambios } = datos;
    return actualizarUsuarioMongo(_id, cambios);
}

function eliminarUsuario(id) {
    return eliminarUsuarioMongo(id);
}

module.exports = {
    obtenerUsuario,
    encontrarUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    iniciarSesionUsuario,
    eliminarUsuario
};
