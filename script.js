document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");
  const loadingBar = document.getElementById("loading-bar");

  const loginTime = Date.now();
  localStorage.setItem("lastLogin", loginTime);
  localStorage.setItem("loginDevice", navigator.userAgent);

  if (loadingBar) {
    loadingBar.style.transition = "width 0.4s ease";
    loadingBar.style.width = "0%";
    loadingBar.style.opacity = "1"; // Reset opacity
    loadingBar.style.display = "block";

    setTimeout(() => {
      loadingBar.style.width = "50%";
    }, 100);
  }

  try {
    const response = await fetch("https://login-system-backend-1.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    message.style.color = response.ok ? "green" : "red";
    message.textContent = data.message;

    if (!response.ok) {
      if (loadingBar) {
        loadingBar.style.width = "0%";
        loadingBar.style.opacity = "1";
      }
      setTimeout(() => {
        message.textContent = "";
      }, 4000);
      return;
    }

    localStorage.setItem("username", data.name);
    localStorage.setItem("token", "dummy_token");
    localStorage.setItem("lastLogin", Date.now());
    localStorage.setItem("loginDevice", navigator.userAgent);
    localStorage.setItem("sessionStart", Date.now());

    if (loadingBar) {
      loadingBar.style.width = "100%"; // Animate to full
      setTimeout(() => {
        loadingBar.style.transition = "opacity 0.5s ease"; // Switch to fade-out
        loadingBar.style.opacity = "0"; // Fade out
        setTimeout(() => {
          loadingBar.style.display = "none"; // Hide completely after fade
          loadingBar.style.transition = "width 0.4s ease"; // Reset for next time
        }, 500);
      }, 500); // Wait a moment after reaching 100%
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
