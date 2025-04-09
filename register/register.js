document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value; // Get name field value
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("registerMessage");

    // Password Validation (At least 1 uppercase, 1 lowercase, 1 number, 1 special character, min 8 characters)
    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordValidation.test(password)) {
      message.style.color = "red";
      message.textContent ="Password must contain at least 8 char, including uppercase, lowercase, a number and a special number.";
      return; //stop from submission
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Include name
      });

      const data = await response.json();
      message.style.color = response.ok ? "green" : "red";
      message.textContent = data.message;

      if (response.ok) {
        setTimeout(() => {
          window.location.href = "/index.html"; // Redirect to login page
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      message.style.color = "red";
      message.textContent = "Something went wrong!";
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
