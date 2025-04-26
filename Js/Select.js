document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  header.classList.add('flash');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('a');
    toggle.addEventListener('click', e => {
      e.preventDefault();
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    });
  });

  document.addEventListener('click', e => {
    if (![...dropdowns].some(d => d.contains(e.target))) {
      dropdowns.forEach(d => d.classList.remove('show'));
    }
  });

  // البحث
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  // عند الكتابة والضغط Enter
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchBooks();
    }
  });

  // عند الضغط على زر البحث
  searchBtn.addEventListener("click", function () {
    searchBooks();
  });
  
  function searchBooks() {
    const query = searchInput.value.trim().toLowerCase();
  
    let results = books;
  
    const selectedTitle = document.getElementById("titleSelect").value;
    const selectedCategory = document.getElementById("categorySelect").value;
    const selectedAuthor = document.getElementById("authorSelect").value;
  
    if (selectedTitle !== "All") {
      results = results.filter(book => book.title === selectedTitle);
    }
  
    if (selectedCategory !== "All") {
      results = results.filter(book => book.category === selectedCategory);
    }
  
    if (selectedAuthor !== "All") {
      results = results.filter(book => book.author === selectedAuthor);
    }
  
    if (query !== "") {
      results = results.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      );
    }
  
    filteredBooks = results;
    currentPage = 1;
    displayBooks(currentPage);
  }
  
  
  

  // Modal events
  const modal = document.getElementById("filterModal");
  const modalClose = document.getElementById("closeModal");
  const filterBtn = document.getElementById("filterBtn");

  filterBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.getElementById("applyFilter").addEventListener("click", () => {
    searchBooks();  // دمج البحث مع الفلاتر
    modal.style.display = "none";
  });
  
  
});

let books = JSON.parse(localStorage.getItem("books")) || [];

if (!books) {

  localStorage.setItem("books", JSON.stringify(books));
}

populateFilterOptions();

function populateFilterOptions() {
  const categorySelect = document.getElementById("categorySelect");
  const authorSelect = document.getElementById("authorSelect");
  const titleSelect = document.getElementById("titleSelect");

  // مسح القديم
  categorySelect.innerHTML = `<option value="All">All</option>`;
  authorSelect.innerHTML = `<option value="All">All</option>`;
  titleSelect.innerHTML = `<option value="All">All</option>`;

  // استخراج القيم الفريدة من الكتب
  const categories = [...new Set(books.map(book => book.category))];
  const authors = [...new Set(books.map(book => book.author))];
  const titles = [...new Set(books.map(book => book.title))];

titles.forEach(title => {
  const option = document.createElement("option");
  option.value = title;
  option.textContent = title;
  titleSelect.appendChild(option);
});

  // تعبئة التصنيفات
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  // تعبئة المؤلفين
  authors.forEach(author => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    authorSelect.appendChild(option);
  });
}

const booksPerPage = 12;
let currentPage = 1;
let filteredBooks = books;

function displayBooks(page) {
  const booksContainer = document.getElementById("booksContainer");
  booksContainer.innerHTML = "";

  const start = (page - 1) * booksPerPage;
  const end = start + booksPerPage;
  const booksToShow = filteredBooks.slice(start, end);

  booksToShow.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
      <img src="${book.image}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.category}</p>
      <button onclick="window.location.href = 'BookDetails.html?title=${encodeURIComponent(book.title)}';">Details</button>
    `;
    booksContainer.appendChild(bookCard);
  });

  displayPagination();
}

function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = i === currentPage ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      displayBooks(currentPage);
    };
    pagination.appendChild(btn);
  }
}


// بداية عرض الكتب
displayBooks(currentPage);

function filterBooks(category) {
  let results = books;

  if (category !== "All") {
    results = results.filter(book => book.category === category);
  }

  // تحديث filteredBooks بناءً على الفلتر
  filteredBooks = results;
  currentPage = 1;  // العودة إلى الصفحة الأولى عند تطبيق الفلتر
  displayBooks(currentPage);
}

// التعامل مع خيارات الفلترة من النافبار
document.getElementById("navBooks").addEventListener("click", () => {
  document.getElementById("titleSelect").value = "All";
  document.getElementById("categorySelect").value = "All";
  document.getElementById("authorSelect").value = "All";
  filteredBooks = books;
  currentPage = 1;
  displayBooks(currentPage);
});

document.getElementById("navCategory").addEventListener("click", () => {
  document.getElementById("filterModal").style.display = "block";
  document.getElementById("categorySelect").value = "Islamic"; 
  document.getElementById("authorSelect").value = "All";
});

document.getElementById("navAuthor").addEventListener("click", () => {
  document.getElementById("filterModal").style.display = "block";
  document.getElementById("authorSelect").value = "Author Name 1"; 
  document.getElementById("categorySelect").value = "All";
});

function handleSubmit(event) {
  event.preventDefault(); // يمنع التحميل التلقائي

  // إخفاء الفورم تدريجيًا
  const form = document.querySelector('.subscribe');
  form.style.transition = 'opacity 0.5s ease';
  form.style.opacity = '0';

  setTimeout(() => {
    form.style.display = 'none';
    
    // عرض الرسالة بتأثير
    const message = document.getElementById('message');
    message.style.display = 'block';
    
    // تشغيل الحركة بعد وقت بسيط
    setTimeout(() => {
      message.classList.add('show');
    }, 50);
  }, 500); // الانتظار لحين اختفاء الفورم
  }