// variables
let setterName = document.getElementById("setterName");
let addRouteSetterButton = document.getElementById("addRouteSetterButton");

let blocId = document.getElementById("blocId");
let routeSetterName = document.getElementById("routeSetterName");
let blocDate = document.getElementById("blocDate");
let blocPlace = document.getElementById("blocPlace");
let addBlocButton = document.getElementById("addBlocButton")

addRouteSetterButton.addEventListener("click",addRouteSetter);

routeSetterName.addEventListener("click",updateRouteSetterName);
blocPlace.addEventListener("click",updateBlocPlacesName);
addBlocButton.addEventListener("click",addBloc);

function addRouteSetter() {

  let name = setterName.value;
  let url = "/addRouteSetter/" + name;

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
    alert("Please write a name.");
  }
}


function updateRouteSetterName() {
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
        displayRouteSetterNames(jsonObj);
      }
    }
  };
  xhr.send();
}

function displayRouteSetterNames(jsonObj) {

  let idx = routeSetterName.selectedIndex;
  let oldSize = routeSetterName.length;

  routeSetterName.innerHTML = "";

  let routeSetterList = Object.keys(jsonObj.contest.routeSetters);
  routeSetterList.sort();

  routeSetterList.forEach(function(name) {

    let option = document.createElement("option");
    option.value = name;
    option.innerText = name;

    routeSetterName.appendChild(option);

  });

  routeSetterName.selectedIndex = idx;
}

function updateBlocPlacesName() {
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
        displayBlocPlacesNames(jsonObj);
      }
    }
  };
  xhr.send();
}

function displayBlocPlacesNames(jsonObj) {

  let idx = blocPlace.selectedIndex;
  let oldSize = blocPlace.length;

  blocPlace.innerHTML = "";

  let blocPlaceList = Object.keys(jsonObj.contest.places);
  blocPlaceList.sort();

  blocPlaceList.forEach(function(place) {

    let option = document.createElement("option");
    option.value = place;
    option.innerText = place;

    blocPlace.appendChild(option);

  });

  blocPlace.selectedIndex = idx;

}

function addBloc() {
  let id = "bloc" + blocId.value;
  let name = routeSetterName.value;
  let date = blocDate.value;
  let place = blocPlace.value;

  let url = "/addBloc/" + id + "/" + date + "/" + place + "/" + name;
  if (id != "" && name != "" && date != "jj/mm/aaaa" && place != "") {
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
    alert("Please fill the form.");
  }
}

updateBlocPlacesName();

updateRouteSetterName();
