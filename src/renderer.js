// this function is being used to render different data on the same window -> example different html file
const goToPriview = function (data) {
  const store = localStorage.setItem("data", JSON.stringify({ path: data }));
  window.location.replace("priview.html");
};
// ============================================
// show place of drag and drop only
const openViewer = document.getElementById("open-viewer");
const openNotes = document.getElementById("open-notes");
openViewer.addEventListener("click", function () {
  window.location.replace("priview.html");
});
openNotes.addEventListener("click", function () {
  window.location.replace("note.html");
});
