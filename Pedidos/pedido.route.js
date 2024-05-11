const express = require("express");
const enrutador = express.Router();
const {
  obtenerPedidosFiltrados,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
} = require("./pedido.controller.js");
const Autenticacion = require("../Autenticacion/Autent.js");

async function obtenerPedidos(req, res) {
  try {
    token = Autenticacion.cookiesJWT(req, res);
    if (token !== "Invalid") {
      const resultadosBusqueda = await obtenerPedidosFiltrados(req.query, token._id);
      res.status(200).json({
        ...resultadosBusqueda,
      });
    } else {
      res.status(500).json({
        error: "Token Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function ObtenerPedidoPorId(req, res) {
  try {
    token = Autenticacion.cookiesJWT(req, res);
    if (token !== "Invalid") {
      const resultadoBusqueda = await obtenerPedidoPorId(req.params.id, token._id);
      res.status(200).json({
        pedido:resultadoBusqueda
      });
    } else {
      res.status(500).json({
        error: "Token Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function publicarPedido(req, res) {
  try {
    token = Autenticacion.cookiesJWT(req, res);
    if (token !== "Invalid") {
      await crearPedido(req.body, token._id);
    } else {
      res.status(500).json({
        error: "Token Invalida",
      });
    }
    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

async function parchearPedido(req, res) {
  try {
    token = Autenticacion.cookiesJWT(req, res);
    pedidoParaCambiar = await obtenerPedidoPorId(req.params.id);
    if (
      token !== "Invalid" &&
      pedidoParaCambiar !== undefined &&
      token._id === pedidoParaCambiar.comprador_id
    ) {
      if (
        req.params.estado !== "Cancelado" ||
        req.params.estado !== "Completado"
      ) {
        actualizarPedido(req.params.id, req.params.estado);
      }else{
        res.status(500).json({
          mensaje: "Error de estado",
        });
      }
      res.status(200).json({
        mensaje: "Exito. 👍",
      });
    } else {
      res.status(500).json({
        error: "Token o ID de pedido Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

enrutador.get("/", obtenerPedidos);
enrutador.get("/:id", ObtenerPedidoPorId);
enrutador.post("/", publicarPedido);
enrutador.patch("/:id/:estado", parchearPedido);

module.exports = enrutador;
