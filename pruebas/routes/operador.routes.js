const {Router} = require('express');
const router = Router();

const { 
    renderOperadoresForm,
    renderOperadorForm,
    createOperador,
    findOperador,
    rendereditOperador,
    editOperador,
    eliminarOperador
} =require('../controladores/operador.controler');

const { Autenticado } = require('../helper/autenticador');

//renderizar las pantallas
router.get('/operador/all',         Autenticado, renderOperadoresForm );  
router.get('/operador',             Autenticado, renderOperadorForm);          

//agregar
router.post('/operador/add',        Autenticado, createOperador );  

//buscardores
router.post('/operador/find',       Autenticado, findOperador );          

//editar
router.get('/operador/edit/:id',    Autenticado, rendereditOperador);    
router.put('/operador/edit/:id',    Autenticado, editOperador);         

//eleminar
router.delete('/operador/delete/:id', Autenticado,  eliminarOperador);      

module.exports = router;