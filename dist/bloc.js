class Bloc{
  constructor(id){
    this.id = id;
    this.point = 1000;
    this.climbers = []; // list de climber.name
  }

  updatePoint() {
    this.score = 1000/this.climbers.length;
  };

  updateClimbersScore() {
    for (var i = 0; i < this.climbers.length; i++) {
      this.climbers[i].updateScore();
    }
  }

}
