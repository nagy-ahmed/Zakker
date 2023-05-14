// this function is being used to render different data on the same window -> example different html file
// const goTopreview = function (data) {
//   const store = localStorage.setItem("data", JSON.stringify({ path: data }));
//   window.location.replace("preview.html");
// };

// show place of drag and drop only
const returnhome = document.getElementById("home");
const closePdf = document.getElementById("close");
const openViewer = document.getElementById("read1");
const openNotes = document.getElementById("notes1");
const read = document.getElementById("read2");
const Notes = document.getElementById("notes2");
// const test = document.getElementById("test");

// test.addEventListener("click", function () {
//   window.location.replace("test.html");
// });

function home() {
  window.location.replace("index.html");
}

function preview() {
  window.location.replace("preview.html");
}
function note() {
  window.location.replace("noteViewer.html");
}

//events in side bar
if (returnhome) returnhome.addEventListener("click", home);
if (closePdf) closePdf.addEventListener("click", preview);
if (openViewer) openViewer.addEventListener("click", preview);
if (openNotes) openNotes.addEventListener("click", note);
//events in buttons in home
if (read) read.addEventListener("click", preview);
if (Notes) Notes.addEventListener("click", note);

// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
