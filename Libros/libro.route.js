const express = require("express");
const enrutador = express.Router();
const {
    obtenerLibrosFiltrados,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro,
} = require("./libro.controller.js");

const Autenticacion = require("../Autenticacion/Autent.js");

enrutador.get("/", async (req, res) => {
    try {
        res.status(200).json(await obtenerLibrosFiltrados(req.query));
    } catch (e) {
        res.status(500).json({ msg: "" });
    }
});

enrutador.get("/:id", async (req, res) => {
    try {
        res.status(200).json({ Libro_Hallado: await obtenerLibroPorId(req.params.id) });
    } catch (e) {
        res.status(500).json({ msg: "" });
    }
});

enrutador.post("/", async (req, res) => {
    try {
        const token = Autenticacion.cookiesJWT(req, res);
        if (token !== "Invalid") {
            await crearLibro(req.body, token._id);
            res.status(200).json({ mensaje: "Creado con exito. 👍" });
        } else {
            res.status(500).json({ error: "Token Invalido" });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

enrutador.patch("/", async (req, res) => {
    try {
        const token = Autenticacion.cookiesJWT(req, res);
        const libro = await obtenerLibroPorId(req.body._id);
        if (token !== "Invalid" && libro.id_autor === token._id) {
            await actualizarLibro(req.body);
            res.status(200).json({ mensaje: "Actualizado con exito. 👍" });
        } else {
            res.status(500).json({ mensaje: "Token invalido" });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

enrutador.delete("/:id", async (req, res) => {
    try {
        const token = Autenticacion.cookiesJWT(req, res);
        const libro = await obtenerLibroPorId(req.params.id);
        if (token !== "Invalid" && libro.id_autor === token._id) {
            await eliminarLibro(req.params.id);
            res.status(200).json({ mensaje: "Eliminado con exito. 👍" });
        } else {
            res.status(500).json({ mensaje: "Token invalido" });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

enrutador.get("/", obtenerLibrosFiltrados);
enrutador.get("/:id", obtenerLibroPorId);
enrutador.post("/", crearLibro);
enrutador.patch("/", actualizarLibro);
enrutador.delete("/:id", eliminarLibro);

module.exports = enrutador;
