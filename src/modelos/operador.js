const {Schema, model} = require('mongoose');
const bcrip = require('bcryptjs');

 const OperadorSchema = new Schema({
    nombre:     { type: String, required: true},
    apellido:   { type: String, required: true},
    email:      { type: String, required: true, unique: true},
    contrasena: { type: String, required: true},
    cuenta: String,
    img: String
});

OperadorSchema.methods.encriptarPass = async contrasena => {
    const salt = await bcrip.genSalt(10);
    return await bcrip.hash(contrasena, salt);
};

OperadorSchema.methods.matchPass = async function(password) {
    return (await bcrip.compareSync(password,this.contrasena));
};





module.exports = model('Operador',OperadorSchema);