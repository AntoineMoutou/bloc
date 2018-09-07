
// variables
let climberName = document.getElementById("climberName");
let addClimberButton = document.getElementById("addClimberButton");

let selectName = document.getElementById("selectName");
let checkboxes = document.getElementsByName('perf');

addClimberButton.addEventListener("click",addClimber);

selectName.addEventListener("click",updateSelectName);
checkboxes.forEach(checkbox => checkbox.addEventListener("click",updatePerformance));

function addClimber() {

  let name = climberName.value;
  let gender = document.querySelector('input[name=climberGender]:checked').value; //climberGender.value;
  let url = "/addClimber/" + name + "/" + gender;

  if (name != "") {
    let b = true;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState != 4 || this.status != 200) {
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


function updatePerformance(event) {
  if (this.checked) {
    addPerformance(event);
  } else {
    removePerformance(event);
  }
}

function addPerformance(event) {

  if (selectName.length == 0) {
    alert("Please select a climber.")
  }
  else {
    let checkbox = event.currentTarget;
    let selectedName = selectName[selectName.selectedIndex].value;

    let id = checkbox.id;
    let url = "/addPerformance/" + selectedName + "/" + id;

    let b = true;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState != 4 || this.status != 200) {
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
  if (selectName.length == 0) {
    alert("Please select a climber.")
  }
  else {
    let checkbox = event.currentTarget;
    let selectedName = selectName[selectName.selectedIndex].value;

    let id = checkbox.id;
    let url = "/removePerformance/" + selectedName + "/" + id;

    let b = true;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState != 4 || this.status != 200) {
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
    if (this.readyState != 4 || this.status != 200) {
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
  console.log(idx);
  let oldSize = selectName.length;

  selectName.innerHTML = "";
  checkboxes.forEach(cb => {cb.checked = false});

  let climberList = Object.keys(jsonObj.contest.climbers);
  climberList.sort();

  climberList.forEach(function(climberName) {

    let option = document.createElement("option");
    option.value = climberName;
    option.innerText = climberName;

    selectName.appendChild(option);

  });

  selectName.selectedIndex = idx;

  if (oldSize==0) {

  } else {
    jsonObj.contest.climbers[selectName.value].blocs.forEach(function(blocId) {
      document.getElementById(blocId).checked = true;
    })
  }
}

updateSelectName();
