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
