const {Schema, model} = require('mongoose');

 const PostSchema = new Schema({
    titulo:     {type: String, required: true},
    descripcion:{type: String, required: true},
    detalles:   {type: String, required: true},
    ancho:      String,
    alto:       String,
    grosor:     String,
    diametro:   String,
    separa:     String,
    img:        String,
    fecha:      String,
    tags: {
        tag:    String
    },
    likes:      Number,
    coments:    Number,
    shares:     Number      
});

module.exports = model('post',PostSchema);