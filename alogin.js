const loginForm = document.getElementById("loginForm");
const errorText = document.getElementById("error");

// Sample admin credentials
const adminEmail = "admin@shopsavvy.com";
const adminPassword = "admin123";

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === adminEmail && password === adminPassword) {
    // Simulate redirect to dashboard
    alert("Login successful!");
    window.location.href = "dashboard.html"; // change to your actual dashboard page
  } else {
    errorText.textContent = "Invalid email or password!";
  }
});
