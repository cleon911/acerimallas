const {Router} = require('express');
const router = Router();

const { 
    renderPedidopendienteForm,
    renderPedidoTransitoForm,
    renderPedidoCompletoForm,
    renderNewPedidoForm,
    createPedido,
    findPedido,
    findProducto,
    findcliente,
    renderPedidoDetalleForm,
    renderEditPedido,
    editPedido,
    eliminarPedido
} =require('../controladores/pedido.controler');

const { Autenticado } = require('../helper/autenticador');

//renderizar las pantallas
router.get('/pedido/pendiente',     Autenticado, renderPedidopendienteForm );  
router.get('/pedido/transito',      Autenticado, renderPedidoTransitoForm );  
router.get('/pedido/completo',      Autenticado, renderPedidoCompletoForm );  
router.get('/pedido/crear',         Autenticado, renderNewPedidoForm);          

//agregar
router.post('/pedido/add',          Autenticado, createPedido );  

//buscardores
router.post('/pedido/find',         Autenticado, findPedido );    
router.post('/pedido/findProducto',  Autenticado, findProducto );      
router.post('/pedido/findCliente',  Autenticado, findcliente );

//observadores
router.get('/pedido/detalle/:id',   Autenticado, renderPedidoDetalleForm );


//editar
router.get('/pedido/edit/:id',      Autenticado, renderEditPedido );    
router.put('/pedido/edit/:id',      Autenticado, editPedido );         

//eleminar
router.delete('/pedido/delete/:id', Autenticado,  eliminarPedido );      

module.exports = router;