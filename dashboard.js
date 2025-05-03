document.addEventListener("DOMContentLoaded", () => {
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
  const overlay = document.getElementById("overlay");
  const settingsSidebar = document.getElementById("settingsSidebar");
  const settingsToggle = document.getElementById("settingsToggle");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");

  // ✅ Display last login and device info
  const storedLastLogin = localStorage.getItem("lastLogin");
  const loginDevice = localStorage.getItem("loginDevice");

  const lastLoginElement = document.getElementById("lastLogin");
  if (lastLoginElement) {
    lastLoginElement.textContent = storedLastLogin || "Not available";
  }

  const deviceInfoElement = document.getElementById("deviceInfo");
  if (deviceInfoElement) {
    deviceInfoElement.textContent = loginDevice || "Unknown";
  }

  // ✅ Session Timer
  const sessionStart = parseInt(localStorage.getItem("sessionStart"), 10);
  if (!isNaN(sessionStart)) {
    setInterval(() => {
      const elapsed = Date.now() - sessionStart;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      document.getElementById("sessionDuration").textContent = `Active for ${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }, 1000);
  } else {
    document.getElementById("sessionDuration").textContent = "Active for 00:00:00";
  }

  // ✅ Note Export Functions
  document
    .getElementById("exportTxtBtn")
    .addEventListener("click", exportNotesAsTxt);
  document
    .getElementById("exportJsonBtn")
    .addEventListener("click", exportNotesAsJson);

  function exportNotesAsTxt() {
    const notes = localStorage.getItem("myNote") || "";
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, "Notes.txt");
  }

  function exportNotesAsJson() {
    const notes = { note: localStorage.getItem("myNote") || "" };
    const blob = new Blob([JSON.stringify(notes, null, 2)], {
      type: "application/json",
    });
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

  // ✅ Sidebar toggle
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

  notesToggle.addEventListener("click", (e) => {
    e.preventDefault();
    notesSidebar.classList.add("show");
    overlay.classList.add("show");
  });

  closeNotesBtn.addEventListener("click", () => {
    notesSidebar.classList.remove("show");
    overlay.classList.remove("show");
  });

  // ✅ Username
  if (usernameElement) {
    usernameElement.textContent = username;
  } else {
    console.error("⚠️ Element with ID 'username' not found in HTML.");
  }

  // ✅ Hamburger menu
  if (hamburger && navUl) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("cross");
      navUl.classList.toggle("show");
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 769) {
        navUl.classList.remove("show");
        hamburger.classList.remove("cross");
      }
    });
  } else {
    console.error("⚠️ Hamburger menu or navigation not found.");
  }

  // ✅ Logout confirmation
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      const popup = document.getElementById("logoutPopup");
      if (popup) popup.style.display = "block";
    });
  }

  if (confirmLogout) {
    confirmLogout.addEventListener("click", () => {
      const lastLogin = localStorage.getItem("lastLogin");
      const loginDevice = localStorage.getItem("loginDevice");

      localStorage.clear();

      if (lastLogin) localStorage.setItem("lastLogin", lastLogin);
      if (loginDevice) localStorage.setItem("loginDevice", loginDevice);

      document.getElementById("logoutPopup").style.display = "none";
      window.location.href = "index.html";
    });
  }

  if (cancelLogout) {
    cancelLogout.addEventListener("click", () => {
      document.getElementById("logoutPopup").style.display = "none";
    });
  }

  // ✅ Notes: Load & Save
  const notesArea = document.getElementById("notesArea");
  const savedNote = localStorage.getItem("myNote");
  if (notesArea && savedNote) {
    notesArea.value = savedNote;
  }

  window.saveNote = function () {
    const text = document.getElementById("notesArea").value;
    localStorage.setItem("myNote", text);
    alert("Note saved!");
  };

  window.clearNote = function () {
    document.getElementById("notesArea").value = "";
    localStorage.removeItem("myNote");
    alert("Note cleared!");
  };
});

// External toggle function (optional)
function toggleMenu() {
  const navUl = document.querySelector(".nav-left");
  if (navUl) {
    navUl.classList.toggle("show");
  }
}
