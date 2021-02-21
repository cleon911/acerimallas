const {Router} = require('express');
const router = Router();

const { 
    renderDash
} =require('../controladores/dash.controler');

const { Autenticado } = require('../helper/autenticador');

router.get('/dashboard', Autenticado, renderDash)


module.exports = router;