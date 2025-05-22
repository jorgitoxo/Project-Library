const myLibrary = [];

function Book(author, title, pageCount, readStatus) {
    if(!(new.target)) {
        throw Error('Must use the new operator to call the function');
    }
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.readStatus = (readStatus === false) ? "Not read yet" : "Has been read";
}

function addBookToLibrary(author, title, pageCount, readStatus) {
    const newBook = new Book(author, title, pageCount, readStatus);
    myLibrary.push(newBook);
}

function showBooksInLibrary(library) {
    const booksInLibrary = document.querySelector(".books-list");

    library.forEach(element => {
        const bookListing = document.createElement("li");
        const bookCover = document.createElement("div");
        const bookInfo = document.createElement("div");

        bookListing.setAttribute('class', "book-container");
        bookCover.setAttribute('class', "book-cover");
        bookInfo.setAttribute('class', "book-info");

        bookListing.appendChild(bookCover);
        bookListing.appendChild(bookInfo);
        booksInLibrary.appendChild(bookListing);

        bookInfo.textContent = `${element.title} ${element.author} ${element.pageCount} ${element.readStatus}`;
    });
}

addBookToLibrary("George Orwell", "1984", 328, false);
addBookToLibrary("Harper Lee", "To Kill a Mockingbird", 281, true);
addBookToLibrary("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 309, true);
addBookToLibrary("J.R.R. Tolkien", "The Hobbit", 310, false);
addBookToLibrary("F. Scott Fitzgerald", "The Great Gatsby", 180, false);
addBookToLibrary("Mary Shelley", "Frankenstein", 280, false);
addBookToLibrary("Dan Brown", "The Da Vinci Code", 489, true);
addBookToLibrary("Jane Austen", "Pride and Prejudice", 279, false);
addBookToLibrary("Yuval Noah Harari", "Sapiens: A Brief History of Humankind", 443, false);
addBookToLibrary("Markus Zusak", "The Book Thief", 552, false);


showBooksInLibrary(myLibrary);
