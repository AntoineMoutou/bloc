
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
        displayLeaderboard(jsonObj);
      }
    };
  };
  xhr.send();

}

function displayLeaderboard(jsonObj) {
  let rank = 1;

  leaderboard.innerHTML = "";

  let climberList = Object.keys(jsonObj.contest.climbers);
  climberList.sort((a,b) => (parseInt(jsonObj.contest.climbers[a].score) < parseInt(jsonObj.contest.climbers[b].score)));

  // leaderboard header
  let divHeader = document.createElement("tr");
  let divHName = document.createElement("th");
  let divHRank = document.createElement("th");
  let divHScore = document.createElement("th");

  divHName.innerHTML = "Name";
  divHScore.innerHTML = "Score";
  divHRank.innerHTML = "Rank";

  divHRank.style.width = "20%";
  divHName.style.width = "60%";
  divHScore.style.width = "20%";

  divHeader.appendChild(divHRank);
  divHeader.appendChild(divHName);
  divHeader.appendChild(divHScore);

  divHeader.style.display = "flex";
  divHeader.style.flexDirction = "row";
  divHeader.style.justifyContent = "space-around";
  divHeader.style.backgroundColor = "grey";

  leaderboard.appendChild(divHeader);

  climberList.forEach(function(climber) {
    name = climber;
    score = jsonObj.contest.climbers[climber].score;

    let divClimber = document.createElement("tr");
    let divName = document.createElement("td");
    let divRank = document.createElement("td");
    let divScore = document.createElement("td");

    divName.innerHTML = name;
    divScore.innerHTML = score;
    divRank.innerHTML = rank++;

    divRank.style.width = "20%";
    divName.style.width = "60%";
    divScore.style.width = "20%";

    divClimber.appendChild(divRank);
    divClimber.appendChild(divName);
    divClimber.appendChild(divScore);

    divClimber.style.display = "flex";
    divClimber.style.flexDirction = "row";
    divClimber.style.justifyContent = "space-around";

    leaderboard.appendChild(divClimber);
  })
}
