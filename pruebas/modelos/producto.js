const {Schema, model} = require('mongoose');

 const ProductSchema = new Schema({
    categoria:  { type: String, required: true},
    codigo:     { type: String, required: true},
    nombre:     { type: String, required: true},
    ancho:      String,
    alto:       String,
    grosor:     String,
    diametro:   String,
    separa:     String,
    descripcion:    String,
    precio:     { type: Number, required: true},
    img:        String
});



module.exports = model('Productos',ProductSchema);