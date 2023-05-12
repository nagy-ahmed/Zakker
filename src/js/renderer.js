// this function is being used to render different data on the same window -> example different html file
// const goTopreview = function (data) {
//   const store = localStorage.setItem("data", JSON.stringify({ path: data }));
//   window.location.replace("preview.html");
// };

// show place of drag and drop only
const returnhome = document.getElementById("home");
const openViewer = document.getElementById("open-viewer");
const openNotes = document.getElementById("open-notes");
const read = document.getElementById("viewer");
const Notes = document.getElementById("notes");

function home() {
  window.location.replace("index.html");
}
function preview() {
  window.location.replace("preview.html");
}
function note() {
  window.location.replace("note.html");
}
//events in side bar
// home.addEventListener("click", home);
returnhome.addEventListener("click", home);
openViewer.addEventListener("click", preview);
openNotes.addEventListener("click", note);

//events in buttons in home
read.addEventListener("click", preview);
Notes.addEventListener("click", note);

// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
