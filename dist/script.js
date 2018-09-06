
// variables
let header = document.getElementById('header');

// set the header content for all views
function setHeader() {

  // add home link + hom icon

  let a1 = document.createElement("a");
  a1.href = "/home";

  let img1 = document.createElement("img");
  img1.src = "img/home.png";

  a1.appendChild(img1);

  header.appendChild(a1);

  // add title
  let subtitle = document.createElement("h1");
  subtitle.innerHTML = "VDG Cup";

  header.appendChild(subtitle);

  //add link to form page
  let a2 = document.createElement("a");
  a2.href = "/form";
  let img2 = document.createElement("img");
  img2.src = "img/form.png";

  a2.appendChild(img2);
  header.appendChild(a2);

}

function setFooter() {

}


function setPage() {
  setHeader();
  setFooter();

}


setPage();
