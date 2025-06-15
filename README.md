# Online Library 📚

[![Django](https://img.shields.io/badge/Django-4.2-green?logo=django)](https://www.djangoproject.com/) 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) 
[![Repo Size](https://img.shields.io/github/repo-size/Abdelrhman-Ahmed1/Online_Library)](https://github.com/Abdelrhman-Ahmed1/Online_Library) 
[![Last Commit](https://img.shields.io/github/last-commit/Abdelrhman-Ahmed1/Online_Library)](https://github.com/Abdelrhman-Ahmed1/Online_Library/commits/main)

A web-based library management system built with **Django**, offering book browsing, user registration, admin management, and more. The project includes HTML templates, a SQLite database, and media assets.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install & Run](#install--run)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Database](#database)
- [Customization](#customization)
- [Contributing](#contributing)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Features

- User authentication (register, login, profile editing)
- Admin panel for book/user management
- Browse book catalog & view detailed book information
- Borrowing functionality (basic interface)
- Contact & About pages for users
- Responsive layout using HTML, CSS, JS

---

## Project Structure

```
Online_Library/
├── library/              # Django app  
│   └── templates/        # HTML views  
├── media/                # Static assets (images, PDFs)  
├── PASSWORDS.db          # SQLite DB with credentials  
├── db.sqlite3            # Main application database  
├── manage.py             # Django management  
├── *.html                # Various front-end templates  
└── README.md             # (This file)
```

Major HTML files include:

- `index.html`, `login.html`, `Register.html`, `userProfile.html`, `book-details.html`
- Admin views: `Add-Books.html`, `Admin-Main.html`, `Admin Users.html`
- Utility views: `contact.html`, `About Us.html`, `EditProfile.html`, `Edit.html`

---

## Getting Started

### Prerequisites

Ensure you have:

- Python 3.8+
- pip or virtualenv
- (Optional) Git

### Install & Run

```bash
git clone https://github.com/Abdelrhman-Ahmed1/Online_Library.git
cd Online_Library

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install django  # Or install requirements.txt if added

# Apply migrations & create superuser
python manage.py migrate
python manage.py createsuperuser

# Run the development server
python manage.py runserver
```

Access the application at `http://127.0.0.1:8000/`.

---

## Usage

- **Register** a new user or **login** as an existing user.
- Browse the book catalog on the homepage.
- Click a book to see detailed info & borrowing options.
- For admin: login at `/admin/` to manage books and users.
- Use the **Contact** and **About** pages from the nav menu.

---

## Screenshots

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/Abdelrhman-Ahmed1/Online_Library/blob/54dad08503dbf1cbfe431a2909462538d4ea6ea8/1.png" alt="Project 1" width="300px"/>
      <br/>
      <b>Screen 1</b>
    </td>
    <td align="center">
      <img src="https://github.com/Abdelrhman-Ahmed1/Online_Library/blob/54dad08503dbf1cbfe431a2909462538d4ea6ea8/2.png" alt="Project 2" width="300px"/>
      <br/>
      <b>Screen 2</b>
    </td>
    <td align="center">
    <img src="https://github.com/Abdelrhman-Ahmed1/Online_Library/blob/54dad08503dbf1cbfe431a2909462538d4ea6ea8/3.png" alt="Project 2" width="300px"/>
      <br/>
      <b>Screen 3</b>
    </td>
    
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/Abdelrhman-Ahmed1/Online_Library/blob/54dad08503dbf1cbfe431a2909462538d4ea6ea8/4.png" alt="Project 3" width="300px"/>
      <br/>
      <b>Screen 4</b>
    </td>
    <td align="center">
      <img src="https://github.com/Abdelrhman-Ahmed1/Online_Library/blob/54dad08503dbf1cbfe431a2909462538d4ea6ea8/5.png" alt="Project 3" width="300px"/>
      <br/>
      <b>Screen 5</b>
    </td>
    <td align="center">
      <img src="https://github.com/Abdelrhman-Ahmed1/Online_Library/blob/54dad08503dbf1cbfe431a2909462538d4ea6ea8/6.png" alt="Project 3" width="300px"/>
      <br/>
      <b>Screen 6</b>
    </td>
  </tr>


  <tr>
    <td align="center">
      <img src="https://github.com/Abdelrhman-Ahmed1/Online_Library/blob/54dad08503dbf1cbfe431a2909462538d4ea6ea8/7.png" alt="Project 3" width="300px"/>
      <br/>
      <b>Screen 7</b>
    </td>
    <td align="center">
      <img src="https://github.com/Abdelrhman-Ahmed1/Online_Library/blob/54dad08503dbf1cbfe431a2909462538d4ea6ea8/8.png" alt="Project 3" width="300px"/>
      <br/>
      <b>Screen 8</b>
    </td>
  </tr>
  
</table>

---

## Database

- The built-in `db.sqlite3` and `PASSWORDS.db` are used for demo and quick testing.
- Production use may require migrating to a more robust DB like PostgreSQL or MySQL.
- The database supports schema updates via `manage.py migrate`.

---

## Customization

- **Templates:** Customize HTML, CSS, and JS in the templates and `media/` folders.
- **Django Models & Views:** Expand `library/` app models, forms, or views as needed.
- **Static Files:** Update media assets under `media/` or configure Django's `STATICFILES_DIRS`.

---

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am "Add X feature"`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please ensure code is properly formatted and tested before submitting.

---

## Future Improvements

- Add borrowing workflow & loan tracking
- Integrate search/sort/filter for books
- User roles: Librarian vs Regular User
- Pagination for book lists
- Use PostgreSQL for production
- Add unit tests & Django CI

---

## License

This project is released under the [MIT License](LICENSE).

---

## Contact

Created by Abdelrhman Ahmed. For questions or feedback, feel free to contact or open an issue on GitHub.
