let myLibrary = [];
const libraryDisplay = document.querySelector("#libraryDisplay");

function Book(title, author, numPages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.finished = false;
}

function addBook(title, author, numPages) {
  let newBook = new Book(title, author, numPages);
  myLibrary.push(newBook);
}

function createBookElement(book) {
  let bookElement = document.createElement("div");
  bookElement.id = book.id;
  bookElement.classList.add("book");

  let titleElement = document.createElement("h3");
  titleElement.textContent = book.title;
  let authorElement = document.createElement("h4");
  authorElement.textContent = `by: ${book.author}`;
  let numPagesElement = document.createElement("p");
  numPagesElement.textContent = `Number of pages: ${book.numPages}`;
  let status = document.createElement("p");
  status.classList.add("status");
  status.textContent = (book.finished) ? "status: finished" : "status: unfinished";
  status.style.backgroundColor = (book.finished) ? "lightgreen" : "status: pink";

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", () => {
    let bookToDelete = document.getElementById(book.id);
    bookToDelete.remove();
    myLibrary = myLibrary.filter((b) => b.id !== book.id);
  });

  let finishedButton = document.createElement("button");
  finishedButton.textContent = "mark read";
  finishedButton.addEventListener("click", () => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === book.id) {
        myLibrary[i].finished ^= true;
        break;
      }
    }

    updateLibraryDisplay();
  });

  let buttonGroup = document.createElement("div");
  buttonGroup.classList.add("buttonGroup");
  buttonGroup.appendChild(deleteButton);
  buttonGroup.appendChild(finishedButton);
  
  for (const el of [titleElement, authorElement, numPagesElement, status, buttonGroup]) {
    bookElement.appendChild(el)
  };

  return bookElement;
}

function updateLibraryDisplay() {
  libraryDisplay.replaceChildren();
  for (const book of myLibrary) {
    libraryDisplay.appendChild(createBookElement(book));
  }
}

const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  addBook(formData.get("title"), formData.get("author"), formData.get("numPages"));
  form.reset();
  updateLibraryDisplay();
});