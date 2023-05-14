let noteContainer = document.querySelector(".notes-container");
const mainContainer = document.querySelector("body");
// const formContainer = document.createElement("div");
const noteTemplate = document.querySelector(".note");
const addNote = document.getElementById("add-note");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector(".note-form");
const titleInput = document.getElementById("note-title");
const noteInput = document.getElementById("note-body");
const categoryInput = document.getElementById("note-category");
const pagesInput = document.getElementById("book-page");
const sourceInput = document.getElementById("book-src");
// =================================================
// Note class template
class Note {
  constructor(title, body, category, page, source, color = "#555") {
    this.title = title;
    this.body = body;
    this.category = category;
    this.page = page;
    this.source = source;
    this.color = color;
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
}

formContainer.classList.add("form-container");
mainContainer.appendChild(formContainer);

formContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  const newNote = new Note(
    titleInput.value,
    noteInput.value,
    categoryInput.value,
    +pagesInput.value,
    sourceInput.value
  );
  const clonedNote = noteTemplate.cloneNode(true);

  noteContainer.appendChild(clonedNote);
  // notedata is a field of data that i use to take the input of that field and then add it as text content to the wanted place
  noteData = document.getElementById("title");
  noteData.textContent = newNote.getTitle();
  noteData = document.getElementById("body");
  noteData.textContent = newNote.getBody();
  noteData = document.getElementById("category");
  noteData.textContent = newNote.getCategory();
  noteData = document.getElementById("color");
  noteData.textContent = newNote.getColor();
  noteData = document.getElementById("page");
  noteData.textContent = newNote.getPage();
  noteData = document.getElementById("source");
  noteData.textContent = newNote.getSource();
  form.reset();
  formContainer.classList.toggle("hidden");
  noteContainer.style.opacity = "1";
});

// =================================================
addNote.addEventListener("click", function () {
  formContainer.classList.remove("hidden");
  noteContainer.style.opacity = "0.1";
});
// =================================================
