const OperCtrl = {};

const oper=require('../modelos/operador');

OperCtrl.renderOperadoresForm = async (req,res) => {
    const operadores = await oper.find().lean();
    res.render('app/operadores/operadores',{operadores});
};

OperCtrl.renderOperadorForm = (req,res) => {
    res.render('app/operadores/operador');
};

OperCtrl.createOperador = async (req,res) => {
    const errors = [];
    const {nombre,apellido,email,cuenta,contrasena,img} = req.body;

    if(contrasena.length < 8){
        errors.push({text: 'Contraseña es muy corta, debe Registrar desde el principio'});
    }
    
    if(errors.length >0){
        res.render('app/operadores/operador', {errors});
    }else{
        const emailUser = await oper.findOne({email: email}).lean();
        if(emailUser){
            req.flash('error_msg','El correo ya esta en uso, debe Registrar desde el principio');
            res.redirect('/operador');

        }else {
            const new_oper=new oper();
            new_oper.nombre = nombre;
            new_oper.apellido = apellido;
            new_oper.email = email;
            new_oper.contrasena=contrasena;
            new_oper.cuenta = cuenta;
            if(req.file){
                new_oper.img= 'uploads/' + req.file.filename;
            }
 
            await new_oper.save();
            req.flash('success_msg','Operador creado correctamente');
            res.redirect('/operador/all');
            
        }
    }
};

OperCtrl.findOperador = async (req,res) => {
    const {buscadorBox} = req.body;

    const operadores = await oper.find({nombre: buscadorBox}).lean();
    res.render('app/operadores/operadores',{operadores});
};

OperCtrl.rendereditOperador = async (req,res) => {
    const operador = await oper.findById(req.params.id).lean();
    res.render('app/operadores/operador2',{operador});

};

OperCtrl.editOperador = async (req,res) => {

    const operador = req.body;

    if(req.file){
        operador.img= 'uploads/' + req.file.filename;
    }
    
    await oper.findByIdAndUpdate(req.params.id, operador );
    req.flash('success_updated','Operador actualizado');
    res.redirect('/operador/all');

};

OperCtrl.eliminarOperador = async (req,res) => {
    await oper.findByIdAndDelete(req.params.id);
    req.flash('success_deleted','Operador eliminado');
    res.redirect('/operador/all');
};


module.exports = OperCtrl;