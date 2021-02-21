const {Router} = require('express');
const router = Router();

const { 
    renderLocalesForm,
    renderLocalForm,
    createLocal,
    findLocal,
    solomapa,
    renderEditLocal,
    editLocal,
    elimanateLocal
} =require('../controladores/local.controler');

const { Autenticado } = require('../helper/autenticador');

//renderizar las pantallas
router.get('/locales/all',       Autenticado, renderLocalesForm );  
router.get('/local',             Autenticado, renderLocalForm);          

//agregar
router.post('/local/add',        Autenticado, createLocal );  

//buscardores
router.post('/local/find',       Autenticado, findLocal );          

//mostrar
router.get('/local/mostrar/:id', Autenticado, solomapa);


//editar
router.get('/local/edit/:id',    Autenticado, renderEditLocal);    
router.put('/local/edit/:id',    Autenticado, editLocal);         

//eleminar
router.delete('/local/delete/:id', Autenticado, elimanateLocal);      

module.exports = router;