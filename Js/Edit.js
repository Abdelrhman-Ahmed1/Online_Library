

// Get the book index from local storage
let bookIndex = localStorage.getItem('bookIndex');
let books = JSON.parse(localStorage.getItem('books'));
let book = books[bookIndex];

// Populate the form with the book's current details
document.querySelector('input[name="title"]').value = book.title;
document.querySelector('input[name="id"]').value = book.id;
document.querySelector('input[name="author"]').value = book.author;
document.querySelector('input[name="category"]').value = book.category;
document.querySelector('textarea[name="description"]').value = book.description;
document.getElementById('cover-preview').src = book.cover;

// Add event listener to save changes button
document.getElementById('button').addEventListener('click', (e) => {
    e.preventDefault();
    book.title = document.querySelector('input[name="title"]').value;
    book.id = document.querySelector('input[name="id"]').value;
    book.author = document.querySelector('input[name="author"]').value;
    book.category = document.querySelector('input[name="category"]').value;
    book.description = document.querySelector('textarea[name="description"]').value;

    // Handle file upload
    let fileInput = document.getElementById('photo');
    let file = fileInput.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(event) {
            book.cover = event.target.result;
            books[bookIndex] = book;
            localStorage.setItem('books', JSON.stringify(books));
            window.location.href = 'Admin-Main.html';
        };
        reader.readAsDataURL(file);
    } else {
        books[bookIndex] = book;
        localStorage.setItem('books', JSON.stringify(books));
        window.location.href = 'Admin-Main.html';
    }
});

// Add event listener to file input
document.getElementById('photo').addEventListener('change', (e) => {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('cover-preview').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});
