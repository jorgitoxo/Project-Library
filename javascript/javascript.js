const myLibrary = [];
// const myLibraryObj = new Array;

function Book(author, title, pageCount, readStatus) {
    if(!(new.target)) {
        throw Error('Must use the new operator to call the function');
    }
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.readStatus = (readStatus === false) ? "Not read yet" : "Has been read";
    
    this.deleteButton = document.createElement("button");
    this.deleteButton.textContent = "Remove";
    this.deleteButton.addEventListener('click', () => this.delete());
}

Book.prototype.delete = function() {
    this.deleteButton.parentElement.remove();
}

function addBookToMyLibrary(author, title, pageCount, readStatus) {
    const newBook = new Book(author, title, pageCount, readStatus);
    myLibrary.push(newBook);
}

function showBooksInLibrary(library) {
    const booksInLibrary = document.querySelector(".books-list");
    booksInLibrary.replaceChildren();

    library.forEach(element => {
        const bookListing = document.createElement("li");
        const bookCover = document.createElement("div");
        const bookInfo = document.createElement("div");
        const deleteButton = element.deleteButton;

        bookListing.setAttribute('class', "book-container");
        bookCover.setAttribute('class', "book-cover");
        bookInfo.setAttribute('class', "book-info");

        bookListing.appendChild(bookCover);
        bookListing.appendChild(bookInfo);
        bookListing.appendChild(deleteButton);
        booksInLibrary.appendChild(bookListing);

        bookInfo.textContent = `${element.title} ${element.author} ${element.pageCount} ${element.readStatus}`;
    });
}

function newBookModal() {
    const newBookButton = document.getElementById("newBookBtn");
    const dialogWindow = document.getElementById("dialogWindow");
    const dialogForm = document.querySelector("dialog > form");

    const dialogClose = document.getElementById("closeButton");
    const newBookAuthor = document.getElementById("newBookAuthor");
    const newBookTitle = document.getElementById("newBookTitle");
    const newBookPageCount = document.getElementById("newBookPageCount");
    const newBookReadStatus = document.getElementById("newBookReadStatus");

    const dialogAdd = document.getElementById("addButton");
    const dialogCancel = document.getElementById("cancelButton");

    newBookButton.addEventListener('click', () => {
        dialogWindow.showModal();
        return;
    });

    dialogClose.addEventListener('click', () => {
        dialogWindow.close();
    });

    dialogAdd.addEventListener('click', () => {
        addBookToMyLibrary( newBookAuthor.value,
                            newBookTitle.value,
                            newBookPageCount.value,
                            newBookReadStatus.checked);
        showBooksInLibrary(myLibrary);
        dialogForm.reset();
        return;
    });

    dialogCancel.addEventListener('click', () => {
        dialogForm.reset();
        dialogWindow.close();
    })
}


addBookToMyLibrary("George Orwell", "1984", 328, false);
addBookToMyLibrary("Harper Lee", "To Kill a Mockingbird", 281, true);
addBookToMyLibrary("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 309, true);
addBookToMyLibrary("J.R.R. Tolkien", "The Hobbit", 310, false);
addBookToMyLibrary("F. Scott Fitzgerald", "The Great Gatsby", 180, false);
addBookToMyLibrary("Mary Shelley", "Frankenstein", 280, false);
addBookToMyLibrary("Dan Brown", "The Da Vinci Code", 489, true);
addBookToMyLibrary("Jane Austen", "Pride and Prejudice", 279, false);
addBookToMyLibrary("Yuval Noah Harari", "Sapiens: A Brief History of Humankind", 443, false);
addBookToMyLibrary("Markus Zusak", "The Book Thief", 552, false);

showBooksInLibrary(myLibrary);

newBookModal();
