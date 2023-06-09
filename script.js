const library = [];

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
  
  // 0 means not started, 1 means in progress, 2 means finished
  switch (pagesRead) {
    case 0:
      this.progressStatus = 0;
      break;
    case this.numPages:
      this.progressStatus = 2;
      break;
    default:
      this.progressStatus = 1;
  }

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

  if (numPages === this.getPagesRead()) {
    this.progressStatus = 2;
  }

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
  
  switch (pagesRead) {
    case 0:
      this.progressStatus = 0;
      break;
    case this.numPages:
      this.progressStatus = 2;
      break;
    default:
      this.progressStatus = 1;
  }

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

