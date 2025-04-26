

// Load books from local storage

let books = JSON.parse(localStorage.getItem('books')) || [];
// if ( localStorage.getItem('books') == null ){
//     document.querySelector('footer').style.position = "fixed";
// }
// else{
//     document.querySelector('footer').style.position = "relative";
// }
// Function to display books
function displayBooks() {
    const bookList = document.querySelector('.books-container');
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="Book Cover" style="width: 100%;">
            <div class="overlay">
                <a href="#" class="btn-overlay" data-index="${index}">View Details</a>
            </div>
            <h3>Title: ${book.title}</h3>
            <div class="book-actions">
                <button class="action-btn edit-btn" data-index="${index}">Edit</button>
                <button class="action-btn delete-btn" data-index="${index}">Delete book</button>
            </div>
        `;
        bookList.appendChild(bookCard);
        // document.querySelector('footer').style.position = "relative";
    });
}

// Display books on page load
displayBooks();

// Add event listener to search input
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm) || book.category.toLowerCase().includes(searchTerm);
    });
    const bookList = document.querySelector('.books-container');
    bookList.innerHTML = '';
    filteredBooks.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="Book Cover">
            <div class="overlay">
                <a href="#" class="btn-overlay" data-index="${books.indexOf(book)}">View Details</a>
            </div>
            <h3>Title: ${book.title}</h3>
            <div class="book-actions">
                <button class="action-btn edit-btn" data-index="${books.indexOf(book)}">Edit</button>
                <button class="action-btn delete-btn" data-index="${books.indexOf(book)}">Delete book</button>
            </div>
        `;
        bookList.appendChild(bookCard);
    });
});


// Function to display confirmation dialog
function confirmDialog(message, callback) {
    const confirmDialog = document.getElementById('confirm-dialog');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');

    confirmMessage.textContent = message;
    confirmDialog.style.display = 'flex';

    confirmYes.onclick = function() {
        confirmDialog.style.display = 'none';
        callback(true);
    };

    confirmNo.onclick = function() {
        confirmDialog.style.display = 'none';
        callback(false);
    };
}


// Add event listener to buttons
document.querySelector('.books-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        confirmDialog("Are you sure you want to delete this book?", (confirmed) => {
            if (confirmed) {
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                // if ( localStorage.getItem("books") == "[]" && localStorage.getItem("books") != null ){
                //     localStorage.removeItem("books");
                //     document.querySelector('footer').style.position = "fixed";
                // }
                displayBooks();
            }
        });
    } else if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        localStorage.setItem('bookIndex', index);
        window.location.href = 'Edit.html';
    } else if (e.target.classList.contains('btn-overlay')) {
        const index = e.target.dataset.index;
        const book = books[index];
        localStorage.setItem('currentBook', JSON.stringify(book));
        window.location.href = 'book-details.html';
    }
});


