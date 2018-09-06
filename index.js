var port = 3000;

if (process.argv.length > 2) {
  port = process.argv[2];
};

const express = require('express');
const app = express();
const path = require('path');
const jsonfile = require('jsonfile')


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

app.get('/getLeaderboard', function (req, res) {

  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (getLeaderboard)');
    }
    else {

      res.setHeader('Content-Type', 'application/json');
      res.json(obj);

    }//end of else
  });

});


// POST method route
app.post('/addClimber/:name', function (req, res) {

  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (addClimber)');
    }
    else {

      var alreadyNamed = false;

      obj.contest.climbers.forEach(function(climber) {
        if (climber.name == req.params.name) {
          alreadyNamed = true;
        }
      });

      if (alreadyNamed) {
        res.send('Climber already exists.')
      } else {
        obj.contest.climbers.push({"name":req.params.name,"score":0,"blocs":[]});

        obj.contest.climbers.sort((a,b) => (a.name > b.name) ); // sort by alphabet

        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writefile (addClimber)');
          }
          else {
            res.send("Climber added !")
          }
        })
      }
    }//end of else
  });
});

app.post('/addPerformance/:name/:id', function (req, res) {

  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (addPerformance)');
    }
    else {

      var pointUpdated = false;
      var scoresUpdated = false;

      // set new point for the blocs
      obj.contest.blocs.forEach(function(bloc) {
        var nbClimberUpdated = 0;
        var oldPoint = 0;
        if (bloc.id == req.params.id) {
          bloc.climbers.push(req.params.name);
          oldPoint = bloc.point;
          bloc.point = parseInt(1000 / bloc.climbers.length);
          pointUpdated = true;

          obj.contest.climbers.forEach(function(climber) {
            if (climber.name == req.params.name) {
              climber.blocs.push(req.params.id);
            }
          });

          if (pointUpdated) {
            // set new climbers updateScores
            bloc.climbers.forEach(function(climberName) {
              obj.contest.climbers.forEach(function(climber) {
                if (climber.name == req.params.name && climber.name == climberName) {
                  climber.score = climber.score + bloc.point;
                  nbClimberUpdated += 1;
                }
                else if(climberName == climber.name) {
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
        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writefile (addPerformance)');
          }
          else {
            res.send("Performance added !");
          }
        })
      }
      else {

        res.send("Server error (pb scoreUpdated add)");
      }
    }//end of else
  });
});

app.post('/removePerformance/:name/:id', function (req, res) {

  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (removePerformance)');
    }
    else {


      var pointUpdated = false;
      var scoresUpdated = false;
      var nbClimberUpdated = 0;
      var oldPoint = 0;

      // set new point for the blocs
      obj.contest.blocs.forEach(function(bloc) {
        if (bloc.id == req.params.id) {
          var idx = bloc.climbers.findIndex(a => (a == req.params.name));
          bloc.climbers.splice(idx,1);
          if (bloc.climbers.length = 0) {
            oldPoint = bloc.point; 
            bloc.point = 1000;
          }
          else {
            
            oldPoint = bloc.point;
            bloc.point = parseInt(1000 / bloc.climbers.length);
            pointUpdated = true;

            obj.contest.climbers.forEach(function(climber) {
              if (climber.name == req.params.name) {
                var idx2 = climber.blocs.findIndex(a => (a == req.params.id));
                climber.blocs.splice(idx2,1);
                climber.score -= oldPoint;
              }
            })

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
        }
      });

      if (scoresUpdated) {
        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writefile (removePerformance)');
          }
          else {
            res.send("Performance removed !");
          }
        })
      }
      else {
        res.send("Server error (pb scoreUpated rm)");
      }
    }//end of else
  });
});


app.listen(port, function () {
  console.log('App listening on port ' + port + ' !');
})
