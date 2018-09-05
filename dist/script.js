
// variables
let header = document.getElementById('header');

// set the header content for all views
function setHeader() {

  // add title

  let a1 = document.createElement("a");
  a1.innerHTML = "Home";
  a1.href = "/home";
  header.appendChild(a1);

  // add subtitle
  let subtitle = document.createElement("h2");
  subtitle.innerHTML = "VDG Cup";

  header.appendChild(subtitle);

  //add link to form page
  let addBloc = document.createElement("a");
  addBloc.innerHTML = "Form"
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
