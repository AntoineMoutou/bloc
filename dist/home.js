
let leaderboard = document.getElementById("leaderboard");
let updateButton = document.getElementById("updateButton");

updateButton.addEventListener("click", updateLeaderboard);



function updateLeaderboard() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/getLeaderboard", true);
  xhr.onreadystatechange = function () {
    if (this.readyState != 4 || this.status != 200) {
      if (this.responseText == 'Server error') {
        alert(this.responseText);
      }
      else if (this.responseText == '') {

      }
      else {
        jsonObj = JSON.parse(this.responseText);
        jsonObj.contest.climbers.sort((a,b) => (parseInt(a.score) < parseInt(b.score)) ); //sort climbers
        displayLeaderboard(jsonObj);
      }
    };
  };
  xhr.send();

}

function displayLeaderboard(jsonObj) {
  let rank = 1;

  jsonObj.contest.climbers.forEach(function(climber) {
    name = climber.name;
    score = climber.score;

    let divClimber = document.createElement("div");
    let divName = document.createElement("div");
    let divRank = document.createElement("div");
    let divScore = document.createElement("div");

    divName.innerHTML = name;
    divScore.innerHTML = score;
    divRank.innerHTML = rank++;

    divClimber.appendChild(divRank);
    divClimber.appendChild(divName);
    divClimber.appendChild(divScore);

    divClimber.style.display = "flex";
    divClimber.style.flexDirction = "row";
    divClimber.style.justifyContent = "space-around";

    leaderboard.appendChild(divClimber);
  })
}
