const UserCtrl = {};

const user=require('../modelos/usuarios');
//const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
//const { Token } = require('../helper/token');

UserCtrl.renderUsersForm = async (req,res) => {
    const usuarios = await user.find().lean();
    res.render('app/usuarios/usuarios',{usuarios});
};


UserCtrl.renderUserForm = (req,res) => {
    res.render('app/usuarios/usuario');
};


UserCtrl.createUser = async (req,res) => {
    const errors = [];
    const {cuenta,nombre,ruc,direccion,email,contrasena,categoria,estado, telefono} = req.body;

    if(nombre==null){
        errors.push({text: 'Nombre es un campo obligatorio'});
    }

    if(ruc==null){
        errors.push({text: 'RUC/CI es un campo obligatorio'});
    }

    if(contrasena==null){
        errors.push({text: 'Contrasena es un campo obligatorio'});
    }

    if(cuenta.length < 6){
        errors.push({text: 'Cuenta es muy corta, debe de tener por lo menos 6 caracteres'});
    }

    if(contrasena.length < 8){
        errors.push({text: 'Contraseña es muy corta, debe de tener por lo menos 8 caracteres'});
    }
    
    if(errors.length >0){
        res.render('app/usuarios/usuario', {errors});
    }else{
        const emailUser = await user.findOne({email: email}).lean();
        if(emailUser){
            req.flash('error_msg','El correo ya esta en uso, debe Registrar desde el principio');
            res.redirect('/usuario');

        }else {
            const new_user=new user();
            new_user.cuenta = cuenta;
            new_user.nombre = nombre;
            new_user.ruc = ruc;
            new_user.email = email;
            new_user.contrasena = contrasena;
            new_user.direccion = direccion;
            new_user.telefono = telefono;
            new_user.categoria = categoria
            new_user.estado = null;

            if(req.file){
                new_user.img= 'uploads/' + req.file.filename;
            }

            if(estado=='activo'){
                new_user.estado = estado;
            }

            await new_user.save();
            req.flash('success_msg','Operador creado correctamente');
            res.redirect('/usuario/all');
            
        }
    }
};


UserCtrl.findUser = async (req,res) => {
    const {categoria, buscadorBox} = req.body;

    if ( categoria) {
        const usuarios = await user.find({categoria: categoria}).lean();
        res.render('app/usuarios/usuarios',{usuarios});
    }
    else if ( buscadorBox ) {
        const usuarios = await user.find({nombre:buscadorBox }).lean();
        res.render('app/usuarios/usuarios',{usuarios});
    }
    else {
        const usuarios = await user.find({categoria: categoria, nombre:buscadorBox }).lean();
        res.render('app/usuarios/usuarios',{usuarios});
    }
};


UserCtrl.rendereditUser = async (req,res) => {
    const usuario = await user.findById(req.params.id).lean();
    res.render('app/usuarios/usuario2',{usuario});

};


UserCtrl.editUser = async (req,res) => {
    const usuario = req.body;

    if(req.file){
        usuario.img= 'uploads/' + req.file.filename;
    }

    if(usuario.estado!='activo'){
        usuario.estado=null;
    }
    await user.findByIdAndUpdate(req.params.id, usuario );
    req.flash('success_updated','Usuario actualizado');
    res.redirect('/usuario/all');

};


UserCtrl.eliminarUser = async (req,res) => {
    await user.findByIdAndDelete(req.params.id);
    req.flash('success_deleted','Usuario eliminado');
    res.redirect('/usuario/all');
};

/*
//USERS MOVIL
UserCtrl.createUserMovil = async (req, res) => {
    const {nombre,ruc,telefono,contrasena,direccion,email} = req.body;
    const new_user = new user();
    new_user.nombre = nombre;
    new_user.ruc = ruc;
    new_user.cuenta = nombre;
    new_user.telefono = telefono;
    new_user.contrasena = bcrypt.hashSync(contrasena,10);
    new_user.direccion = direccion;
    new_user.email = email;
    new_user.categoria = 'Persona Natural';
    new_user.estado = 'activo';
    new_user.img = '';
    console.log(new_user);

    await new_user.save( (error, user) => {
        if(error) return res.status(500).send({
            ERROR: error,
            MESSAGE: 'ERROR TO SAVE USER',
        });

        if(!user) return res.status(404).send({
            MESSAGE: 'DO NOT SAVE THE USER',
        });

        const  userToken = Token.getJwtToken({
            _id: user._id
        });

        return res.status(200).send({
            STATUS: 'OK',
            MESSAGE: 'Usuario creado exitosamente',
            USER: user,
            TOKEN: userToken
        });
    });
    
};

UserCtrl.forgotPassword = async (req, res) => {
    const email = req.body.email;
    
    await user.findOne({email: email}).exec( async (error, user) => {
        if(error) return res.status(500).send({
            ERROR: error,
            MESSAGE: 'ERROR TO UPDATE PASSWORD',
        });

        if(!user) return res.status(404).send({
            MESSAGE: 'DO NOT UPDATE THE PASSWORD',
        });

        let random = parseInt(Math.random()*1000);
        user.contrasena = user.nombre.slice(2) + random.toString() + user.apellido.slice(2);

        await user.save((error, user) => {
            if(error) return res.status(500).send({
                ERROR: error,
                MESSAGE: 'ERROR TO SAVE USER',
            });
    
            if(!user) return res.status(404).send({
                MESSAGE: 'DO NOT SAVE THE USER',
            });
        });

        const output = `
            <h2>Ha solicitado cambio de contraseña</h2>
            <p>Por el cual su nueva contraseña es:</p>
            <ul>  
                <li>Email: ${email}</li>
                <li>Contraseña: ${user.contrasena}
            </ul>
            <h4>Recuerde no compartir con nadie su contraseña</h4>
            <h5>Puede cambiar su contraseña en su perfil después de iniciar sesión</h5>
        `;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'dawap2020@gmail.com', // generated ethereal user
                pass: 'allan123AP'  // generated ethereal password
            },
            tls:{
            rejectUnauthorized:false
            }
        });
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Acerimallas" <dawap2020@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Recuperacion de Contraseña', // Subject line
            text: 'Contactáme', // plain text body
            html: output // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.send(output);
        });

        return res.status(200).send({
            STATUS: 'OK',
            MESSAGE: 'Se ha enviado la contraseña al correo',
            USER: user
        });
    });
};

UserCtrl.logIn = async (req, res) => {
    const {email,contrasena} = req.body;
    if(email) {
        console.log('Entro al email');
        await user.findOne({email: email}).exec( (error, user) => {
            if(error) return res.status(500).send({
                ERROR: error,
                MESSAGE: 'ERROR TO LOG IN',
            });
    
            if(!user) return res.status(404).send({
                MESSAGE: 'DO NOT LOG IN THE USER',
            });
    
            if( user.comparePassword( contrasena) ) {
                return res.status(200).send({
                    STATUS: 'PASSWORD',
                    MESSAGE: 'Contraseña incorrecta',
                    USER: user
                });
            }
            else {
                const  userToken = Token.getJwtToken({
                    _id: user._id
                });;
        
                return res.status(200).send({
                    STATUS: 'OK',
                    MESSAGE: 'Inicio de sesión exitoso',
                    USER: user,
                    TOKEN: userToken
                });
            }
        });
    }
    else {
        return res.status(200).send({
            STATUS: 'EMAIL',
            MESSAGE: 'El correo no está registrado'
        });
    }
    
}
*/
module.exports = UserCtrl;
