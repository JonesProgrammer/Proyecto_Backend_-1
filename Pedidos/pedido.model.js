const mongoose = require("mongoose");

const esquemaPedido = new mongoose.Schema({
    state:{type:String, default: "En proceso"},
    date:{type:String,required:true},
    buyer:{type:String,required:true},
    buyer_id:{type:String,required:true, immutable:true},
    seller:{type:String,required:true},
    seller_id:{type:String,required:true, immutable: true},
    items:{type:[String],required:true},
    deleted:{type:Boolean, default:false}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Modelo = mongoose.model('Pedido', esquemaPedido);

module.exports = Modelo;
