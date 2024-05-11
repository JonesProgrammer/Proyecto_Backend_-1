const Usuario = require("./usuario.model.js");
const ControladorAutenticacion = require("../Autenticacion/Autent.js")
const argon2 = require('argon2');

async function obtenerUsuarioMongo(filtros = {}) {
  filtros.eliminado = filtros.eliminado || false;
  const usuario = await Usuario.findOne(filtros);
  return { Usuario: usuario };
}

async function obtenerUsuarioPorIdMongo(id) {
  return await Usuario.findById(id);
}

async function crearUsuarioMongo(datos) {
  const hashed = await argon2.hash(datos.contraseña);
  const datos_hash = {
    nombre: datos.nombre,
    correo: datos.correo,
    contraseña: hashed
  };
  return { usuario: await Usuario.create(datos_hash) };
}

async function iniciarSesionUsuarioMongo(datos) {
  const { correo, contraseña } = datos;
  const usuario = await Usuario.findOne({ correo });
  if (!await argon2.verify(usuario.contraseña, contraseña)) {
    return res.status(500);
  }
  const payload = { _id: usuario.id };
  try {
    return ControladorAutenticacion.generarToken(payload);
  } catch (error) {
    console.log(error);
  }
}

async function actualizarUsuarioMongo(id, actualizacion) {
  return await Usuario.findByIdAndUpdate(id, actualizacion);
}

async function eliminarUsuarioMongo(id) {
  return await Usuario.findByIdAndUpdate(id, { eliminado: true });
}

module.exports = {
  obtenerUsuarioMongo,
  obtenerUsuarioPorIdMongo,
  actualizarUsuarioMongo,
  crearUsuarioMongo,
  iniciarSesionUsuarioMongo,
  eliminarUsuarioMongo,
};
