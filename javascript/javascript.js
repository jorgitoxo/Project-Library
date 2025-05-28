const myLibrary = [];

function Book(author, title, pageCount, readStatus) {
    if(!(new.target)) {
        throw Error('Must use the new operator to call the function');
    }
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;

    this.readStatusFlag = readStatus;
    this.availableStatus = ["Not read yet", "Has been read"];
    this.readStatus = this.availableStatus[+this.readStatusFlag];

    this.deleteButton = document.createElement("button");
    this.deleteButton.textContent = "Remove";
    this.deleteButton.addEventListener('click', () => this.delete());

    this.statusToggle = document.createElement("button");
    this.statusToggle.textContent = "Toggle status";
    this.statusToggle.addEventListener('click', () => this.toggleStatus());
}

Book.prototype.delete = function() {
    let bookIndex = 0;
    while ((myLibrary[bookIndex].id !== this.id)) {
        bookIndex++;
    };
    
    myLibrary.splice(bookIndex, 1);
    showBooksInLibrary(myLibrary);
}

Book.prototype.toggleStatus = function() {
    this.readStatusFlag = !this.readStatusFlag;
    this.readStatus = this.availableStatus[+this.readStatusFlag];
    showBooksInLibrary(myLibrary);
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
        const statusToggle = element.statusToggle;

        bookListing.setAttribute('class', "book-container");
        bookCover.setAttribute('class', "book-cover");
        bookInfo.setAttribute('class', "book-info");

        // Group all book element nodes into one book listing element
        bookListing.appendChild(bookCover);
        bookListing.appendChild(bookInfo);
        bookListing.appendChild(deleteButton);
        bookListing.appendChild(statusToggle);
        // Append the book listing element node with all its children to the library view
        booksInLibrary.appendChild(bookListing);

        bookInfo.textContent = `${element.title} by ${element.author}. ${element.pageCount} pages. ${element.readStatus}.`;
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

const bookShortlist = [
    {
        "author": "George Orwell",
        "title": "1984",
        "pageCount": 328,
        "readStatus": false
    },
    {
        "author": "Harper Lee",
        "title": "To Kill a Mockingbird",
        "pageCount": 281,
        "readStatus": true
    },
    {
        "author": "J.K. Rowling",
        "title": "Harry Potter and the Sorcerer's Stone",
        "pageCount": 309,
        "readStatus": true
    },
    {
        "author": "J.R.R. Tolkien",
        "title": "The Hobbit",
        "pageCount": 310,
        "readStatus": false
    },
    {
        "author": "F. Scott Fitzgerald",
        "title": "The Great Gatsby",
        "pageCount": 180,
        "readStatus": false
    },
    {
        "author": "Mary Shelley",
        "title": "Frankenstein",
        "pageCount": 280,
        "readStatus": false
    },
    {
        "author": "Dan Brown",
        "title": "The Da Vinci Code",
        "pageCount": 489,
        "readStatus": true
    },
    {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "pageCount": 279,
        "readStatus": false
    },
    {
        "author": "Yuval Noah Harari",
        "title": "Sapiens: A Brief History of Humankind",
        "pageCount": 443,
        "readStatus": false
    },
    {
        "author": "Markus Zusak",
        "title": "The Book Thief",
        "pageCount": 552,
        "readStatus": false
    }
];

bookShortlist.forEach((book) => {
    addBookToMyLibrary(book.author, book.title, book.pageCount, book.readStatus);
});

showBooksInLibrary(myLibrary);
newBookModal();
