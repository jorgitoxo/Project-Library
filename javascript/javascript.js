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

        bookListing.setAttribute('class', "book-container");
        bookCover.setAttribute('class', "book-cover");
        bookInfo.setAttribute('class', "book-info");

        bookListing.appendChild(bookCover);
        bookListing.appendChild(bookInfo);
        booksInLibrary.appendChild(bookListing);

        bookInfo.textContent = `${element.title} ${element.author} ${element.pageCount} ${element.readStatus}`;
    });
}

function newBookModal() {
    const newBookButton = document.getElementById("new-book-button");
    const dialogWindow = document.createElement("dialog");
    newBookButton.appendChild(dialogWindow);

    const dialogForm = document.createElement("form")

    const newBookAuthor = document.createElement("input");
    const newBookTitle = document.createElement("input");
    const newBookPageCount = document.createElement("input");
    const newBookReadStatusYes = document.createElement("input");
    const newBookReadStatusNo = document.createElement("input");

    const newBookAdd = document.createElement("button");
    const dialogClose = document.createElement("button");

    dialogForm.setAttribute('method', 'dialog');
    newBookReadStatusYes.setAttribute('type', 'radio');
    newBookReadStatusYes.setAttribute('name', "readStatusRadio");
    newBookReadStatusNo.setAttribute('type', 'radio');
    newBookReadStatusNo.setAttribute('name', "readStatusRadio");

    newBookAdd.textContent = "Add";
    dialogClose.textContent = "X";
    
    dialogForm.append(  newBookAuthor, newBookTitle, newBookPageCount,
                        newBookReadStatusYes, newBookReadStatusNo,
                        newBookAdd, dialogClose
    );
    dialogWindow.append(dialogForm);

    dialogClose.addEventListener('click', () => {
        dialogWindow.close();
    });

    newBookAdd.addEventListener('click', () => {
        addBookToMyLibrary(newBookAuthor.value, newBookTitle.value,
                            newBookPageCount.value, newBookReadStatusYes
        )
        showBooksInLibrary(myLibrary);
        return;
    });

    newBookButton.addEventListener('click', () => {
        dialogWindow.showModal();
        return;
    });
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
