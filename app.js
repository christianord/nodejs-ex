//Requiries
var express = require('express');
var mongoose = require('mongoose');
var bodyParse = require('body-parser');
//importar rutas
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app');

var db_name = "sampledb";

//provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
//Conexion base de datos
mongoose.connection.openUri(mongodb_connection_string, (err, res) => {
    if (err) throw err;

    console.log("base de dato online");
});

//Inicializar Variable
var app = express();
// body parser
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());


//rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

//Escuchar peticion
//app.listen(3000, () => {
//  console.log('Express puerto 3000');
//});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function() {
    console.log("Listening on " + server_ip_address + ", port " + server_port)
});