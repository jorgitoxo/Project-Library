## DOM element and data object association
> From Briggs E. -- on Discord
Think of the DOM as the view for your data.
Hint: instead of trying to delete specific DOM elements, just rebuild the entire thing after removing it from the data
1. remove data
2. clear DOM section you want to update (In your case, it'd be the list)
3. render

Thouhgts:
- Ok, now I have confirmed that removing all, and rebuilding/re-rendering is the right thing to do.
- Here is what I need to do:
1. Remove the book (object) from the array.
2. Clear the DOM area for listing the books.
3. Re-render the book list.

Example:
```
Book.prototype.delete = function() {
    let bookIndex = 0;

    while ((myLibrary[bookIndex].id !== this.id)) {
        bookIndex++;
    };
    
    myLibrary.splice(bookIndex, 1);
    showBooksInLibrary(myLibrary);
}
```
