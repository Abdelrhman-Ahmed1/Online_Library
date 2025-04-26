const toggle = document.querySelector(".toggle");
let isAdmin = 0;

toggle.addEventListener("click", () => toggle.classList.toggle("active"));
toggle.addEventListener("click", () => (isAdmin = 1 - isAdmin));

let userCounter = 1;
let adminCounter = 1;

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  if (key.startsWith("admin")) {
    adminCounter++;
  } else if (key.startsWith("user")) {
    userCounter++;
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  const userData = {
    username: username,
    email: email,
    password: password,
  };

  if (password != confirmPassword) {
    window.alert("Passwords don't match!");
    return;
  }
  
  function validateUser(userData) {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let user = JSON.parse(localStorage.getItem(key));
      if (userData.username == user.username || userData.email == user.email) {
        return false;
      }
    }
    return true;
  }

  if (!validateUser(userData)) {
    window.alert("Username or Email are already in use!");
    return;
  }

  if (isAdmin) {
    localStorage.setItem("admin_" + adminCounter++, JSON.stringify(userData));
  } else {
    localStorage.setItem("user_" + userCounter++, JSON.stringify(userData));
  }

  window.alert("Registration Successful!");
  window.open("Login.html", "_self");
});
