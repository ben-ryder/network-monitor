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

function bitsToMegaBits(bits) {
    return bits / 1000000
}

function saveResult(result){
    let insertQuery = "INSERT INTO speed_tests (test_date, test_time, ping_speed, download_speed, upload_speed) VALUES (?)";

    let queryData = [
        [
            result.date,
            result.time,
            result.ping,
            result.download,
            result.upload
        ]
    ];

    connection.query(insertQuery, queryData, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
}

function runSpeedTest(){
    exec("speedtest-cli --json", function(error, stdout, stderr){
        if (error){
            throw error;
        }
        else if (stderr){
            throw stderr;
        }
        else {
            let rawResults = JSON.parse(stdout)

            let date = rawResults.timestamp.substring(0, 10);
            let time = rawResults.timestamp.substring(11, 16);

            let processedResult = {
                date: date,
                time: time,
                ping: rawResults.ping,
                download: bitsToMegaBits(rawResults.download).toPrecision(4),
                upload: bitsToMegaBits(rawResults.upload).toPrecision(4),
            }
            saveResult(processedResult);
        }
    });
}

module.exports = {
    runSpeedTest: runSpeedTest
}