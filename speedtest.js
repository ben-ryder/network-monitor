const speedTest = require('speedtest-net');
const mysql = require('mysql');
const exec = require('child_process').exec;

const config = require('./config.json');

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

function bytesPerSecondToMbps(bytesPerSecond) {
    return bytesPerSecond / 125000
}

function parseTimestamp(timestamp) {

    let date =
        timestamp.getFullYear() + "-" +
        ("0" + (timestamp.getMonth() + 1)).slice(-2) + "-" +
        ("0" + timestamp.getDate()).slice(-2);

    let time =
        ("0" + timestamp.getHours()).slice(-2) + ":" +
        ("0" + timestamp.getMinutes()).slice(-2) + ":" +
        ("0" + timestamp.getSeconds()).slice(-2);

    return {
        date: date,
        time: time,
    }
}

function saveResult(result){
    let insertQuery = "INSERT INTO speed_tests (test_date, test_time, ping_speed, download_speed, upload_speed) VALUES (?)";

    let parsedTimestamp = parseTimestamp(result.timestamp);

    let queryData = [
        [
            parsedTimestamp.date,
            parsedTimestamp.time,
            result.ping.latency,
            bytesPerSecondToMbps(result.download.bandwidth),
            bytesPerSecondToMbps(result.upload.bandwidth)
        ]
    ];

    connection.query(insertQuery, queryData, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
}

function runSpeedTest(){
    speedTest({
        acceptLicense: true,
        acceptGdpr: true,
    })
        .then((result) => { saveResult(result) })
        .catch((err) => { console.log(err.message); })
}

module.exports = {
    runSpeedTest: runSpeedTest
}