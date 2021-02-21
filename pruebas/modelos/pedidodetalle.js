const {Schema, model} = require('mongoose');

 const detallefacturaSchema = new Schema({
    npedido:    { type: Number, required: true },
    pedidoid:   { type: String, required: true },
    productcodigo:  String,
    productnombre:  String,
    productcant:    Number,
    productprecio:  Number,
    producsubtotal: Number
});



module.exports = model('detallefactura',detallefacturaSchema);