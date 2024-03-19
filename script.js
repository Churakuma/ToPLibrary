function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return this.read ? "Completed" : "Incomplete";
    };
}

const myLibrary = [
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
    new Book("1984", "George Orwell", 328, false),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
    new Book("Pride and Prejudice", "Jane Austen", 279, false),
    new Book("The Catcher in the Rye", "J.D. Salinger", 224, true),
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true)
];

const displayBooks = () => {
    console.log('Displaying books..');
    const booksContainer = document.getElementById('books__container');
    booksContainer.replaceChildren();
    let indexCounter = 0;

    for (const book of myLibrary) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book__card');
        bookCard.setAttribute('data-index', `${indexCounter}`);
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
        booksContainer.appendChild(bookCard);
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
const title = document.getElementById('title');
const titleError = document.getElementById('title__error');
const author = document.getElementById('author');
const authorError = document.getElementById('author__error');
const pages = document.getElementById('pages');
const pagesError = document.getElementById('pages__error');
const read = document.getElementById('read');

title.addEventListener('input', () => {
    if (title.validity.valid) {
        titleError.textContent = '';
        titleError.className = 'valid';
    } else {
        showError();
    }
});

author.addEventListener('input', () => {
    if (author.validity.valid) {
        authorError.textContent = '';
        authorError.className = 'valid';
    } else {
        showError();
    }
});

pages.addEventListener('input', () => {
    if (pages.validity.valid) {
        pagesError.textContent = '';
        pagesError.className = 'valid';
    } else {
        showError();
    }
});

function showError() {
    console.log('displaying errors');
    if (pages.validity.valueMissing) {
        pagesError.textContent = "Please enter the number of pages";
        pagesError.className = 'error';
    } else if (pages.validity.rangeOverflow || pages.validity.rangeUnderflow) {
        pagesError.textContent = "Please enter pages within a range of 1 - 10,000";
        pagesError.className = 'error';
    }

    if (author.validity.valueMissing) {
        authorError.textContent = "Please enter the Author's name";
        authorError.className = 'error';
    } else if (author.validity.rangeOverflow) {
        authorError.textContent = "Please enter an Author name under 100 characers long";
        authorError.className = 'error';
    }

    if (title.validity.valueMissing) {
        titleError.textContent = "Please enter a Title";
        titleError.className = 'error';
    } else if (title.validity.rangeOverflow) {
        titleError.textContent = "Please enter a Title under 100 characers long";
        titleError.className = 'error';
    }
}
    
addBookButton.onclick = () => {
    modal.style.display = 'flex';
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

submitNewBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (title.validity.valid && author.validity.valid && pages.validity.valid) {
        getNewBook();
        displayBooks();
    } else {
        showError();
    }
});

const getNewBook = () => {
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

const closeModal = () => {
    modal.style.display = 'none';
};

span.onclick = closeModal;

// If user clicks outside of modal, close the modal
window.onclick = (event) => {
    if (event.target == modal) {
        closeModal();
    };
};

// Delete and read book functionality
booksContainer.addEventListener('click', (event) => {
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
