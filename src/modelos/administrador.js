const {Schema, model} = require('mongoose');
const bcrip = require('bcryptjs');

 const AdminSchema = new Schema({
    nombre:     { type: String, required: true},
    apellido:   { type: String, required: true},
    cidentidad: { type: String, required: true},
    email:      { type: String, required: true, unique: true},
    contrasena: { type: String, required: true},
    db: String,
    creacion: String,
    supervision: String,
    img: String
});

AdminSchema.methods.encriptarPass = async contrasena => {
    const salt = await bcrip.genSalt(10);
    return await bcrip.hash(contrasena, salt);
};


module.exports = model('Administrador',AdminSchema);