function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let readStatus = "";
        if (this.read) {
            readStatus = "Completed";
        } else {
            readStatus = "Incomplete";
        }
        return readStatus;
    };
}

const myLibrary = [
    new Book("Prince of Fools", "Mark Lawrence", 245, false),
    new Book("Harry Potter and the Philosopher's Stone", "J.K Rowling", 479, true),
    new Book("Another Book", "Another Author", 300, true),
    new Book("Another Book", "Another Author", 300, true),
    new Book("Another Book", "Another Author", 300, true),
    new Book("Another Book", "Another Author", 300, true),
];

const displayBooks = () => {
    console.log('Displaying books..');
    const booksContainer = document.getElementById('books__container');
    booksContainer.replaceChildren();
    let indexCounter = 0;

    for (const book of myLibrary) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book__card');
        bookCard.setAttribute('data-index', `${indexCounter}`)
        bookCard.innerHTML = `
            <div class="book__card__container">
                <div class="book__card__content">
                    <p>${book.title}</p>
                    <p>Written by: ${book.author}</p>
                    <p>Pages: ${book.pages}</p>
                    <p>${book.info()}</p>
                    <div class="card__action__buttons__container">
                        <button class="card__action__buttons read__button">Read</button>
                        <button class="card__action__buttons delete__button">Delete</button>
                    </div>
                </div>
            </div>
        `;
        booksContainer.appendChild(bookCard)
        indexCounter++;
    }
};

displayBooks();

const modal = document.getElementById('my__modal');
const addBookButton = document.getElementById('add__book__button');
const span = document.getElementsByClassName('close')[0];
const deleteButtons = document.querySelectorAll('.delete__button');
const readButtons = document.querySelectorAll('.read__button');
const booksContainer = document.getElementById('books__container');
const submitNewBookButton = document.getElementById('submit__button');

addBookButton.onclick = function() {
    modal.style.display = 'flex';
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

submitNewBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    getNewBook();
    displayBooks();
});

const getNewBook = () => {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');

    addBookToLibrary(new Book(
        title.value,
        author.value,
        pages.value,
        read.checked
    ));

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;

    closeModal();
}

function closeModal() {
    modal.style.display = 'none';
};

span.onclick = function() {
    closeModal();
};

// If user clicks outside of modal, close the modal
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    };
};

// Delete and read book functionality
booksContainer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('delete__button')) {
        const card = target.closest('.book__card');
        const index = card.dataset.index;
        myLibrary.splice(index, 1);
        console.log("Deleting book " + index);
        displayBooks();
    } else if (target.classList.contains('read__button')) {
        const card = target.closest('.book__card');
        const index = card.dataset.index;
        myLibrary[index].read = !myLibrary[index].read;
        console.log("Changing readStatus of book " + index);
        displayBooks();
    }
});