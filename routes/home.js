const express = require('express');
const mysql = require('mysql');

const config = require('../config.json');

const router = express.Router();

// Database Connection
let connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});
// Making a single connection now for reuse.
connection.connect(function(err) {
    if (err) throw err
});


router.get('/', function(req, res){
    res.render("home.html");
});

module.exports = router;