const {Router} = require('express');
const router = Router();

const { 
    renderPromosForm,
    renderPromotForm,
    createPromo,
    findPromo,
    fincliente,
    rendereditPromo,
    editPromo,
    eliminarPromo
} =require('../controladores/promociones.controler');

const { Autenticado } = require('../helper/autenticador');

//renderizar las pantallas
router.get('/promocion/all',         Autenticado, renderPromosForm );  
router.get('/promocion',             Autenticado, renderPromotForm);          

//agregar
router.post('/promocion/add',        Autenticado, createPromo );  

//buscardores
router.post('/promocion/find',       Autenticado, findPromo );
router.post('/promocion/findCliente', Autenticado, fincliente);


//editar
router.get('/promocion/edit/:id',    Autenticado, rendereditPromo);    
router.put('/promocion/edit/:id',    Autenticado, editPromo);         

//eleminar
router.delete('/promocion/delete/:id', Autenticado,  eliminarPromo);      

module.exports = router;