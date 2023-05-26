const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = document.getElementById("title"),
  bodyTag = document.getElementById("body"),
  catTag = document.getElementById("category"),
  pageTag = document.getElementById("page"),
  sourceTag = document.getElementById("source"),
  addBtn = popupBox.querySelector("button");
colorButtons = document.querySelectorAll(".color-btn");

class Note {
  constructor(title, body, category, page, source, color = 0, date) {
    this.title = title;
    this.body = body;
    this.category = category;
    this.page = page;
    this.source = source;
    this.color = color;
    this.date = date;
  }
  // Getter methods
  getTitle() {
    return this.title;
  }
  getBody() {
    return this.body;
  }
  getCategory() {
    return this.category;
  }
  getPage() {
    return this.page;
  }
  getSource() {
    return this.source;
  }
  getColor() {
    return this.color;
  }
  getDate() {
    return this.date;
  }
  // Setter methods
  setTitle(title) {
    this.title = title;
  }
  setBody(body) {
    this.body = body;
  }
  setCategory(category) {
    this.category = category;
  }
  setPage(page) {
    this.page = page;
  }
  setSource(source) {
    this.source = source;
  }
  setColor(color) {
    this.color = color;
  }
  setDate(date) {
    this.date = date;
  }
}
const colorArray = [
  "#275be8aa",
  "#e527e8aa",
  "#e71f36aa",
  "#2ce971aa",
  "#e9e62cb9",
  "#ecece78a",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = bodyTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});
function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.body.replaceAll("\n", "<br/>");
    let liTag = `<li class="note" style="background:${
      colorArray[note.color]
    } !important">
                          <div class="details">
                              <p>${note.title}</p>
                              <span>${filterDesc}</span>
                              <span>${note.category}</span>
                              <span>${note.page}</span>
                              <span>${note.source}</span>
                          </div>
                          <div class="bottom-content">
                              <span>${note.date}</span>
                              <div class="settings">
                                  <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                  <ul class="menu">
                                      <li onclick="updateNote(${id}, '${
      note.title
    }', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                      <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                  </ul>
                              </div>
                          </div>
                      </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  // let confirmDel = confirm("Are you sure you want to delete this note?");
  // if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, filterDesc) {
  let body = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  bodyTag.value = body;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}
let c = 0;
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("color-btn")) {
    c = e.target.getAttribute("data-value");
  }
});
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    body = bodyTag.value.trim(),
    category = catTag.value.trim(),
    page = pageTag.value.trim(),
    color = c,
    source = sourceTag.value.trim();
  if (title || body) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();

    // let noteInfo = { title, body, date: `${month} ${day}, ${year}` };
    let noteInfo = new Note(
      title,
      body,
      category,
      page,
      source,
      color,
      `${month} ${day}, ${year}`
    );

    if (!isUpdate) {
      notes.push(noteInfo);
      c = 0;
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});
