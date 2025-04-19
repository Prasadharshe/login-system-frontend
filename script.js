document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");
  const spinner = document.getElementById("loading-spinner"); // <-- Spinner element

  if (spinner) spinner.style.display = "flex"; // Show spinner

  try {
    const response = await fetch("https://login-system-backend-1.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // Ensure response is parsed as JSON

    message.style.color = response.ok ? "green" : "red";
    message.textContent = data.message; // Display backend response message

    if (!response.ok) {
      // Hide the message after 4 seconds if login fails
      setTimeout(() => {
        message.textContent = "";
      }, 4000);
      return; // Stop execution for failed login
    }

    // If login is successful, store username & token
    localStorage.setItem("username", data.name); // Store the logged-in user's name
    localStorage.setItem("token", "dummy_token"); // Token simulation

    setTimeout(() => {
      window.location.href = "dashboard.html"; // Redirect after successful login
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
    message.style.color = "red";
    message.textContent = "Something went wrong!";

    // Hide the error message after 1 second
    setTimeout(() => {
      message.textContent = "";
    }, 1000);
  } finally {
    if (spinner) spinner.style.display = "none"; // Hide spinner
  }
});

function togglePassword(inputId, iconId) {
  const passwordField = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (passwordField && icon) {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.textContent = "🐵"; // Open eyes
    } else {
      passwordField.type = "password";
      icon.textContent = "🙈"; // Closed eyes
    }
  } else {
    console.error("Element not found: Check your IDs!");
  }
}
