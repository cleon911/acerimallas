const ProductCtrl = {};

const product=require('../modelos/producto');


ProductCtrl.renderProductosForm = async (req,res) => {
    const productos = await product.find().lean();
    res.render('app/productos/productos',{productos});
};

ProductCtrl.renderProductForm = async (req,res) => {
    res.render('app/productos/producto');
};

ProductCtrl.createProduct = async (req,res) => {
    const errors = [];
  
    const { categoria,codigo,nombre,ancho,alto,grosor,diametro,separa,descripcion,precio} = req.body;

    if(codigo.length < 6){
        errors.push({text: 'Codigo es muy corto, debe de tener minimo 6 caracteres'});
    }

    if(precio <= 0){
        errors.push({text: 'Precio no puede ser negativo o igual a 0'});     
    }

    if(errors.length >0){
        res.render('app/productos/producto', {errors});
    }else{
        const producto = await product.findOne({codigo: codigo}).lean();
        if(producto){
            req.flash('error_msg','El codigo de producto ya existe, debe Registrar desde el principio');
            res.redirect('/producto');

        }else {
            const new_product=new product();

            new_product.categoria = categoria;
            new_product.codigo = codigo;
            new_product.nombre = nombre;

            new_product.ancho = null;
            new_product.alto = null;
            new_product.grosor = null;
            new_product.diametro = null;
            new_product.separa = null;

            new_product.descripcion = descripcion;
            new_product.precio = precio;
            if(req.file){
                new_product.img = 'uploads/' + req.file.filename;
            }
           
           
            if(ancho!=null){
                new_product.ancho = ancho;
            }
            if(alto!=null){
                new_product.alto = alto;
            }
            if(grosor!=null){
                new_product.grosor = grosor;
            }
            if(diametro!=null){
                new_product.diametro = diametro;
            }
            if(separa!=null){
                new_product.separa = separa;
            }

            await new_product.save();
            req.flash('success_msg','Producto creado correctamente');
            res.redirect('/producto/all');
            
        }
    }
};

ProductCtrl.findProduct = async (req,res) => {
    const {categoria, buscadorBox} = req.body;

    const productos = await product.find({categoria: categoria, codigo:buscadorBox }).lean();
    res.render('app/productos/productos',{productos});
};

ProductCtrl.rendereditProduct = async (req,res) => {
    const producto = await product.findById(req.params.id).lean();
    res.render('app/productos/producto2',{producto});

  
};

ProductCtrl.editProduct = async (req,res) => {
    const producto = req.body;
    if(req.file){
        producto.img = 'uploads/' + req.file.filename;
    }
    

    if(producto.alto==''){
        producto.alto=null;
    }

    if(producto.ancho==''){
        producto.ancho=null;
    }

    if(producto.grosor==''){
        producto.grosor=null;
    }

    if(producto.separa==''){
        producto.separa=null;
    }

    if(producto.diametro==''){
        producto.diametro=null;
    }
    
    
    await product.findByIdAndUpdate(req.params.id, producto );
    req.flash('success_updated','Producto actualizado');
    res.redirect('/producto/all');
  
};
ProductCtrl.eliminarProduct = async (req,res) => {
    await product.findByIdAndDelete(req.params.id);
    req.flash('success_deleted','Producto eliminado');
    res.redirect('/producto/all');
  
};

//USERS MOVIL
ProductCtrl.getProducts = async (req, res) => {
    const products = await product.find();
    return res.status(200).send({
        STATUS: 'OK',
        MESSAGE: 'Show products',
        PRODUCTS: products
    });
};

module.exports = ProductCtrl;