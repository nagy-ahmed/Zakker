const { default: WebViewer } = require("@pdftron/webviewer");
const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}
// =======================================
// =======================================
const lastOpenedContainer = document.querySelector(".viewer");
let lastOpenedPDFs = JSON.parse(localStorage.getItem("lastOpenedPDFs")) || [];
lastOpenedPDFs.forEach((pdfFilePath, index) => {
  let btn = document.createElement("button");
  btn.classList.add("last-opened-btn");
  if (fileExists(pdfFilePath)) {
    btn.textContent = `${pdfFilePath}`;
    lastOpenedContainer.appendChild(btn);
  }
  // console.log(`${index + 1}. ${pdfFilePath}`);
});
let data = JSON.parse(localStorage.getItem("data"));
let viewerElement = document.querySelector(".viewer");
const container = document.querySelector(".pdf-container");
const openFile = document.getElementById("open");

// function asking tha main process to open a dialog
// =================================================
function openFileDialog() {
  ipcRenderer.invoke("open-file-dialog");
}

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("last-opened-btn")) {
    const data = { path: event.target.textContent };
    localStorage.setItem("data", JSON.stringify(data));

    viewerElement.remove();
    viewerElement = document.createElement("div");
    viewerElement.classList.add("viewer");
    container.appendChild(viewerElement);
    new WebViewer(
      {
        path: "../public/",
        initialDoc: data.path,
      },
      viewerElement
    );
  }
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
    data = localStorage.setItem("data", JSON.stringify({ path: filePath }));
    lastOpenedPDFs.unshift(filePath);
    lastOpenedPDFs = Array.from(new Set(lastOpenedPDFs));

    if (lastOpenedPDFs.length > 10) {
      lastOpenedPDFs.pop();
    }
    localStorage.setItem("lastOpenedPDFs", JSON.stringify(lastOpenedPDFs));
    //
    data = localStorage.getItem("data");
    data = JSON.parse(data);
    // console.log(data.path);
    new WebViewer(
      {
        path: "../public/",
        initialDoc: data.path,
      },
      viewerElement
    );
  });
});
