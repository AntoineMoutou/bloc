
// variables
let climberName = document.getElementById("climberName");
let addClimberButton = document.getElementById("addClimberButton");

let selectName = document.getElementById("selectName");
let selectBlocId = document.getElementById("selectBlocId");
let addPerformanceButton = document.getElementById('addPerformanceButton');
let removePerformanceButton = document.getElementById('removePerformanceButton');

addClimberButton.addEventListener("click",addClimber);

selectName.addEventListener("click",updateSelectName);
addPerformanceButton.addEventListener("click",addPerformance);
removePerformanceButton.addEventListener("click",removePerformance);

 setMaxBlocs();


function addClimber() {

  let name = climberName.value;
  let gender = document.querySelector('input[name=climberGender]:checked').value; //climberGender.value;
  let url = "/addClimber/" + name + "/" + gender;

  if (name != "") {
    let b = true;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState &= 4 && this.status == 200) {
        let response = this.responseText;
        if (response != "" && b) {
          b=false;
          alert(response);
        }
      };
    };
    xhr.send();
  }
  else {
    alert("Please write a name and / or choose a gender.")
  }
}


function addPerformance(event) {

  if (selectName.value == "") {
    alert("Please select a climber.")
  }
  else if (selectBlocId.value == "") {
    alert("Please select a bloc id.");
  }
  else {
    let checkbox = event.currentTarget;
    let selectedName = selectName[selectName.selectedIndex].value;

    let id = "bloc"+selectBlocId.value;
    let url = "/addPerformance/" + selectedName + "/" + id;

    let b = true;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText;
        if (response != "" && b) {
          b=false;
          alert(response);
        }
      };
    };
    xhr.send();
  }
}

function removePerformance(event) {
  if (selectName.value == "") {
    alert("Please select a climber.")
  }
  else if (selectBlocId.value == "") {
    alert("Please select a bloc id.");
  }
  else {
    let checkbox = event.currentTarget;
    let selectedName = selectName[selectName.selectedIndex].value;

    let id = "bloc"+selectBlocId.value;
    let url = "/removePerformance/" + selectedName + "/" + id;

    let b = true;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText;
        if (response != "" && b) {
          b=false;
          alert(response);
        }
      };
    };
    xhr.send();
  }
}


function updateSelectName() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/getLeaderboard", true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == 'Server error') {
        alert(this.responseText);
      }
      else if (this.responseText == '') {

      }
      else {
        jsonObj = JSON.parse(this.responseText);
        displayNames(jsonObj);
      }
    }
  };
  xhr.send();
}

function displayNames(jsonObj) {

  let idx = selectName.selectedIndex;
  let oldSize = selectName.length;

  selectName.innerHTML = "";

  let climberList = Object.keys(jsonObj.contest.climbers);
  climberList.sort();

  climberList.forEach(function(climberName) {

    let option = document.createElement("option");
    option.value = climberName;
    option.innerText = climberName;

    selectName.appendChild(option);

  });

  selectName.selectedIndex = idx;

}


function performanceAlreadyExists(name, blocId) {

  let url = "/checkPerformance/" + name + "/" + blocId;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = this.responseText;
      if (response == "true") {
        return true;
      }
      else if (response == "false"){
        return false;
      }
    };
  };
  xhr.send();
}

function setMaxBlocs() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/getMaxBlocId", true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == 'Server error') {
        alert(this.responseText);
      }
      else if (this.responseText == '') {

      }
      else {
        max = parseInt(this.responseText);
        selectBlocId.max = max;
        selectBlocId.placeholder = "1 - " + max;

      }
    }
  };
  xhr.send();
}

updateSelectName();
