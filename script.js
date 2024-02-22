const myLibrary = [
    {
        title: "Prince of Fools",
        author: "Mark Lawrence",
        pages: 245,
        read: false
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K Rowling",
        pages: 479,
        read: true
    }
];

function Book() {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

const modal = document.getElementById('my__modal');
const addBookButton = document.getElementById('add__book__button');
const span = document.getElementsByClassName('close')[0];

addBookButton.onclick = function() {
    modal.style.display = 'flex';
};

span.onclick = function() {
    modal.style.display = 'none';
};

// If user clicks outside of modal, close the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    };
};

function displayBooks(myLibrary) {
    for (Book in myLibrary) {

    };
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log("Added " + book.title + " to the library");
};