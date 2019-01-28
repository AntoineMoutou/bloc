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

// GET methods routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname,'views/home.html'));
});

app.get('/form', function(req, res) {
  res.sendFile(path.join(__dirname,'views/form.html'));
});

app.get('/settings', function(req, res) {
  res.sendFile(path.join(__dirname,'views/settings.html'));
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

app.get('/updateLeaderboard', function (req, res) {

  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (getLeaderboard)');
    }
    else {

      updateBlocs(obj);
      updateClimbers(obj);
      var leaderboardObject = createLeaderboardObject(obj);

      // write new json object into the json file
      jsonfile.writeFile(jsonFilePath,obj,function(err) {
        if (err) {
          res.send('Server error writeFile (updateLeaderboard)');
        }
        else {
          res.setHeader('Content-Type', 'application/json');
          res.json(leaderboardObject);
        }
      }); // end of writeFile

    }//end of else
  });

});


// POST methods routes
app.post('/resetJsonFile', function (req,res) {

  // path of current data of the contest
  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  // set a new JSON object
  var obj = resetJsonFile();

  // write new json object into the json file
  jsonfile.writeFile(jsonFilePath,obj,function(err) {
    if (err) {
      res.send('Server error writeFile (resetJsonFile)');
    }
    else {
      res.send("Json file reset !");
    }
  }); // end of writeFile
}) // end of post method resetJson


app.post('/addBloc/:id/:date/:place/:routeSetterName', function (req,res) {
  // path of current data of the contest
  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  // read the json file and extract the json object it contains into obj variable
  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (addBloc)');
    }
    else {
      // look if the id already exists in the json object to avoid idsakes
      if (blocAlreadyIded(req.params.id, obj)) {
        res.send('Bloc already exists.');
      }
      else {

        // add bloc in json object
        addBloc(req.params.id, req.params.date, req.params.place, req.params.routeSetterName, obj);

        // write new json object into the json file
        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writeFile (addBloc)');
          }
          else {
            res.send("Bloc added !");
          }
        }); // end of writeFile

      } // end of else (alreadyIded)
    }
  }); // end of readFile
})

app.post('/deleteBloc/:id', function (req,res) {
  // path of current data of the contest
  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  // read the json file and extract the json object it contains into obj variable
  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (deleteBloc)');
    }
    else {
      // look if the id already exists in the json object to avoid mistakes
      if (!(blocAlreadyIded(req.params.id, obj))) {
        res.send('Bloc does not exist.');
      }
      else {

        // delete bloc in json object
        deleteBloc(req.params.id, obj);

        // write new json object into the json file
        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writeFile (deleteBloc)');
          }
          else {
            res.send("Bloc deleted !");
          }
        }); // end of writeFile

      } // end of else (alreadyIded)
    }
  }); // end of readFile
})

app.post('/addRouteSetter/:name', function (req, res) {

  // path of current data of the contest
  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  // read the json file and extract the json object it contains into obj variable
  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (addRouteSetter)');
    }
    else {
      // look if the name already exists in the json object to avoid namesakes
      if (routeSetterAlreadyNamed(req.params.name, obj)) {
        res.send('RouteSetter already exists.');
      }
      else {

        // add route setter in json object
        addRouteSetter(req.params.name,obj);

        // write new json object into the json file
        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writeFile (addRouteSetter)');
          }
          else {
            res.send("RouteSetter added !");
          }
        }); // end of writeFile

      } // end of else (alreadyNamed)
    }
  }); // end of readFile
}); //end of post method addRouteSetter

app.post('/addClimber/:name/:gender', function (req, res) {

  // path of current data of the contest
  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  // read the json file and extract the json object it contains into obj variable
  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (addClimber)');
    }
    else {
      // look if the name already exists in the json object to avoid namesakes
      if (climberAlreadyNamed(req.params.name, obj)) {
        res.send('Climber already exists.');
      }
      else {

        // add climber in json object
        addClimber(req.params.name, req.params.gender, obj);

        // write new json object into the json file
        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writeFile (addClimber)');
          }
          else {
            res.send("Climber added !");
          }
        }); // end of writeFile

      } // end of else (alreadyNamed)
    }
  }); // end of readFile
}); //end of post method addClimber


app.post('/addPerformance/:name/:id', function (req, res) {
  // path of current data of the contest
  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  // read the json file and extract the json object it contains into obj variable
  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (addPerformance)');
    }
    else {

      // look if the name already exists in the json object to avoid namesakes
      if (performanceAlreadyExists(req.params.name, req.params.id, obj)) {
        res.send('Performance already exists.');
      }
      else {

        // add performance in json object
        addPerformance(req.params.name, req.params.id, obj);

        // write new json object into the json file
        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writeFile (addPerformance)');
          }
          else {
            res.send("Performance added !");
          }
        }); // end of writeFile
      } // end of else (alreadyNamed)
    } //end of else
  }); // end of readFile
}); // end of post method add performance

app.post('/removePerformance/:name/:id', function (req, res) {
  // path of current data of the contest
  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  // read the json file and extract the json object it contains into obj variable
  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (removePerformance)');
    }
    else {

      // look if the name already exists in the json object to avoid namesakes
      if (!(performanceAlreadyExists(req.params.name, req.params.id, obj))) {
        res.send("Performance already removed.");
      }
      else {

        // remove performance in json object
        removePerformance(req.params.name, req.params.id, obj);

        // write new json object into the json file
        jsonfile.writeFile(jsonFilePath,obj,function(err) {
          if (err) {
            res.send('Server error writeFile (removePerformance)');
          }
          else {
            res.send("Performance removed !");
          }
        }); // end of writeFile
      } // end of else (alreadyNamed)
    } //end of else
  }); // end of readFile
}); // end of post method removePerformance

app.post('/checkPerformance/:name/:id', function (req, res) {
  // path of current data of the contest
  var jsonFilePath = path.join(__dirname, 'data/currentContest.json');

  // read the json file and extract the json object it contains into obj variable
  jsonfile.readFile(jsonFilePath,'utf8',function(err,obj) {
    if (err) {
      res.send('Server error readfile (checkPerformance)');
    }
    else {

      // look if the name already exists in the json object to avoid namesakes
      if (performanceAlreadyExists(req.params.name, req.params.id, obj)) {
        res.send(true);
      }
      else {
        res.send(false);
      } // end of else (alreadyNamed)
    } //end of else
  }); // end of readFile
}); // end of post method add performance



String.prototype.includes = function (str) {
  var returnValue = false;

  if (this.indexOf(str) !== -1) {
    returnValue = true;
  }

  return returnValue;
}

// additional methods
function resetJsonFile() {
  var obj = {"contest":{"blocs":{},"climbers":{},"routeSetters":{},"places":{}}};
  return obj;
}


function climberAlreadyNamed(name,obj) {
  var climberList = Object.keys(obj.contest.climbers);
  return (climberList.includes(name));
}

function addClimber(name,gender,obj) {
  // create and add a new climber
  obj.contest.climbers[name]={"gender":gender,"score":0,"blocs":[]};
}

function routeSetterAlreadyNamed(name,obj){
  var routesetterList = Object.keys(obj.contest.routeSetters);
  return (routesetterList.includes(name));
}

function addRouteSetter(name,obj) {
  // create and add a new climber
  obj.contest.routeSetters[name]={"blocs":[]};
}

function blocAlreadyIded(id,obj) {
  var blocList = Object.keys(obj.contest.blocs);
  return (blocList.includes(id));
}

function addBloc(id,date,place,routeSetterName,obj) {
  // create and add a new climber
  obj.contest.blocs[id]={"date":date,"place":place,"routeSetter":routeSetterName,"point":1000,"climbers":[]};
  obj.contest.routeSetters[routeSetterName].blocs.push(id);
}

function deleteBloc(id,date,place,routeSetterName,obj) {
  // delete bloc by setting its score at 0
  obj.contest.blocs[id].point = 0;
}


function performanceAlreadyExists(name,id,obj) {
  var climberList = Object.keys(obj.contest.climbers);
  var blocList = Object.keys(obj.contest.blocs);
  return (climberList.includes(name) && blocList.includes(id) && obj.contest.climbers[name].blocs.includes(id) && obj.contest.blocs[id].climbers.includes(name));
}

function addPerformance(name,id,obj) {
  obj.contest.blocs[id].climbers.push(name);
  obj.contest.climbers[name].blocs.push(id);

}

function removePerformance(name,id,obj) {

  // remove the climber for bloc climber list
  var idx1 = obj.contest.blocs[id].climbers.findIndex(a => a==name);
  obj.contest.blocs[id].climbers.splice(idx1,1);

  // remove the bloc from climber bloc list and set his new score
  var idx2 = obj.contest.climbers[name].blocs.findIndex(b => b==id);
  obj.contest.climbers[name].blocs.splice(idx2,1);

}

function updateBlocs(obj) {
  var blocList = Object.keys(obj.contest.blocs);
  blocList.forEach( function (blocId){
    var dateOfCreation = obj.contest.blocs[blocId].date;
    var diff = Date.now() - dateOfCreation;
    if (obj.contest.blocs[blocId].point = 0)){
    }
    // else if (diff > (40*24*3600*1000)){
    //   obj.contest.blocs[blocId].point = 0;
    // }
    else {
      obj.contest.blocs[blocId].point = Math.round(1000/obj.contest.blocs[blocId].climbers.length);
    }
  })
}

function updateClimbers(obj) {
  var climberList = Object.keys(obj.contest.climbers);
  climberList.forEach( function (climberName) {
    obj.contest.climbers[climberName].score = 0;
    obj.contest.climbers[climberName].blocs.forEach(function (blocId) {
      obj.contest.climbers[climberName].score += obj.contest.blocs[blocId].point;
    })
  })
}

function createLeaderboardObject(obj) {
  var leaderboardObject = {"men":[], "women":[]};
  var climberList = Object.keys(obj.contest.climbers);
  climberList.forEach( function (climberName) {
    var climberObject = {};
    climberObject.name = climberName;
    climberObject.score = obj.contest.climbers[climberName].score;
    leaderboardObject[obj.contest.climbers[climberName].gender].push(climberObject);
  })
  return leaderboardObject;
}

app.listen(port, function () {
  console.log('App listening on port ' + port + ' !');
})
