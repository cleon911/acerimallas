const mongoose = require('mongoose');

const {HOST, PASS, DB} = process.env;

const URI = `mongodb+srv://${HOST}:${PASS}@cluster0.lkgz8.mongodb.net/${DB}?retryWrites=true&w=majority`;


mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(db => console.log('Base de datos esta conectado'))
.catch(err => console.log(err));

