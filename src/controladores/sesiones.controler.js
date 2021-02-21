const SesionCtrl = {};

const passport = require('passport');

SesionCtrl.renderLogin = (req,res) => {
    res.render('inicioadm/logeo');
};

SesionCtrl.SigIn = passport.authenticate('local',{
    failureRedirect: '/login',
    successRedirect: '/menu',
    failureFlash: true,
});

SesionCtrl.renderRecover = (req,res) => {
    res.render('inicioadm/recuperar');
};

SesionCtrl.RecoberPass = (req, res) => {
    console.log(req.body);
}

SesionCtrl.renderRegistro = (req,res) => {
    res.render('inicioadm/registro');
};

SesionCtrl.renderMenu = (req,res) => {
    res.render('inicioadm/eleccion_admin');
};

SesionCtrl.logOut = (req,res) => {
    req.logOut();
    req.flash('success_msg','Sesion Cerrada correctamente');
    res.redirect('/login');
};


module.exports = SesionCtrl;

