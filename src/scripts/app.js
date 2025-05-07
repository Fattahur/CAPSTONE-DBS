import '../styles/main.css'; // CSS diimport ke dalam app.js: Webpack memprosesnya dan menyuntikkan ke dalam HTML.


// // kode untuk pergantin form login dan sign up
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const showSignup = document.getElementById("show-signup");
    const showLogin = document.getElementById("show-login");
  
    showSignup.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.remove("active");
      loginForm.classList.add("exit-left");
      signupForm.classList.add("active");
      signupForm.classList.remove("exit-right");
  
      setTimeout(() => {
        loginForm.classList.remove("exit-left");
      }, 500);
    });
  
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      signupForm.classList.remove("active");
      signupForm.classList.add("exit-right");
      loginForm.classList.add("active");
      loginForm.classList.remove("exit-left");
  
      setTimeout(() => {
        signupForm.classList.remove("exit-right");
      }, 500);
    });
  });
//   // kode untuk pergantin form login dan sign up


// fungsi hamburger
const hamburger = document.querySelector('.hamburger');
  const navbarLink = document.querySelector('.navbar-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarLink.classList.toggle('active');
  });
  

