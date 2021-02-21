const {Router} = require('express');
const router = Router();

const { 
    renderPostsForm,
    renderPosts2Form,
    renderPostForm,
    createPost,
    findPost,
    renderEditPost,
    editPost,
    eliminarPost
} =require('../controladores/publicacion.controler');

const { Autenticado } = require('../helper/autenticador');

//renderizar las pantallas
router.get('/publicacion/all',       Autenticado, renderPostsForm );
router.get('/publicacion2/all',       Autenticado, renderPosts2Form );
router.get('/publicacion',             Autenticado, renderPostForm);          

//agregar
router.post('/publicacion/add',        Autenticado, createPost );  

//buscardores
router.post('/publicacion/find',       Autenticado, findPost );          

//editar
router.get('/publicacion/edit/:id',    Autenticado, renderEditPost);    
router.put('/publicacion/edit/:id',    Autenticado, editPost);         

//eleminar
router.delete('/publicacion/delete/:id', Autenticado, eliminarPost);      

module.exports = router;