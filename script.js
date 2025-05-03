document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    const spinner = document.getElementById("loading-spinner"); // Spinner element
    const loadingBar = document.getElementById("loading-bar"); // Loading bar element

    if (spinner) spinner.style.display = "flex"; // Show spinner
    if (loadingBar) {
      loadingBar.style.transition = "width 0.4s ease";
      loadingBar.style.width = "0%";
      loadingBar.style.opacity = "1";
      loadingBar.style.display = "block";

      setTimeout(() => {
        loadingBar.style.width = "50%"; // Animate halfway while waiting
      }, 100);
    }

    try {
      const response = await fetch(
        "https://login-system-backend-1.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      message.style.color = response.ok ? "green" : "red";
      message.textContent = data.message;

      if (!response.ok) {
        if (loadingBar) {
          loadingBar.style.width = "0%";
        }
        setTimeout(() => {
          message.textContent = "";
        }, 4000);
        return;
      }

      // If login success
      localStorage.setItem("username", data.name);
      localStorage.setItem("token", "dummy_token");
      localStorage.setItem("sessionStart", Date.now());
      localStorage.setItem("loginDevice", navigator.userAgent);

      // Set current login timestamp
      const currentLoginTime = new Date().toLocaleString();
      // Move previous currentLogin to lastLogin if it exists
      const previousSession = localStorage.getItem("sessionStart");

      if (previousSession) {
        const formattedLastLogin = new Date(
          parseInt(previousSession)
        ).toLocaleString();
        localStorage.setItem("lastLogin", formattedLastLogin);
      } else {
        localStorage.setItem("lastLogin", "First login");
      }

      localStorage.setItem("sessionStart", Date.now()); // Set new session start time

      if (loadingBar) {
        loadingBar.style.width = "100%"; // Fill bar
        setTimeout(() => {
          loadingBar.style.transition = "opacity 0.5s ease";
          loadingBar.style.opacity = "0"; // Fade out
          setTimeout(() => {
            loadingBar.style.display = "none";
            loadingBar.style.transition = "width 0.4s ease"; // Reset transition
          }, 500);
        }, 500);
      }

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      message.style.color = "red";
      message.textContent = "Something went wrong!";

      setTimeout(() => {
        message.textContent = "";
      }, 1000);

      if (loadingBar) {
        loadingBar.style.width = "0%";
        loadingBar.style.opacity = "1";
      }
    } finally {
      if (spinner) spinner.style.display = "none"; // Hide spinner finally
    }
  });

function togglePassword(inputId, iconId) {
  const passwordField = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (passwordField && icon) {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.textContent = "🐵";
    } else {
      passwordField.type = "password";
      icon.textContent = "🙈";
    }
  } else {
    console.error("Element not found: Check your IDs!");
  }
}
