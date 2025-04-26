function toggleBook() {
    document.getElementById("book").classList.toggle("flipped");
}

function togglePage() {
    toggleBook();
}

// Show books by type (borrowed, returned, current)
let currentPage = 0;
let currentBooks = [];
let currentType = '';

function showBooks(type) {
    currentType = type;
    currentPage = 0;
    currentBooks = booksData[type] || [];
    renderPage();
}

function renderPage() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    const start = currentPage * 7;
    const end = start + 7;
    const pageBooks = currentBooks.slice(start, end);

    if (pageBooks.length === 0) {
        bookList.innerHTML = "<li>No books found.</li>";
        return;
    }

    pageBooks.forEach((book, indexOnPage) => {
        const li = document.createElement("li");
        const bookName = (typeof book === "object" && book.name) ? book.name : book;
        li.textContent = bookName;

        if (currentType === 'current') {
            const returnBtn = document.createElement('button');
            returnBtn.textContent = 'Return';
            returnBtn.className = 'return-button';
            const globalIndex = currentPage * 7 + indexOnPage;
            returnBtn.onclick = function () {
                returnBook(globalIndex);
            };
            li.appendChild(returnBtn);
        }

        bookList.appendChild(li);
    });

    document.getElementById("prevBtn").style.display = currentPage > 0 ? "inline-block" : "none";
    document.getElementById("nextBtn").style.display = end < currentBooks.length ? "inline-block" : "none";

    document.getElementById("book").classList.add("flipped");
}

function changePage(direction) {
    currentPage += direction;
    renderPage();
}

function returnBook(index) {
    const book = booksData.current.splice(index, 1)[0];
    booksData.returned.push(book);

    localStorage.setItem('booksData', JSON.stringify(booksData));
    document.getElementById("totalBorrowed").textContent = booksData.borrowed.length;
    document.getElementById("returnedBooks").textContent = booksData.returned.length;
    document.getElementById("currentBorrowed").textContent = booksData.current.length;

    showBooks('current');
}




// Load from localStorage
const storedData = localStorage.getItem("booksData");
if (storedData) {
    window.booksData = JSON.parse(storedData);

    document.getElementById("totalBorrowed").textContent = booksData.borrowed.length;
    document.getElementById("returnedBooks").textContent = booksData.returned.length;
    document.getElementById("currentBorrowed").textContent = booksData.current.length;
} else {
    console.log("No book data found in localStorage.");
    window.booksData = { borrowed: [], returned: [], current: [] };
}

// Profile image preview
  // Load saved image from localStorage on page load
  window.addEventListener('load', function () {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      document.getElementById('coverImage').src = savedImage;
    }
  });

  // Handle image upload and preview + save to localStorage
  document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataUrl = e.target.result;
        document.getElementById('coverImage').src = imageDataUrl;

        // Save image to localStorage
        localStorage.setItem('profileImage', imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  });



  