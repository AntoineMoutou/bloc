class Climber{
  constructor(name, score, blocs){
    this.name = name;
    this.score = score; // 0
    this.blocs = blocs; // []
  }

  static compareClimber(a,b) {
    return (parseInt(a.score) < parseInt(b.score));
  }

}

module.exports = Climber;
