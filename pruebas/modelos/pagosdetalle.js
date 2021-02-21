const {Schema, model} = require('mongoose');

 const abonoSchema = new Schema({
    pedidoid: { type: String, required: true },
    npedido:  { type: Number, required: true },
    pagoid:   { type: String, required: true },
    monto:  Number,
    fecha: String
});



module.exports = model('Abono',abonoSchema);