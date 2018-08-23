const express = require('express');
const app = express();
const path = require('path');
const jsonfile = require('jsonfile')


const Climber = require("./dist/climber.js");

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

app.get('/updateLeaderboard', function (req, res) {

  let jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error');
    }
    else {

      //create climber object list and fill it with JSON data
      let climbers = [];
      obj.contest.climbers.forEach(function(climber) {
        climbers.push(new Climber(climber.name,climber.score,climber.blocs));
      });

      climbers.sort(Climber.compareClimber);

      res.send(JSON.stringify(climbers));

    }//end of else
  });

});


// POST method route
app.post('/addClimber', function (req, res) {

  let jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error');
    }
    else {

      console.log(req);

      obj.contest.climbers.push(new Climber(req.params.name,0,[]));

      climbers.sort(Climber.compareClimber);

      jsonfile.writeFile(jsonFilePath,old_data),function(err) {
        if (err) {
          res.send('Server error');
        }
        else {
          res.send("Climber added !")
        }
      }
    }//end of else
  });
});

app.post('/addPerformance', function (req, res) {

  let jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error');
    }
    else {

      console.log(req);

      let pointUpdated = false;
      let scoresUpdated = false;
      let nbClimberUpdated = 0;
      let oldPoint = 0;

      // set new point for the blocs
      obj.contest.blocs.forEach(function(bloc) {
        if (bloc.id == req.params.id) {
          bloc.climbers.push(req.params.name);
          oldPoint = bloc.point;
          bloc.point = parseInt(1000 / bloc.climbers.length);
          pointUpdated = true;

          if (pointUpdated) {
            // set new climbers updateScores
            bloc.climbers.forEach(function(climberName) {
              obj.contest.climbers.forEach(function(climber) {
                if (climberName == climber.name) {
                  climber.score = climber.score + bloc.point - oldPoint;
                  nbClimberUpdated += 1;
                }
              });
            });
            scoresUpdated = (bloc.climbers.length == nbClimberUpdated);
          }
        }
      });

      if (scoresUpdated) {
        jsonfile.writeFile(jsonFilePath,old_data),function(err) {
          if (err) {
            res.send('Server error');
          }
          else {
            res.send("Performance added !");
          }
        }
      }
      else {
        res.send("Server error");
      }
    }//end of else
  });
});

app.post('/removePerformance', function (req, res) {

  let jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error');
    }
    else {

      console.log(req);

      let pointUpdated = false;
      let scoresUpdated = false;
      let nbClimberUpdated = 0;
      let oldPoint = 0;

      // set new point for the blocs
      obj.contest.blocs.forEach(function(bloc) {
        if (bloc.id == req.params.id) {
          let idx = bloc.climbers.findIndex(a => (a == req.params.name));
          bloc.climbers.splice(idx,1);
          oldPoint = bloc.point;
          bloc.point = parseInt(1000 / bloc.climbers.length);
          pointUpdated = true;

          if (pointUpdated) {
            // set new climbers updateScores
            bloc.climbers.forEach(function(climberName) {
              obj.contest.climbers.forEach(function(climber) {
                if (climberName == climber.name) {
                  climber.score = climber.score + bloc.point - oldPoint;
                  nbClimberUpdated += 1;
                }
              });
            });
            scoresUpdated = (bloc.climbers.length == nbClimberUpdated);
          }
        }
      });

      if (scoresUpdated) {
        jsonfile.writeFile(jsonFilePath,old_data),function(err) {
          if (err) {
            res.send('Server error');
          }
          else {
            res.send("Performance removed !");
          }
        }
      }
      else {
        res.send("Server error");
      }
    }//end of else
  });
});


app.listen(3000, function () {
  console.log('App listening on port 3000 !')

})
