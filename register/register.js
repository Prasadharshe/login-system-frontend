document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value; // Get name field value
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("registerMessage");
    const confirmPassword = document.getElementById("confirmPassword").value;
    const validationMessage = document.getElementById(
      "passwordValidationMessage"
    );

    // Password Validation (At least 1 uppercase, 1 lowercase, 1 number, 1 special character, min 8 characters)
    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordValidation.test(password)) {
      message.style.color = "red";
      message.textContent =
        "Password must contain at least 8 char, including uppercase, lowercase, a number and a special number.";
      setTimeout(() => {
        message.style.display = "none"; // Hide the message after 2 seconds
      }, 4000);
      return; //stop from submission
    }

    // Password match validation
    if (password !== confirmPassword) {
      validationMessage.textContent = "❌ Passwords do not match!";
      validationMessage.style.display = "block"; // Make sure it's visible

      setTimeout(() => {
        validationMessage.style.display = "none"; // Hide the message after 2 seconds
      }, 4000);

      return;
    } else {
      validationMessage.textContent = ""; // Clear any old error
      validationMessage.style.display = "none"; // Hide the message
    }

    try {
      const response = await fetch(
        "https://login-system-backend-1.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }), // Include name
        }
      );

      const data = await response.json();
      message.style.color = response.ok ? "green" : "red";
      message.textContent = data.message;

      if (response.ok) {
        setTimeout(() => {
          window.location.href = "../index.html"; // Redirect to login page
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
