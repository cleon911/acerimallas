const pagosCtrl = {};

const pedido= require('../modelos/pedidos');
const pagos= require('../modelos/pagos');
const abonos=require('../modelos/pagosdetalle');


pagosCtrl.renderPagosForm = async (req,res) => {
    const pago = await pagos.find().lean();
    res.render('app/pagos/pagos',{pago});
};

pagosCtrl.renderAbonosForm = async (req,res) => {
    
    const pag = await pagos.findById(req.params.id).lean();
    const fac = await pedido.findById(pag.pedidoid).lean();
    const abo = await abonos.find({pagoid: req.params.id}).lean();

    res.render('app/pagos/abonos',{abo,pag,fac});
};

pagosCtrl.addAbono = async (req,res) => {
    const errors = [];
    const {codigo_pedido,valor,fecha} = req.body;

    const pag = await pagos.findOne({ npedido: codigo_pedido}).lean();

    
    if(pag){
        if((parseFloat(pag.saldo) > parseFloat(valor))==true){
            pag.pagos=parseFloat(pag.pagos) + parseFloat(valor);
            pag.saldo= parseFloat(pag.saldo) - parseFloat(valor);

            await pagos.findByIdAndUpdate(pag._id, pag);
        }else{
            errors.push({text: 'Monto excedido, Monto debe ser menor al saldo vencido'});
        }
    }else{
        errors.push({text: 'Numero de Pedido no existe, Intente denuevo'});
    }

    if(errors.length >0){
        res.render('app/pagos/pagos',{errors});
    }else{
        const abono = new abonos();
        abono.pedidoid=pag.pedidoid;
        abono.npedido=pag.npedido;
        abono.pagoid=pag._id;
        abono.monto= valor;
        abono.fecha=fecha;

        await abono.save();
        req.flash('success_msg','Abono creado correctamente');
        res.redirect('/pagos/all');
    }

};

pagosCtrl.findPagos = async (req,res) => {

};

    
module.exports = pagosCtrl;
