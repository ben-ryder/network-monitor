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


// API Base Endpoint
router.get('/', function(req, res) {
    res.render("message.html", {
        title: "network-monitor v0.1 API Endpoint",
        message: "This is the base URL of the <a href='https://github.com/Ben-Ryder/network-monitor'>network-monitor</a> API. To learn about the  available endpoints check <a href='https://github.com/Ben-Ryder/network-monitor'>here</a>."
    });
});

// Get tests endpoint (post must be used die to the
router.get('/get-tests', function(req, res){
    let filterValues = {};
    if (Object.keys(req.query).length === 4 && req.query.constructor === Object) {
        filterValues.startDate = req.query.startDate;
        filterValues.startTime = req.query.startTime;
        filterValues.endDate = req.query.endDate;
        filterValues.endTime = req.query.endTime;
    }
    else {
        let date = new Date();
        let currentDateString = date.toISOString().slice(0, 10);

        filterValues.startDate = currentDateString;
        filterValues.startTime = "00:00";
        filterValues.endDate = currentDateString;
        filterValues.endTime = "23:59";
    }

    let selectQuery = "SELECT *, DATE_FORMAT(test_date, '%Y-%m-%d') as test_date FROM speed_tests WHERE test_date BETWEEN ? AND ? AND test_time BETWEEN ? AND ? ORDER BY test_date ASC, test_time ASC";
    let queryData = [filterValues.startDate, filterValues.endDate, filterValues.startTime, filterValues.endTime];

    // Make query to insert data
    connection.query(selectQuery, queryData,function (err, result) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;