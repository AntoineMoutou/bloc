
// variables
let header = document.getElementById('header');

// set the header content for all views
function setHeader() {

  // add home link + home icon

  let title = document.createElement("h1");
  title.innerHTML = "VDG Cup";

  let a1 = document.createElement("a");
  a1.href = "/home";
  a1.id = "title";

  a1.appendChild(title);

  header.appendChild(a1);

  //add link to form page and settings page
  let div = document.createElement("div");

  let a2 = document.createElement("a");
  a2.href = "/form";

  let a3 = document.createElement("a");
  a3.href = "/settings";

  let img2 = document.createElement("img");
  img2.src = "img/form.png";
  img2.width = "32";
  img2.height = "32 ";
  a2.id = "icon2";

  let img3 = document.createElement("img");
  img3.src = "img/settings.png";
  img3.width = "32";
  img3.height = "32 ";
  a3.id = "icon3";

  a2.appendChild(img2);
  a3.appendChild(img3);

  div.appendChild(a2);
  div.appendChild(a3);

  header.appendChild(div);

}

function setFooter() {

}


function setPage() {
  setHeader();
  setFooter();

}


setPage();
