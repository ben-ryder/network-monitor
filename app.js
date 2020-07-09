const express = require('express');
const nunjucks = require('nunjucks');
const cron = require('node-cron');
const path = require('path');

const config = require('./config.json');
const speedtest = require('./speedtest');

const app = express()

// Setting up view / template engine
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'templates'), {
  autoescape: true,
  cache: false,
  express: app
});

// Resource directories
app.use(express.static(__dirname +'/dist'));

// Routes
app.use(express.json());

app.use(function (req, res, next) {
  res.set('X-Clacks-Overhead', 'GNU Terry Pratchett'); // http://www.gnuterrypratchett.com/
  next();
});

const homeRoute = require('./routes/home');
app.use('/', homeRoute);


app.use(function (req, res, next) {
  res.status(404).render('message.html', {
    title: "404 - Page not Found",
    message: "Sorry the page your looking for does not exist."
  });
})

// Start server listening for requests
app.listen(config.port, () => {
  console.log(`Server started. Listening on http://localhost:${config.port}`)
});

// Starting speedtest-cli cron task.
cron.schedule(config.speed_test.cron_setting, () => {
  speedtest.runSpeedTest();
});