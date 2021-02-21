const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const admin = require('../modelos/administrador');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email,password,done) =>{

    //match Email del administrador
    const administrador = await admin.findOne({email}).lean();

    if(!administrador){
        return done(null, false, {message: 'No se ha encontrado una Sesion Valida'});
    }else {
        //match de la contrasena
        if(administrador.contrasena == password){
            return done(null, administrador);
        }else {
            return done(null, false, {message: 'Contraseña es Incorrecta'});
        }

    }
}));

passport.serializeUser((administrador,done) => {
    done (null, administrador._id);
});

passport.deserializeUser((_id,done) => {
    admin.findById(_id,(err,administrador) => {
        done(err,administrador);
    });
});