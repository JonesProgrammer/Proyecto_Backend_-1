const Pedido = require("./pedido.model");

async function obtenerPedidoMongo(filtros, id) {
  if (!filtros.hasOwnProperty("eliminado")) {
    filtros["eliminado"] = false
  }
  filtros["comprador_id"] = id
  const pedidoFiltrado = await Pedido.find(filtros, {eliminado: 0, creadoEn:0, actualizadoEn:0, comprador_id:0, vendedor_id:0});

  return {
    resultados: pedidoFiltrado,
  };
}

async function obtenerPedidoPorIdMongo(id) {
  const pedido = Pedido.findById(id)
  return pedido
}

async function crearPedidoMongo(datos) {
  const pedidoCreado = await Pedido.create(datos);

  return pedidoCreado;
}

async function actualizarPedidoMongo(id, estado) {
  await Pedido.findByIdAndUpdate({ _id: id }, { estado: estado, eliminado: true })
    .then((resultado) => {
      return resultado;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

async function eliminarPedidoMongo(id) {
  const resultado = await Pedido.findByIdAndUpdate(id, {eliminado:true});

  return resultado;
}

module.exports = {
  crearPedidoMongo,
  obtenerPedidoMongo,
  obtenerPedidoPorIdMongo,
  actualizarPedidoMongo,
  eliminarPedidoMongo,
};
