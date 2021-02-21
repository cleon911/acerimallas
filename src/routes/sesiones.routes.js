const { Router} = require('express');
const router = Router();

const { renderLogin,
        SigIn,
        RecoberPass,
        renderRecover,
        renderRegistro,
        renderMenu,
        logOut
 } = require('../controladores/sesiones.controler');

const { Autenticado } = require('../helper/autenticador');

router.get('/', renderLogin );

router.get( '/login', renderLogin);
router.post( '/login', SigIn);

router.get('/recuperar', renderRecover);
router.post('/recoverpass', RecoberPass);


router.get('/registrop', renderRegistro);
router.get('/menu', Autenticado, renderMenu);

router.get('/LogOut',logOut);

module.exports = router;