class Climber{
  constructor(name){
    this.name = name;
    this.score = 0;
    this.blocs = []; //liste de bloc.id
  }

  updateScore() {
    let newScore = 0;
    for (let i = 0; i < this.blocs.length; i++) {
      newScore += this.blocs[i].points;
    }
    this.score = newScore;
  };

}
