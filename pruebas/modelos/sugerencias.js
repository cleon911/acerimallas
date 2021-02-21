'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SugerenciaSchema = Schema({
    sugerencia: {
        required:true,
        type:String
    }
});

module.exports = mongoose.model('Sugerencia', SugerenciaSchema);