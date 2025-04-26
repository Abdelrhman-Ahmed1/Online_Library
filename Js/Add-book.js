

// Get the book form element
const bookForm = document.getElementById('book-form');

// Add event listener to book form
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookData = {
        title: document.querySelector('input[name="title"]').value,
        id: document.querySelector('input[name="id"]').value,
        author: document.querySelector('input[name="author"]').value,
        category: document.querySelector('input[name="category"]').value,
        description: document.querySelector('textarea[name="description"]').value,
        cover: '',
    };

    // Get the uploaded file
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];

    if (file) {
        // Create a FileReader to read the file
        const reader = new FileReader();
        reader.onload = () => {
            bookData.cover = reader.result;
            console.log(bookData); // Print the book data

            // Load existing books from local storage
            let books = JSON.parse(localStorage.getItem('books')) || [];
            books.push(bookData);
            localStorage.setItem('books', JSON.stringify(books));
            console.log(books); // Print the books array

            // Clear form fields
            bookForm.reset();

            // Redirect to book list page
            window.location.href = 'Admin-Main.html';
        };
        reader.readAsDataURL(file);
    } else {
        console.log('No file selected');
    }
});


