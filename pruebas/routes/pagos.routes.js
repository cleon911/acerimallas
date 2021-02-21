const {Router} = require('express');
const router = Router();

const { 
    renderPagosForm,
    renderAbonosForm,
    findPagos,
    addAbono,
    editAbono,
    eliminarAbono
} =require('../controladores/pagos.controler');

const { Autenticado } = require('../helper/autenticador');

//renderizar las pantallas
router.get('/pagos/all',            Autenticado, renderPagosForm );        

//buscardores
router.post('/pagos/find',          Autenticado, findPagos );
router.post('/pagos/abono',         Autenticado, addAbono );     

//editar 
router.get('/pagos/detalles/:id',       Autenticado, renderAbonosForm);    
   

module.exports = router;