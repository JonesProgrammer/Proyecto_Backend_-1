const { crearPedidoMongo, obtenerPedidoMongo, eliminarPedidoMongo, actualizarPedidoMongo, obtenerPedidoPorIdMongo} = require("./pedido.actions");

async function obtenerPedidosFiltrados(consulta, id) {
    
    const resultadosBusqueda = await obtenerProductoMongo(consulta, id);

    return resultadosBusqueda;
}

async function obtenerPedidoPorId(id) {
    
    const pedido = await obtenerProductoPorIdMongo(id);

    return pedido;
}

async function crearPedido(datos, id) {

    datos["comprador_id"] = id
    const pedidoCreado = await crearPedidoMongo(datos);

    return pedidoCreado;
}


function actualizarPedido(id, estado) {

    const pedidoActualizado = actualizarPedidoMongo(id, estado);

    return pedidoActualizado;
}

function eliminarPedido(id) {

    const pedidoEliminado = eliminarPedidoMongo(id);

    return pedidoEliminado;
}

module.exports = {
    obtenerPedidosFiltrados,
    obtenerPedidoPorId,
    crearPedido,
    actualizarPedido,
    eliminarPedido
}
