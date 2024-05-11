const jwt = require("jsonwebtoken")
const claveSecreta = process.env.CLAVE_SECRETA;

exports.galletasJWT = (req,res) =>{
    const token = req.cookies.token
    try {
        const usuario = jwt.verify(token, claveSecreta)
        return usuario
    } catch (error) {
        return "Invalido"
    }
}

exports.generarToken = (carga) =>{
    return jwt.sign(carga, claveSecreta, { expiresIn: "3 days" });
}
