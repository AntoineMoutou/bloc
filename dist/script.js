
// variables
let header = document.getElementById('header');

// set the header content for all views
function setHeader() {

  // add title
  let title = document.createElement("h1");
  title.innerHTML = "BLOC";
  let a1 = document.createElement("a");
  a1.href = "/home";
  a1.appendChild(title);
  header.appendChild(a1);

  // add subtitle
  let subtitle = document.createElement("h2");
  subtitle.innerHTML = "Bouldering Leaderboard Of the Club";

  header.appendChild(subtitle);

  //add link to form page
  let addBloc = document.createElement("a");
  addBloc.innerHTML = "Add bloc"
  addBloc.href = "/form";
  header.appendChild(addBloc);

}

function setFooter() {

}


function setPage() {
  setHeader();
  setFooter();

}


setPage();
