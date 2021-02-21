const pedidoCtrl = {};

const pedido= require('../modelos/pedidos');
const user =require('../modelos/usuarios');
const product=require('../modelos/producto');
const detalle=require('../modelos/pedidodetalle');
const pagos = require('../modelos/pagos');


pedidoCtrl.renderPedidopendienteForm = async (req,res) => {
    const pedidos = await pedido.find({estado: "pendiente"}).lean();
    res.render('app/pedido/pendiente',{pedidos});
};

pedidoCtrl.renderPedidoTransitoForm = async (req,res) => {
    const pedidos = await pedido.find({estado: "transito"}).lean();
    res.render('app/pedido/transito',{pedidos});

};

pedidoCtrl.renderPedidoCompletoForm = async (req,res) => {
    const pedidos = await pedido.find({estado: "completo"}).lean();
    res.render('app/pedido/completo',{pedidos});
};

pedidoCtrl.renderNewPedidoForm = async (req,res) => {
    var cant = (await pedido.countDocuments())+1;
    res.render('app/pedido/creapedido',{cant});
};

pedidoCtrl.createPedido = async (req,res) => {

    const {npedido,fecha,usernombre,fpago,fentrega,codigo_producto,cantidad,
    subtotal1,descuento,subtotal2,iva,total} = req.body;

    const usuario = await user.findOne({cuenta: usernombre}).lean();
    const inciso = await product.findOne({codigo: codigo_producto}).lean();

    const orden = new pedido();
    orden.usuario =  usuario._id;
    orden.npedido = npedido;
    orden.usernombre = usuario.nombre;
    orden.userruc = usuario.ruc;
    orden.usermail = usuario.email;
    orden.userdir = usuario.direccion;
    orden.userfono = usuario.telefono;
    orden.fecha = fecha;
    orden.fpago = fpago;
    orden.fentrega = fentrega;

    orden.subtotal1 = subtotal1;
    orden.descuento = descuento;
    orden.subtotal2 = subtotal2;
    orden.iva = iva;
    orden.total = total;
    orden.estado = "pendiente";


    const produc =new detalle();
    produc.npedido = npedido;
    produc.pedidoid = orden._id;
    produc.productcodigo = inciso.codigo;
    produc.productnombre = inciso.nombre;
    produc.productcant = cantidad;
    produc.productprecio =  inciso.precio;
    var sub = (cantidad*inciso.precio);
    produc.producsubtotal = sub;

    const new_pago=new pagos();
    new_pago.pedidoid = orden._id;
    new_pago.npedido = npedido;
    new_pago.monto = total;
    new_pago.pagos = 0;
    new_pago.saldo = total;

    await orden.save();
    await produc.save();
    await new_pago.save();
    req.flash('success_msg','Pedido creado correctamente');
    res.redirect('/pedido/pendiente');

};

pedidoCtrl.renderPedidoDetalleForm = async (req,res) => {

    const ped = await pedido.findById(req.params.id).lean();
    const deta = await detalle.findOne({pedidoid: req.params.id}).lean();

    res.render('app/pedido/detalle',{ped,deta});
    
};

pedidoCtrl.findPedido = async (req,res) => {
    const {buscadorBox} = req.body;
    const pedidos = await pedido.find( { $or: [{npedido: buscadorBox}, {userruc:buscadorBox}] }).lean();
    res.render('app/pedido/pendiente',{pedidos});
};

pedidoCtrl.findProducto = async (req,res) => {

    const {npedido,fecha,usernombre,usu,userruc,usermail,userdir,userfono,fpago,fentrega,subtotal1,descuento} = req.body; 
     
    //para la concurrencia de datos
    var cant=npedido;
    
    //para la concurrencia del usuario
    const usuario = [];
    usuario.cuenta = usernombre;
    usuario.nombre = usu;
    usuario.ruc = userruc;
    usuario.email = usermail;
    usuario.direccion = userdir;
    usuario.telefono = userfono;

    //seccion de busqueda del producto
    const{codigo_producto,cantidad}=req.body;
    const producto = await product.findOne({codigo: codigo_producto}).lean();

    const detallepdido = new detalle();
    detallepdido.productcodigo = producto.codigo;
    detallepdido.productnombre = producto.nombre;
    detallepdido.productcant = cantidad;
    detallepdido.productprecio = producto.precio;
    var sub = (cantidad*producto.precio);
    detallepdido.producsubtotal = sub;

    const data = [];
    data.fecha= fecha;
    data.fpago = fpago;
    data.fentrega = fentrega;
    data.subtotal1 = subtotal1 + sub;
    data.descuento = descuento;

    res.render('app/pedido/creapedido',{detallepdido,cant,usuario,data});
};



pedidoCtrl.findcliente = async (req,res) => {
    const {usernombre} = req.body;
    const usuario = await user.findOne({cuenta: usernombre}).lean();
    var cant = (await pedido.countDocuments())+1;
    res.render('app/pedido/creapedido',{usuario,cant});

};

pedidoCtrl.renderEditPedido = async (req,res) => {
    const ped = await pedido.findById(req.params.id).lean();
    const deta = await detalle.findOne({pedidoid: req.params.id}).lean();

    res.render('app/pedido/editpedido',{ped,deta});
};

pedidoCtrl.editPedido = async (req,res) => {
    const {estado} = req.body;
    
    const ped = await pedido.findById(req.params.id).lean();
    ped.estado = estado;

    await pedido.findByIdAndUpdate(req.params.id, ped);
    req.flash('success_updated','Pedido Actualizado actualizado');
    res.redirect('/pedido/pendiente');
};

pedidoCtrl.eliminarPedido = async (req,res) => {
    await pedido.findByIdAndDelete(req.params.id);

    const deta = await detalle.findOne({pedidoid: req.params.id}).lean();
    await detalle.findByIdAndDelete(deta._id);

    const pago = await pagos.findOne({pedidoid: req.params.id}).lean();
    await pagos.findByIdAndDelete(pago._id);



    req.flash('success_deleted','Pedido eliminado');
    res.redirect('/pedido/pendiente');
};


module.exports = pedidoCtrl;

