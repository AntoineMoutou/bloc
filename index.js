const express = require('express');
const app = express();
const path = require('path');

import Contest from "contest.js";
import Climber from "climber.js";
import Bloc from "bloc.js";

let contest = new Contest();

// add dist
app.use(express.static(path.join(__dirname, 'dist')));

// GET methods route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname,'views/home.html'));
});

app.get('/form', function(req, res) {
  res.sendFile(path.join(__dirname,'views/form.html'));
});

// POST method route
app.post('/addClimber', function (req, res) {
  res.send('POST request to the homepage');
});

app.post('/addPerformance', function (req, res) {
  res.send('POST request to the homepage');
});

app.post('/updateLeaderboard', function (req, res) {
  res.send('POST request to the homepage');
});

app.post('/saveAll', function (req, res) {
  res.send('POST request to the homepage');
});


function createContest() {
  // get json file as a json obj
  // then extract climbers and blocs into 2 maps
  // then create a Contest object
}

function exportContest() {
  // rewrite the JSON file from Contest object data
}

function getLeaderBoard() {
  // get the climbers ordonned list with scores
}


app.listen(3000, function () {
  console.log('App listening on port 3000 !')
})
