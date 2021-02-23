const adminCtrl = {};

const admin=require('../modelos/administrador');

adminCtrl.renderAdministradoresForm = async (req,res) => {
    const administradores = await admin.find().lean();
    res.render('app/administradores/administradores',{administradores});
};


adminCtrl.renderAdministradorForm = (req,res) => {
    res.render('app/administradores/administrador');
};


adminCtrl.createAdministrador = async (req,res) => {

    const errors = [];
    const{nombre,apellido,cidentidad,email,password,cpassword,Field} = req.body;

    if(password.length < 8){
        errors.push({text: 'Contraseña es muy corta'});
    }
    
    if(password!=cpassword){
        errors.push({text: 'La contraseña y la confirmación de la contraseña no coinciden'})
    }

    if(Field!="Si"){
        errors.push({text: 'No acepto los terminos y condiciones'});
    }

    if(cidentidad.length!= 10){
        errors.push({text: 'Cedula debe de tener 10 numeros'});     
    }

    if(errors.length >0){
        res.render('inicioadm/registro', {errors,nombre,apellido,cidentidad,email});
    }else {
        const emailUser = await admin.findOne({email: email}).lean();
        if(emailUser){
            req.flash('error_msg','El correo ya esta en uso, registrarse desde el principio');
            res.redirect('/registrop');

        }else {
            const new_admin = new admin();
            new_admin.nombre = nombre;
            new_admin.apellido = apellido;
            new_admin.cidentidad=cidentidad;
            new_admin.email = email;
            new_admin.contrasena = await new_admin.encriptarPass(password);
            new_admin.db =null;
            new_admin.creacion = null;
            new_admin.supervision = null;
            new_admin.img="";
            await new_admin.save();
            req.flash('success_msg','Administrador creado correctamente');
            res.redirect('/login');
        
        }
        
    }
};


adminCtrl.createAdministrador2 = async (req,res) => {

    const errors = [];
    const {nombre,apellido,email,cidentidad,contrasena,db,creacion,supervision} = req.body;

    if(contrasena.length < 8){
        errors.push({text: 'Contraseña es muy corta, debe Registrar desde el principio'});
    }

    if(cidentidad.length!=10){
        errors.push({text: 'Cedula de identidad debe de tener 10 numeros'});
    }
    
    if(errors.length >0){
        res.render('app/administradores/administrador', {errors});
    }else{
        const emailUser = await admin.findOne({email: email}).lean();
        if(emailUser){
            req.flash('error_msg','El correo ya esta en uso, debe Registrar desde el principio');
            res.redirect('/administrador');

        }else {
            const new_admin=new admin();
            new_admin.nombre = nombre;
            new_admin.apellido = apellido;
            new_admin.email = email;
            new_admin.contrasena = await new_admin.encriptarPass(contrasena);
            if(req.file){
                new_admin.img= 'uploads/' + req.file.filename;
            }
        
            new_admin.db =null;
            new_admin.creacion = null;
            new_admin.supervision = null;
        
            if(db=='S'){
                new_admin.db=db;
            }
            if(creacion=='S'){
                new_admin.creacion=creacion;
            }
            if(supervision=='S'){
                new_admin.supervision=supervision;
            }
            
            await new_admin.save();
            req.flash('success_msg','Administrador creado correctamente');
            res.redirect('/administradores/all');
            
        }

    }
    
};


//arreglar los find de busqueda
adminCtrl.findAdministrador  = async (req,res) => {
    const {buscadorBox} = req.body;

    const administradores = await admin.find({nombre: buscadorBox}).lean();
    res.render('app/administradores/administradores',{administradores});
    
};
     

adminCtrl.obtenerAdminxCuenta = async (req,res) => {
    const administrador = await admin.findById(req.params.id).lean();
    res.render('app/administradores/administrador2',{administrador});
};


adminCtrl.modificarAdmin = async (req,res) => {
    const administrador = req.body;
    
    if(req.file){
        administrador.img= 'uploads/' + req.file.filename;
    }
    

    if(administrador.db!='S'){
        administrador.db=null;
    }
    if(administrador.creacion!='S'){
        administrador.creacion=null;
    }
    if(administrador.supervision!='S'){
        administrador.supervision=null;
    }
    await admin.findByIdAndUpdate(req.params.id, administrador );
    req.flash('success_updated','Administrador actualizado');
    res.redirect('/administradores/all');
};


adminCtrl.eliminarAdmin = async (req,res) => {
    await admin.findByIdAndDelete(req.params.id);
    req.flash('success_deleted','Administrador eliminado');
    res.redirect('/administradores/all');
};


module.exports = adminCtrl;