document.addEventListener("DOMContentLoaded", () => {
  // Retrieve username from localStorage
  const username = localStorage.getItem("username") || "User";
  const usernameElement = document.getElementById("username");

  if (usernameElement) {
    usernameElement.textContent = username; // Use 'username' instead of 'user.name'
  } else {
    console.error("⚠️ Element with ID 'username' not found in HTML.");
  }

  // Handle Hamburger Menu Click
  const hamburger = document.querySelector(".hamburger");
  const navUl = document.querySelector(".nav-left");

  if (hamburger && navUl) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("cross");
      navUl.classList.toggle("show");
    });

    // Close menu if window resizes above 769px
    window.addEventListener("resize", () => {
      if (window.innerWidth > 769) {
        navUl.classList.remove("show");
        hamburger.classList.remove("cross");
      }
    });
  } else {
    console.error("⚠️ Hamburger menu or navigation not found.");
  }

  // Handle Logout Button Click (With Confirmation)
  const logoutButton = document.querySelector(".logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      showLogoutPopup();
    });
  }

  function showLogoutPopup() {
    const popup = document.getElementById("logoutPopup");
    if (popup) {
      popup.style.display = "block";
    } else {
      console.error("⚠️ Logout popup not found in HTML.");
    }
  }

  // Handle Yes (Logout)
  const confirmLogout = document.getElementById("confirmLogout");
  if (confirmLogout) {
    confirmLogout.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username"); // Clear username on logout
      window.location.href = "index.html"; // Redirect to login page
    });
  }

  // Handle No (Cancel)
  const cancelLogout = document.getElementById("cancelLogout");
  if (cancelLogout) {
    cancelLogout.addEventListener("click", () => {
      document.getElementById("logoutPopup").style.display = "none"; // Hide popup
    });
  }
});

// Toggle Menu Function (For External Use If Needed)
function toggleMenu() {
  const navUl = document.querySelector(".nav-left");
  if (navUl) {
    navUl.classList.toggle("show");
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const themeButton = document.getElementById("themeButton");
//   const themePopup = document.getElementById("themePopup");
//   const closeThemePopup = document.getElementById("closeThemePopup");
//   const bgColorPicker = document.getElementById("bgColorPicker");
//   const textColorPicker = document.getElementById("textColorPicker");
//   const btnColorPicker = document.getElementById("btnColorPicker");

//   // Load saved colors
//   const savedBgColor = localStorage.getItem("bgColor");
//   const savedTextColor = localStorage.getItem("textColor");
//   const savedBtnColor = localStorage.getItem("btnColor");

//   if (savedBgColor) document.body.style.backgroundColor = savedBgColor;
//   if (savedTextColor) document.body.style.color = savedTextColor;
//   if (savedBtnColor) {
//       document.querySelectorAll("button").forEach(btn => {
//           btn.style.backgroundColor = savedBtnColor;
//       });
//   }

//   // Show/Hide Theme Customizer
//   themeButton.addEventListener("click", () => {
//       themePopup.style.display = "block";
//   });

//   closeThemePopup.addEventListener("click", () => {
//       themePopup.style.display = "none";
//   });

//   // Update colors when changed
//   bgColorPicker.addEventListener("input", () => {
//       document.body.style.backgroundColor = bgColorPicker.value;
//       localStorage.setItem("bgColor", bgColorPicker.value);
//   });

//   textColorPicker.addEventListener("input", () => {
//       document.body.style.color = textColorPicker.value;
//       localStorage.setItem("textColor", textColorPicker.value);
//   });

//   btnColorPicker.addEventListener("input", () => {
//       document.querySelectorAll("button").forEach(btn => {
//           btn.style.backgroundColor = btnColorPicker.value;
//       });
//       localStorage.setItem("btnColor", btnColorPicker.value);
//   });
// });

// // Reset theme
// function resetTheme() {
//   localStorage.removeItem("bgColor");
//   localStorage.removeItem("textColor");
//   localStorage.removeItem("btnColor");
//   location.reload(); // Refresh page to reset
// }
