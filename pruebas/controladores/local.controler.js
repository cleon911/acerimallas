const LocalCtrl = {};

const local= require('../modelos/locales');

LocalCtrl.renderLocalesForm = async (req,res) => {
    const locales = await local.find().lean();
    res.render('app/locales/locales',{locales});
};


LocalCtrl.renderLocalForm = (req,res) => {
    res.render('app/locales/local');
};

LocalCtrl.createLocal = async (req,res) => {
    const errors = [];
    const {nombre,descripcion,direccion,coordx,coordy} = req.body;

    if(nombre.length < 5){
        errors.push({text: 'Codigo es muy corto, debe de tener minimo 5 caracteres'});
    }

    if(direccion.length < 10){
        errors.push({text: 'Direccion es muy corto, debe de tener minimo 5 caracteres'});
    }

    const locales = await local.findOne({nombre: nombre}).lean();
    if(locales){
        errors.push({text: 'Ya existe un Local con dicho codigo asignado'});
    }

    if(errors.length >0){
        res.render('app/locales/locales',{errors});
    }else{
        
        const puesto=new local();
        puesto.nombre = nombre;
        puesto.descripcion = descripcion;
        puesto.direccion = direccion;
        puesto.coordx = coordx;
        puesto.coordy = coordy; 

        if(req.file){
            puesto.img = 'uploads/' + req.file.filename;
        }
         
        await puesto.save();
        req.flash('success_msg','El Local ha sido creado correctamente');
        res.redirect('/locales/all');
        
    }

};

LocalCtrl.findLocal = async (req,res) => {
    const {buscadorBox} = req.body;
    const desc = await local.find({nombre: buscadorBox}).lean();
    res.render('app/locales/locales',{desc});

};

LocalCtrl.solomapa = async (req,res) => {
    const locales = await local.findById(req.params.id).lean();
    res.render('app/locales/mapasolo',{locales});

};

LocalCtrl.renderEditLocal = async (req,res) => {
    const locales = await local.findById(req.params.id).lean();
    res.render('app/locales/local2',{locales});

};


LocalCtrl.editLocal = async (req,res) => {

    const puesto = req.body;

    if(req.file){
        puesto.img = 'uploads/' + req.file.filename;
    }
    
    await local.findByIdAndUpdate(req.params.id, puesto);
    req.flash('success_updated','Promocion actualizado');
    res.redirect('/locales/all');

};

LocalCtrl.elimanateLocal = async (req,res) => {
    await local.findByIdAndDelete(req.params.id);
    req.flash('success_deleted','Local eliminado');
    res.redirect('/locales/all');

};

module.exports = LocalCtrl;
