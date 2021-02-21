const {Router} = require('express');
const router = Router();

const { 
    renderUsersForm,
    renderUserForm,
    createUser,
    findUser,
    rendereditUser,
    editUser,
    eliminarUser
} =require('../controladores/usuarios.controler');

const { Autenticado } = require('../helper/autenticador');

//renderizar las pantallas
router.get('/usuario/all',         Autenticado, renderUsersForm );  
router.get('/usuario',             Autenticado, renderUserForm);          

//agregar
router.post('/usuario/add',        Autenticado, createUser );  

//buscardores
router.post('/usuario/find',       Autenticado, findUser );          

//editar
router.get('/usuario/edit/:id',    Autenticado, rendereditUser);    
router.put('/usuario/edit/:id',    Autenticado, editUser);         

//eleminar
router.delete('/usuario/delete/:id', Autenticado,  eliminarUser);      

/*
//USERS MOVIL ROUTES
router.post('/api/signup', createUserMovil);
router.patch('/api/forgot-password', forgotPassword);
router.post('/api/login', logIn);
*/

module.exports = router;