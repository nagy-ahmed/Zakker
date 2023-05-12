const { default: WebViewer } = require("@pdftron/webviewer");
// After WebViewer has already been constructed
const { ipcRenderer } = require("electron");
// =======================================
// =======================================
let data = localStorage.getItem("data");
// data = JSON.parse(data);
let openedOrNot = false;
let viewerElement = document.querySelector(".viewer");
const container = document.querySelector(".pdf-container");

//three button 
const openFile = document.getElementById("open");
const saveFile = document.getElementById("save");
const returnBtn = document.getElementById("return");

// function asking tha main process to open a dialog
// =================================================
function openFileDialog() {
  ipcRenderer.invoke("open-file-dialog");
}
// =================================================
returnBtn.addEventListener("click", () => {
  window.location.replace("index.html");
});
// =================================================

openFile.addEventListener("click", async function () {
  viewerElement.remove();
  viewerElement = null;
  viewerElement = document.createElement("div");
  viewerElement.classList.add("viewer");
  container.appendChild(viewerElement);
  openFileDialog(); //open dialog for me

  ipcRenderer.on("selected-file", (event, filePath) => {
    const store = localStorage.setItem(
      "data",
      JSON.stringify({ path: filePath })
    );
    data = localStorage.getItem("data");
    data = JSON.parse(data);
    console.log(data.path);
    new WebViewer(
      {
        path: "../public/",
        initialDoc: data.path,
      },
      viewerElement
    );
  });
});

// function highlightText() {
//   const doc = docViewer.getDocument();
//   const annotManager = docViewer.getAnnotationManager();

//   // Create a highlight annotation
//   const highlight = new Annotations.TextHighlightAnnotation();
//   highlight.PageNumber = 1; // Set the page number where you want to highlight the text
//   highlight.Quads = []; // Set the quad points for the text to highlight
//   highlight.Author = annotManager.getCurrentUser();
//   console.log("hello worlf");
//   // Add the highlight annotation to the document
//   annotManager.addAnnotation(highlight);
//   annotManager.drawAnnotations(highlight.PageNumber);
// }
// console.log(highlightText());
{
  // // Enable text selection mode
  // docViewer.setTextSelectionMode();
  // // Add an event listener for when the text is selected
  // docViewer.on("selectionChanged", handleSelection);
  // function handleSelection(e) {
  //   const selectedText = e.selection;
  //   console.log("Selected text:", selectedText);
  // }
}
