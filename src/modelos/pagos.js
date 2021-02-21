const {Schema, model} = require('mongoose');

 const pagosSchema = new Schema({
    pedidoid: { type: String, required: true },
    npedido:  { type: Number, required: true },
    monto:  Number,
    pagos:  Number,
    saldo:  Number
});



module.exports = model('Pagos',pagosSchema);