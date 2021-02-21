const PostCtrl = {};

const post= require('../modelos/publicacion');

PostCtrl.renderPostsForm = async (req,res) => {
    const posts = await post.find().lean();
    res.render('app/publicaciones/posts',{posts});
};

PostCtrl.renderPosts2Form = async (req,res) => {
    const posts = await post.find().lean();
    res.render('app/publicaciones/postslist',{posts});
};

PostCtrl.renderPostForm = (req,res) => {
    res.render('app/publicaciones/post');
};

//verificar
PostCtrl.createPost = async (req,res) => {
    const errors = [];
    const {titulo,descripcion,detalles, alto, ancho, grosor, diametro, separa, tags} = req.body;

    if(titulo.length < 10){
        errors.push({text: 'Titulo es muy corto, debe de tener minimo 10 caracteres'});
    }

    if(descripcion.length < 10){
        errors.push({text: 'La Descripcion es muy corta, debe de tener minimo 40 caracteres'});
    }


    if(errors.length >0){
        res.render('app/promociones/descuento',{errors});
    }else{
        
            const new_post=new post();
            

            new_post.titulo = titulo;
            new_post.descripcion = descripcion;
            new_post.detalles = detalles;
            
            new_post.ancho = null;
            new_post.alto = null;
            new_post.grosor = null;
            new_post.diametro = null;
            new_post.separa = null;
            if(req.file){
                new_post.img = 'uploads/' + req.file.filename;
            }
            if(ancho!=null){
                new_post.ancho = ancho;
            }
            if(alto!=null){
                new_post.alto = alto;
            }
            if(grosor!=null){
                new_post.grosor = grosor;
            }
            if(diametro!=null){
                new_post.diametro = diametro;
            }
            if(separa!=null){
                new_post.separa = separa;
            }

            var f = new Date();
            new_post.fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
            new_post.tags = tags.split(" ");
            new_post.likes= 0;
            new_post.coments = 0;
            new_post.shares = 0;   

            await new_post.save();
            req.flash('success_msg','El codigo de Descuento ha sido creado correctamente');
            res.redirect('/publicacion/all');

    }
};

PostCtrl.findPost = async (req,res) => {
    const {buscadorBox} = req.body;

    const posts = await post.find({titulo: buscadorBox}).lean();
    if(posts){
        res.render('app/publicaciones/posts',{posts});
    }else{
        const posts = await post.find({descripcion: buscadorBox}).lean();
        res.render('app/publicaciones/posts',{posts});
    }
};


PostCtrl.renderEditPost = async (req,res) => {
    const publicacion = await post.findById(req.params.id).lean();
    res.render('app/publicaciones/post2',{publicacion});
};


PostCtrl.editPost = async (req,res) => {

    const publicacion = req.body;

    if(req.file){
        publicacion.img= 'uploads/' + req.file.filename;
    }
    
    if(publicacion.alto==''){
        publicacion.alto=null;
    }

    if(publicacion.ancho==''){
        publicacion.ancho=null;
    }

    if(publicacion.grosor==''){
        publicacion.grosor=null;
    }

    if(publicacion.separa==''){
        publicacion.separa=null;
    }

    if(publicacion.diametro==''){
        publicacion.diametro=null;
    }

    await post.findByIdAndUpdate(req.params.id, publicacion);
    req.flash('success_updated','Publicacion actualizada');
    res.redirect('/publicacion/all');

};


PostCtrl.eliminarPost = async (req,res) => {
    await post.findByIdAndDelete(req.params.id);
    req.flash('success_deleted','Publicacion eliminada');
    res.redirect('/publicacion/all');
};

module.exports = PostCtrl;
