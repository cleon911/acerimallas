const {Schema, model} = require('mongoose');

 const DescuentoSchema = new Schema({
    codigo:     { type: String, required: true},
    idcliente:  { type: String, required: true},
    namecliente:{ type: String, required: true},
    valor:      Number,
    mensaje:    String,
    estado:     String,
    finicio:    String,
    ffin:       String,
    fuso:       String,
});


module.exports = model('Descuento',DescuentoSchema);