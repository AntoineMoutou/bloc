import Climber from "climber.js";
import Bloc from "bloc.js";

class Contest {
  constructor() {
    this.blocs = new Map();
    this.climbers = new Map();
  }

  constructor(blocs, climbers){
    this.blocs = blocs;
    this.climbers = climbers;
  }

  addClimber(name) {
    let climber = new Climber(name);
    this.climbers.set(climber.name, climber);
  }

  addBloc(id) {
    let bloc = new Bloc(id);
    this.blocs.set(bloc.id, bloc);
  }

  addPerformance(name,id) {
    this.climbers[name].blocs.push(id);

    this.blocs[id].climbers.push(name);
    this.blocs[id].updatePoint();

    this.updateScores(id);
  }

  updateScores(id) {
    this.blocs[id].climbers.forEach(function(name) {
      updateScore(name);
    });
  }
  updateScore(name) {
    let newScore = 0;
    this.climbers[name].blocs.forEach(function(id) {
      newScore += this.blocs[id].point;
    });
    this.climbers[name].score = newScore;
  }

  reset() {
    this.blocs = new Map();
    this.climbers = new Map();
  }
}
