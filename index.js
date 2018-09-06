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
      if (alreadyIded(req.params.id, obj)) {
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
      if (alreadyNamed(req.params.name, obj)) {
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
        res.send("Performance doesn't exist.");
      }
      else {

        // remove performance in json object
        addPerformance(req.params.name, req.params.id, obj);

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



// additional methods
function resetJsonFile() {
  var obj = {"contest":{"blocs":{},"climbers":{},"routeSetters":{}}};
  return obj;
}


function climberAlreadyNamed(name,obj) {
  console.log(obj.contest.climbers.name);
  return (obj.contest.climbers.name != undefined);
}

function addClimber(name,gender,obj) {
  // create and add a new climber
  obj.contest.climbers[name]({"gender":gender,"score":0,"blocs":[]});
}

function routeSetterAlreadyNamed(name,obj){
  console.log(obj.contest.routeSetters.name);
  return (obj.contest.routeSetters.name != undefined);
}

function addRouteSetter(name,obj) {
  // create and add a new climber
  obj.contest.routeSetters[name]({"blocs":[]});
}

function blocAlreadyIded(id,obj) {
  console.log(obj.contest.blocs.id);
  return (obj.contest.blocs.id != undefined);
}

function addBloc(id,date,place,routeSetterName,obj) {
  // create and add a new climber
  obj.contest.bloc[id]({"date":date,"place":place,"routeSetter":routeSetterName,"point":1000,"climbers":[]});
}


function performanceAlreadyExists(name,id,obj) {
  return (obj.contest.blocs.climbers.includes(name) && obj.contest.climbers.blocs.includes(id));
}

function addPerformance(name,id,obj) {
  obj.contest.blocs[id].climbers.push(name);
  var oldPoint = obj.contest.blocs[id].point;
  console.log("before",oldPoint);
  obj.contest.blocs[id].point = 1000/obj.contest.blocs[id].climbers.length;
  console.log("after",oldPoint);

  obj.contest.blocs[id].climbers.forEach(function(climberName) {
    if (climberName == name) {
      obj.contest.climbers[name].blocs.push(id);
      obj.contest.climbers[name] += obj.contest.blocs[id].point;
    } else {
      obj.contest.climbers[climberName] += obj.contest.blocs[id].point - oldPoint;
    }
  });
}

function removePerformance(name,id,obj) {

  var idx1 = obj.contest.blocs[id].climbers.findIndex(a => a==name);
  obj.contest.blocs[id].climbers.splice(idx1,1);

  var oldPoint = obj.contest.blocs[id].point;
  console.log("before",oldPoint);
  if (obj.contest.blocs[id].climbers.length == 0) {
    obj.contest.blocs[id].point = 1000;
  }
  else {
    obj.contest.blocs[id].point = 1000/obj.contest.blocs[id].climbers.length;
  }
  console.log("after",oldPoint);

  obj.contest.blocs[id].climbers.forEach(function(climberName) {
    if (climberName == name) {
      var idx2 = obj.contest.climbers[name].blocs.findIndex(b => b==id);
      obj.contest.climbers[name].blocs.splice(idx2,1);

      obj.contest.climbers[name] -= oldPoint;
    } else {
      obj.contest.climbers[climberName] += obj.contest.blocs[id].point - oldPoint;
    }
  });
}

app.listen(port, function () {
  console.log('App listening on port ' + port + ' !');

})
