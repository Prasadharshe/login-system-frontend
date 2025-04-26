document.addEventListener("DOMContentLoaded", () => {
  // Retrieve username from localStorage
  const username = localStorage.getItem("username") || "User";
  const usernameElement = document.getElementById("username");
  const notesSidebar = document.getElementById("notesSidebar");
  const notesToggle = document.getElementById("notesToggle");
  const closeNotesBtn = document.getElementById("closeNotesBtn");
  const hamburger = document.querySelector(".hamburger");
  const navUl = document.querySelector(".nav-left");
  const logoutButton = document.querySelector(".logout-button");
  const confirmLogout = document.getElementById("confirmLogout");
  const cancelLogout = document.getElementById("cancelLogout");
  // const notesArea = document.getElementById("notesArea");
  const overlay = document.getElementById("overlay");
  const settingsSidebar = document.getElementById("settingsSidebar");
  const settingsToggle = document.getElementById("settingsToggle");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  document.getElementById("exportTxtBtn").addEventListener("click", exportNotesAsTxt);
  document.getElementById("exportJsonBtn").addEventListener("click", exportNotesAsJson);
  const lastLogin = localStorage.getItem("lastLogin");
  const loginDevice = localStorage.getItem("loginDevice");

  if (lastLogin) {
    document.getElementById("lastLogin").textContent = new Date(parseInt(lastLogin)).toLocaleString();
  }
  if (loginDevice) {
    document.getElementById("deviceInfo").textContent = loginDevice;
  }

    // Check if session start is already saved, if not, set it
  if (!localStorage.getItem("sessionStart")) {
    localStorage.setItem("sessionStart", Date.now());
  }

  // Session timer
  let startTime = parseInt(localStorage.getItem("sessionStart"), 10);

  setInterval(() => {
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    document.getElementById("sessionDuration").textContent =
      `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);

  function exportNotesAsTxt() {
    const notes = localStorage.getItem("myNote") || "";
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, "Notes.txt");
  }
  
  function exportNotesAsJson() {
    const notes = { note: localStorage.getItem("myNote") || "" };
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, "Notes.json");
  }
  
  function downloadFile(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }  

  if (settingsToggle && settingsSidebar && closeSettingsBtn) {
    settingsToggle.addEventListener("click", (e) => {
      e.preventDefault();
      settingsSidebar.classList.add("show");
      overlay.classList.add("show");
    });
  
    closeSettingsBtn.addEventListener("click", () => {
      settingsSidebar.classList.remove("show");
      overlay.classList.remove("show");
    });
  }

   // Open Notes and show overlay
   notesToggle.addEventListener("click", (e) => {
    e.preventDefault();
    notesSidebar.classList.add("show");
    overlay.classList.add("show");
  });

  // Close Notes and hide overlay
  closeNotesBtn.addEventListener("click", () => {
    notesSidebar.classList.remove("show");
    overlay.classList.remove("show");
  });

  // Also close Notes if user clicks the overlay
  // overlay.addEventListener("click", () => {
  //   notesSidebar.classList.remove("show");
  //   overlay.classList.remove("show");
  // });

    notesToggle.addEventListener("click", () => {
      notesSidebar.classList.add("show");
    });
  
    // closeNotesBtn.addEventListener("click", () => {
    //   notesSidebar.classList.remove("show");
    // });
  

  if (usernameElement) {
    usernameElement.textContent = username; // Use 'username' instead of 'user.name'
  } else {
    console.error("⚠️ Element with ID 'username' not found in HTML.");
  }

  // Handle Hamburger Menu Click
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
  if (confirmLogout) {
    confirmLogout.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username"); // Clear username on logout
      localStorage.removeItem("lastLogin");
      localStorage.removeItem("loginDevice");
      localStorage.removeItem("sessionStart");
    });
  }

  // Handle No (Cancel)
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
  // Load saved note
  const savedNote = localStorage.getItem("myNote");
  if (savedNote) {
    notesArea.value = savedNote;
  }

  // Toggle sidebar
  notesToggle.addEventListener("click", (e) => {
    e.preventDefault();
    notesSidebar.classList.toggle("show");
  });

function saveNote() {
  const text = document.getElementById("notesArea").value;
  localStorage.setItem("myNote", text);
  alert("Note saved!");
}

function clearNote() {
  document.getElementById("notesArea").value = "";
  localStorage.removeItem("myNote");
  alert("Note cleared!");
}
