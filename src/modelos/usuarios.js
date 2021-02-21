const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    nombre:     { type: String, required: true },
    ruc:        { type: String, required: true },
    email:      { type: String, required: true },
    contrasena: { type: String, required: true },
    cuenta: String,  
    direccion: String,
    telefono: String,
    img: String,
    categoria: String,
    estado: String
});

UsuarioSchema.method('comparePassword', function(pass) {
    if( bcrypt.compareSync(pass, this.contrasena)) {
        return true;
    } else {
        return false;
    }
});

module.exports = model('Usuarios',UsuarioSchema);