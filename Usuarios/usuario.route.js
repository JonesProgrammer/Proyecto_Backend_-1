const express = require("express");
const enrutador = express.Router();

const {
  obtenerUsuario,
  crearUsuario,
  encontrarUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesionUsuario,
} = require("./usuario.controller.js");
const ControladorAutenticacion = require("../Autenticacion/Autent.js");

enrutador.get("/", async (req, res) => {
  try {
    const token = ControladorAutenticacion.cookiesJWT(req, res);
    if (token !== "Invalid") {
      res.status(200).json(await obtenerUsuario(req.query));
    } else {
      res.status(500).json({ error: "Token invalido" });
    }
  } catch (e) {
    res.status(500).json({ msg: "No se encontraron datos" });
  }
});

enrutador.post("/", async (req, res) => {
  try {
    const usuario = await crearUsuario(req.body);
    const cookie = await iniciarSesionUsuario(req.body);
    res.cookie("token", cookie, { httpOnly: true });
    res.status(200).json({ msg: "El usuario ha sido creado exitosamente" });
  } catch (e) {
    res.status(500).json({ msg: e.code == 11000 ? "Correo ya en uso" : "No se pudo crear el usuario" });
  }
});

enrutador.post("/login", async (req, res) => {
  try {
    const cookie = await iniciarSesionUsuario(req.body);
    res.cookie("token", cookie, { httpOnly: true });
    res.status(200).json({ msg: "Ingreso Exitoso" });
  } catch (e) {
    res.status(500).json({ msg: "No se pudo hacer login al usuario" });
  }
});

enrutador.patch("/", async (req, res) => {
  try {
    const token = ControladorAutenticacion.cookiesJWT(req, res);
    const usuario = await encontrarUsuarioPorId(req.body._id);
    if (usuario && token._id === usuario.id && token != "Invalid") {
      actualizarUsuario(req.body);
      res.status(200).json({ mensaje: "Exito. 👍" });
    } else {
      res.status(500).json({ mensaje: "Token o id Invalida" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

enrutador.delete("/:id", async (req, res) => {
  try {
    const token = ControladorAutenticacion.cookiesJWT(req, res);
    const usuario = await encontrarUsuarioPorId(req.params.id);
    if(token !== "Invalid" && token._id === usuario.id){
      eliminarUsuario(req.params.id);
      res.status(200).json({ mensaje: "Exito. 👍" });
    } else {
      res.status(200).json({ mensaje: "Token Invalido" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = enrutador;
