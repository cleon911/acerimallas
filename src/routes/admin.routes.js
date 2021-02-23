const {Router} = require('express');
const router = Router();

const { renderAdministradoresForm,
    renderAdministradorForm,
    createAdministrador, 
    createAdministrador2,
    findAdministrador,
    obtenerAdminxCuenta, 
    modificarAdmin,
    eliminarAdmin 
} =require('../controladores/admin.controler');

const { Autenticado } = require('../helper/autenticador');

//renderizar las pantallas
router.get('/administradores/all',          Autenticado, renderAdministradoresForm);  
router.get('/administrador',                Autenticado, renderAdministradorForm);          

//agregar      
router.post('/administrador/add',           createAdministrador);         
router.post('/administrador/add2',          Autenticado, createAdministrador2);  

//buscardores
router.post('/administrador/find',          Autenticado, findAdministrador);          

//editar
router.get('/administrador/edit/:id',       Autenticado, obtenerAdminxCuenta);    
router.put('/administrador/edit/:id',       Autenticado, modificarAdmin);         

//eleminar
router.delete('/administrador/delete/:id',  Autenticado,  eliminarAdmin);      

module.exports = router;