const {Schema, model} = require('mongoose');

 const LocalesSchema = new Schema({
    nombre:     {type: String, required: true},
    descripcion:{type: String, required: true},
    direccion:  {type: String, required: true},
    coordx:     {type: String, required: true},
    coordy:     {type: String, required: true},
    img:        String,
    telefono:   String
});

module.exports = model('Locales',LocalesSchema);