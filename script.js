let myLibrary = [];
const form = document.querySelector(".addbook-form");
const cardsContainer = document.querySelector(".bookcards-container");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? `already read` : `not read yet`
    }`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

title.addEventListener("input", () => {
  if (title.validity.tooShort)
    title.setCustomValidity("The title is too short!");
  else title.setCustomValidity("");
});

pages.addEventListener("input", () => {
  if (pages.validity.valid) pages.setCustomValidity("");
  else
    pages.setCustomValidity(
      "You can't have read a book with no page count o.O"
    );
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // if (title.value === "" || author.value === "" || pages.value === "") return;

  console.log("ndn", pages.validity);

  const curBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );

  clearFields();

  addBookToLibrary(curBook);
  addBookCard(curBook);
});

cardsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    !e.target.classList.contains("delete-book") &&
    !e.target.classList.contains("btn-book")
  )
    return;

  const bookName = e.target.parentElement.querySelector(".title").innerHTML;
  const curBook = myLibrary.find((book) => book.title === bookName);

  if (e.target.classList.contains("delete-book")) {
    e.target.parentElement.remove();

    // Not necessary by now - used to remove from array
    myLibrary = myLibrary.filter((book) => book !== curBook);
  }

  if (e.target.classList.contains("btn-book")) {
    const buttons = e.target.parentElement.querySelectorAll(".btn-book");
    buttons.forEach((btn) => {
      btn.classList.toggle("hidden");
    });

    // Not necessary by now - used to toggle read/unread from array
    myLibrary[myLibrary.indexOf(curBook)].read =
      !myLibrary[myLibrary.indexOf(curBook)].read;
  }
});

function addBookCard(book) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("book-card");
  newDiv.innerHTML = `
  <button class="delete-book">X</button>
  <h2 class="title">${book.title}</h2>
  <p class="author">By ${book.author}</p>
  <p class="pages">${book.pages} pages</p>
  <button class="btn-read btn-book ${book.read ? "" : "hidden"}">Read</button>
  <button class="btn-unread btn-book ${
    book.read ? "hidden" : ""
  }">Unread</button>
  `;
  cardsContainer.appendChild(newDiv);
}

function clearFields() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.value = "";
}

function init() {
  const newBook = new Book("O Nome do Vento", "Patrick Rothfuss", 874, true);
  addBookToLibrary(newBook);
  addBookCard(newBook);
}

init();
