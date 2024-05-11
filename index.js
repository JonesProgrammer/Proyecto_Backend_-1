const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasLibro = require("./Libros/libro.route.js")
app.use('/Libros', rutasLibro);

const rutasUsuario = require("./Usuarios/usuario.route.js")
app.use('/Usuarios', rutasUsuario);

const rutasPedido= require("./Pedidos/pedido.route.js")
app.use('/Pedidos', rutasPedido);



// aqui va la connection string VVVVV
mongoose.connect("mongodb+srv://Juan:ilRpuKanJJmkjqu7@cluster0.flug9nt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("Database connection succesful")).catch(() => console.log("Database connection error"));

app.listen(8080);

