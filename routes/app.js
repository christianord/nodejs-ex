var express = require('express');

var app = express();

app.get('/', function(req, res) {

    var connection_string = "No encontro nada";
    // if OPENSHIFT env variables are present, use the available connection info:
    if (process.env.OPENSHIFT_MONGODB_DB_HOST) {

        connection_string = process.env.MONGODB_USERNAME + ":" +
            process.env.MONGODB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.MONGODB_DATABASE;
    }
    res.status(200).json({
        ok: true,
        mensaje: connection_string
    });

});

module.exports = app;