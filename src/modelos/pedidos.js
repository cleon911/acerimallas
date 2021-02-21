const {Schema, model} = require('mongoose');

 const PedidoSchema = new Schema({
    usuario: { type: String, required: true },  
    npedido: { type: Number, required: true }, //
    usernombre: String,
    userruc:    String,
    usermail:   String,
    userdir:    String,
    userfono:   String,
    fecha:      String,
    fpago:      String,
    fentrega:   String,
    subtotal1:  Number,
    descuento:  Number,
    subtotal2:  Number,
    iva:        Number,
    total:      Number,
    estado:     String
});



module.exports = model('Pedido',PedidoSchema);