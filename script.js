const myLibrary = [];

const modal = document.getElementById('my__modal');
const addBookButton = document.getElementById('add__book__button');
const span = document.getElementsByClassName('close')[0];

addBookButton.onclick = function() {
    modal.style.display = 'flex';
}

span.onclick = function() {
    modal.style.display = 'none';
}

// If user clicks outside of modal, close the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function Book() {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log("Added " + book.title + " to the library");
}