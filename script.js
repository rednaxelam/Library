// Book constructor and methods

function Book(title, author, numPages, pagesRead) {

  if (typeof title !== "string") throw new TypeError("title argument must be a string");
  else if (title.length === 0) throw new Error("title argument must have a length of more than 0");
  this.title = title;
  
  if (typeof author !== "string") throw new TypeError("author argument must be a string");
  else if (author.length === 0) throw new Error("author argument must have a length of more than 0");
  this.author = author;
  
  if (typeof numPages !== "number") throw new TypeError("numPages argument must be a number");
  else if (numPages <= 0) throw new Error("numPages must be greater than 0");
  else if (!Number.isInteger(numPages)) throw new Error("numPages must be an integer");
  this.numPages = numPages;
  
  if (typeof pagesRead !== "number") throw new TypeError("pagesRead argument must be a number");
  else if (pagesRead < 0 || pagesRead > numPages) throw new Error(`pagesRead must be between 0 and number of pages in book`);
  else if (!Number.isInteger(pagesRead)) throw new Error("pagesRead must be an integer");
  this.pagesRead = pagesRead;
  
  // progressStatus represents the percentage of the book that has been read
  this.progressStatus = (this.pagesRead / this.numPages) * 100;

  this.bookID = Book.prototype.bookID;
  Book.prototype.bookID++;
}

Book.prototype.bookID = 0;

Book.prototype.setTitle = function(title) {
  if (typeof title !== "string") throw new TypeError("title argument must be a string");
  else if (title.length === 0) throw new Error("title argument must have a length of more than 0");
  this.title = title;
  return this;
}

Book.prototype.getTitle = function() {
  return this.title;
}

Book.prototype.setAuthor = function(author) {
  if (typeof author !== "string") throw new TypeError("author argument must be a string");
  else if (author.length === 0) throw new Error("author argument must have a length of more than 0");
  this.author = author;
  return this;
}

Book.prototype.getAuthor = function() {
  return this.author;
}

Book.prototype.setNumPages = function(numPages) {
  
  if (typeof numPages !== "number") throw new TypeError("numPages argument must be a number");
  else if (numPages <= 0) throw new Error("numPages must be greater than 0");
  else if (!Number.isInteger(numPages)) throw new Error("numPages must be an integer");
  else if (numPages < this.getPagesRead()) throw new Error(`can't assign value of ${numPages} to numPages for book object with pages read of ${this.pagesRead}`);
  this.numPages = numPages;

  this.progressStatus = (this.pagesRead / numPages) * 100;

  return this;
}

Book.prototype.getNumPages = function() {
  return this.numPages;
}

Book.prototype.setPagesRead = function(pagesRead) {
  if (typeof pagesRead !== "number") throw new TypeError("pagesRead argument must be a number");
  else if (pagesRead < 0 || pagesRead > this.getNumPages()) throw new Error(`pagesRead must be between 0 and number of pages in book`);
  else if (!Number.isInteger(pagesRead)) throw new Error("pagesRead must be an integer");
  this.pagesRead = pagesRead;
  
  this.progressStatus = (pagesRead / this.numPages) * 100;

  return this;
}

Book.prototype.getPagesRead = function() {
  return this.pagesRead;
}

Book.prototype.getProgressStatus = function() {
  return this.progressStatus;
}

Book.prototype.getBookID = function() {
  return this.bookID;
}

// Book.prototype.equals = function(that) {
//   if (!(that instanceof Book)) throw new Error("argument for equals must be a Book object");
//   return this.getBookID() === that.getBookID();
// }

// library functions

function addBookLibrary(book) {
  if (!(book instanceof Book)) throw new Error("library can only store book objects");
  library.push(book);
}

function removeBookLibrary(bookID) {
  if (typeof bookID !== "number") throw new TypeError("bookID argument must be a number");
  const bookIndex = library.findIndex(book => book.getBookID() === bookID);
  if (bookIndex === -1) {
    throw new Error("book with given bookID does not exist in library");
  } else {
    library.splice(bookIndex, 1);
  }
}

function accessBookLibrary(bookID) {
  if (typeof bookID !== "number") throw new TypeError("bookID argument must be a number");
  const bookIndex = library.findIndex(book => book.getBookID() === bookID);
  if (bookIndex === -1) {
    throw new Error("book with given bookID does not exist in library");
  } else {
    return library[bookIndex];
  }
}

// DOM functions

function createBookDOMElement(book) {
  function updateProgressIcon(book, progressIcon) {
    if (book.progressStatus === 0) {
      progressIcon.setAttribute('src', './img/icons/book-not-started.svg');
      progressIcon.setAttribute('alt', 'Icon of an unopened book');
    } else if (book.progressStatus === 100) {
      progressIcon.setAttribute('src', './img/icons/read-book.png');
      progressIcon.setAttribute('alt', 'Icon of a finished book');
    } else {
      progressIcon.setAttribute('src', './img/icons/book-in-progress.svg');
      progressIcon.setAttribute('alt', 'Icon of a book in progress');
    }
  } 

  const bookElement = createElement('div', {"class": ["book-card"], "data-book-id": book.getBookID().toString()});

  bookElement.appendChild(createElement('div', {"class": ["progress-background"], 'style': 'width: ' + book.getProgressStatus() + '%;'}));

  const bookCardContent = createElement('div', {"class": ['book-card-content']});
  bookElement.appendChild(bookCardContent);

  const bookCardContentTitleAuthor = createElement('div', {"class": ['book-card-content-title-author']});

  const title = createElement('p', {"class": ['title']});
  title.textContent = book.getTitle();
  bookCardContentTitleAuthor.appendChild(title);

  const author = createElement('p', {"class": ['author']});
  author.textContent = book.getAuthor();
  bookCardContentTitleAuthor.appendChild(author);

  bookCardContent.appendChild(bookCardContentTitleAuthor);

  const bookCardContentPagesOptions = createElement('div', {"class": ['book-card-content-pages-options']});

  const pages = createElement('div', {'class': ['pages']});
  
  const pagesText = createElement('p');
  pagesText.textContent = book.getPagesRead() + ' / ' + book.getNumPages();
  pages.appendChild(pagesText);

  const pagesIcon = createElement('img', {"src": "./img/icons/page.svg", "alt": "Icon of a page"});
  pages.appendChild(pagesIcon);

  bookCardContentPagesOptions.appendChild(pages);

  const options = createElement('div', {"class": ['options']});
  
  const progressIcon = createElement('img');
  updateProgressIcon(book, progressIcon);
  const editIcon = createElement('img');
  editIcon.setAttribute('src', './img/icons/edit.svg');
  editIcon.setAttribute('alt', 'Edit icon');
  const deleteIcon = createElement('img');
  deleteIcon.setAttribute('src', './img/icons/delete-book.svg');
  deleteIcon.setAttribute('alt', 'Delete book icon');
  deleteIcon.addEventListener('click', removeBook);

  options.appendChild(progressIcon);
  options.appendChild(editIcon);
  options.appendChild(deleteIcon);

  bookCardContentPagesOptions.appendChild(options);

  bookCardContent.appendChild(bookCardContentPagesOptions);

  return bookElement;
}

function displayBook(book) {
  const bookDOMElement = createBookDOMElement(book);
  const main = document.querySelector('main');
  main.insertBefore(bookDOMElement, main.lastElementChild);
}

function displayAddBookForm() {
  const mainContentContainer = document.getElementById('main-content-container');
  const popupContainer = document.getElementById('popup-container');
  clearAddEditForm();
  normalValidationBehaviourAddEditForm();

  mainContentContainer.setAttribute('style', 'filter: blur(3px);')
  popupContainer.setAttribute('style', 'z-index: 9999; display: block;')
  document.querySelector('body').setAttribute('style', 'overflow-y: hidden;')
}

function closeAddBookForm() {
  const mainContentContainer = document.getElementById('main-content-container');
  const popupContainer = document.getElementById('popup-container');

  mainContentContainer.removeAttribute('style');
  popupContainer.removeAttribute('style');
  document.querySelector('body').removeAttribute('style');
}


function validateOnblurNumPages() {
  if (this.value.length === 0) {
    this.classList.remove("invalid");
    this.removeEventListener("input", validateOninputNumPages);
  }
  else if (errorFunctionNumPages(this.value) !== undefined) {
    this.nextElementSibling.textContent = errorFunctionNumPages(this.value);
    this.classList.add("invalid");
    this.addEventListener("input", validateOninputNumPages);
  } else {
    this.classList.remove("invalid");
    this.removeEventListener("input", validateOninputNumPages);
  }
}

function validateOninputNumPages() {
  if (errorFunctionNumPages(this.value) !== undefined) {
    this.nextElementSibling.textContent = errorFunctionNumPages(this.value);
    this.classList.add("invalid");
  } else {
    this.classList.remove("invalid");
  }
}

function validatePagesReadOnNumPagesInput() {
  const pagesRead = document.getElementById('pagesRead');
  if (this.value.length === 0 || (errorFunctionNumPages(this.value) !== undefined)) {
    pagesRead.classList.remove("invalid");
  } else if (errorFunctionPagesRead(pagesRead.value) !== undefined) {
    pagesRead.nextElementSibling.textContent = errorFunctionPagesRead(pagesRead.value);
    pagesRead.classList.add("invalid");
  } else {
    pagesRead.classList.remove("invalid");
  }
}

function errorFunctionNumPages(string) {
  const numPages = Number(string);
  if (string.length === 0) return 'Please enter a positive whole number';
  else if (!Number.isFinite(numPages)) return 'Please enter a decimal number';
  else if (numPages <= 0) return 'Please enter a positive number';
  else if (!Number.isInteger(numPages)) return 'Please enter a whole number (integer)';
  else return undefined;
}

// The following function relies on numPages being valid. String can be of 0 length if no pages have been read
function errorFunctionPagesRead(string) {
  const numPages = Number(document.getElementById('numPages').value)

  const pagesRead = Number(string);
  if (!Number.isFinite(pagesRead)) return 'Please enter a decimal number';
  else if (pagesRead < 0) return 'Please enter a non-negative number';
  else if (document.getElementById('numPages').value !== '' && pagesRead > numPages) return `Not possible to have read ${pagesRead} pages of a ${numPages} page book`;
  else if (!Number.isInteger(pagesRead)) return 'Please enter a whole number (integer)';
  else return undefined;
}

function validateOnblurPagesRead() {
  const numPages = document.getElementById('numPages');
  if (this.value.length === 0 || (errorFunctionNumPages(numPages.value) !== undefined)) {
    this.classList.remove("invalid");
    this.removeEventListener("input", validateOninputPagesRead);
  }
  else if (errorFunctionPagesRead(this.value) !== undefined) {
    this.nextElementSibling.textContent = errorFunctionPagesRead(this.value);
    this.classList.add("invalid");
    this.addEventListener("input", validateOninputPagesRead);
  } else {
    this.classList.remove("invalid");
    this.removeEventListener("input", validateOninputPagesRead);
  }
}

function validateOninputPagesRead() {
  const numPages = document.getElementById('numPages');
  if (this.value.length === 0 || (errorFunctionNumPages(numPages.value) !== undefined)) {
    this.classList.remove("invalid");
  } else if (errorFunctionPagesRead(this.value) !== undefined) {
    this.nextElementSibling.textContent = errorFunctionPagesRead(this.value);
    this.classList.add("invalid");
  } else {
    this.classList.remove("invalid");
  }
}

function validateOninput() {
  if (this.checkValidity()) {
    this.classList.remove("invalid");
  } else {
    this.classList.add("invalid");
  }
}

function clearAddEditForm() {
  const addEditInputFields = document.querySelectorAll("#add-edit-book input");
  for (let i = 0; i < addEditInputFields.length; i++) {
    const inputField = addEditInputFields.item(i);
    inputField.value = '';
    inputField.classList.remove('invalid');
  }
}

function normalValidationBehaviourAddEditForm() {
  document.getElementById('title').removeEventListener('input', validateOninput);

  document.getElementById('author').removeEventListener('input', validateOninput);

  document.getElementById('numPages').removeEventListener('input', validateOninputNumPages);
  document.getElementById('numPages').addEventListener('blur', validateOnblurNumPages);
  document.getElementById('numPages').addEventListener('input', validatePagesReadOnNumPagesInput);

  document.getElementById('pagesRead').removeEventListener('input', validateOninputPagesRead);
  document.getElementById('pagesRead').addEventListener('blur', validateOnblurPagesRead);
}

function failedSubmitValidationBehaviourAddEditForm() {
  const title = document.getElementById('title');
  title.addEventListener('input', validateOninput);
  validateOninput.call(title);

  const author = document.getElementById('author');
  author.addEventListener('input', validateOninput);
  validateOninput.call(author);

  const numPages = document.getElementById('numPages');
  numPages.removeEventListener('blur', validateOnblurNumPages);
  numPages.addEventListener('input', validateOninputNumPages);
  validateOninputNumPages.call(numPages);

  const pagesRead = document.getElementById('pagesRead');
  pagesRead.removeEventListener('blur', validateOnblurPagesRead);
  pagesRead.addEventListener('input', validateOninputPagesRead);
  if (!errorFunctionNumPages(numPages)) validateOninputPagesRead.call(pagesRead);
}

function validateAddEditForm(e) {
  const addEditForm = document.getElementById('add-edit-book');
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const numPages = document.getElementById('numPages');
  const pagesRead = document.getElementById('pagesRead');

  if (!addEditForm.checkValidity() || errorFunctionNumPages(numPages.value) !== undefined || errorFunctionPagesRead(pagesRead.value) !== undefined) {
    e.preventDefault();
    failedSubmitValidationBehaviourAddEditForm();
  } else {
    e.preventDefault();
    addBook(title.value, author.value, Number(numPages.value), Number(pagesRead.value));
    closeAddBookForm();
  }
}

// Combined functions (affects both DOM and library simultaneously)

function addBook(title, author, numPages, pagesRead) {
  let book = new Book(title, author, numPages, pagesRead);

  addBookLibrary(book);
  displayBook(book);
}

function removeBook(e) {
  let bookCard = this;
  while (!bookCard.classList.contains("book-card")) {
    bookCard = bookCard.parentNode;
  }
  let bookID = Number(bookCard.getAttribute("data-book-id"));

  bookCard.remove();
  removeBookLibrary(bookID);
}

// Utility functions

function createElement(type, attributes = {}) {
  const element = document.createElement(type);
  for (const key in attributes) {
    if (key === "class") {
        const classArray = attributes["class"];
        for (let i = 0; i < classArray.length; i++) {
          element.classList.add(classArray[i]);
        }
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
  return element;
}

// Page initialization

function initializePage() {
  document.querySelector('.add-book-button').addEventListener('click', displayAddBookForm);
  document.getElementById('close-add-edit-book').addEventListener('click', closeAddBookForm);
  document.getElementById('add-edit-book').addEventListener("submit", validateAddEditForm);
}

// Global calls

const library = [];
initializePage();

addBook('Example Title', 'E. Specimen', 198, 103);
addBook('AAAAAAAAAAAaaaaaaaH pasodifjnpas paosdnfjp[ apsdofjn asdofij a oijafdsoai', 'Mr. Horror Script', 1209, 1209);