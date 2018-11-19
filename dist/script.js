
// variables
let header = document.getElementById('header');

// set the header content for all views
function setHeader() {

  // add home link + home icon

  let title = document.createElement("h1");
  title.innerHTML = "VDG Cup";

  let img1 = document.createElement("img");
  img1.src = "img/VDG.png";
  img1.width = "128";
  img1.height = "128 ";

  let img1bis = document.createElement("img");
  img1bis.src = "img/trophy.png";
  img1bis.width = "64";
  img1bis.height = "64 ";


  let a1 = document.createElement("a");
  a1.href = "/home";
  a1.id = "title";
  a1.style.width = "200px";

  a1.appendChild(img1bis);

  header.appendChild(a1);
  header.appendChild(img1);


  //add link to form page and settings page
  let div = document.createElement("div");

  let a2 = document.createElement("a");
  a2.href = "/form";

  let a3 = document.createElement("a");
  a3.href = "/settings";

  let img2 = document.createElement("img");
  img2.src = "img/form.png";
  img2.width = "64";
  img2.height = "64 ";
  a2.id = "icon2";

  let img3 = document.createElement("img");
  img3.src = "img/settings.png";
  img3.width = "64";
  img3.height = "64 ";
  a3.id = "icon3";

  a2.appendChild(img2);
  a3.appendChild(img3);

  div.appendChild(a2);
  div.appendChild(a3);

  div.style.width = "200px"; 


  header.appendChild(div);

}

function setFooter() {

}


function setPage() {
  setHeader();
  setFooter();

}


setPage();
