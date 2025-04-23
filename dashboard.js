document.addEventListener("DOMContentLoaded", () => {
  // Retrieve username from localStorage
  const username = localStorage.getItem("username") || "User";
  const usernameElement = document.getElementById("username");
  // const confirmBtn = document.getElementById("confirmLogout"); 

  // playfully dodge the user a couple of times before allowing logout!
  // let moveCount = 0;

  // confirmBtn.addEventListener("mouseover", () => {
  //   if (moveCount < 5) {
  //     const popup = document.querySelector(".popup-content");
  //     const maxX = popup.offsetWidth - confirmBtn.offsetWidth;
  //     const maxY = popup.offsetHeight - confirmBtn.offsetHeight;

  //     const randX = Math.floor(Math.random() * maxX);
  //     const randY = Math.floor(Math.random() * maxY);

  //     confirmBtn.style.position = "absolute";
  //     confirmBtn.style.left = `${randX}px`;
  //     confirmBtn.style.top = `${randY}px`;

  //     moveCount++;
  //   }
  // });

  // confirmBtn.addEventListener("click", () => {
  //   if (moveCount < 5) {
  //     // Prevent logout until they really mean it 😜
  //     alert("Not so fast! 😆 Try again!");
  //   } else {
  //     // Proceed with logout
  //     localStorage.removeItem("username");
  //     window.location.href = "index.html";
  //   }
  // });
  
  

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

document.addEventListener("DOMContentLoaded", () => {
  const notesToggle = document.getElementById("notesToggle");
  const notesSidebar = document.getElementById("notesSidebar");
  const notesArea = document.getElementById("notesArea");

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



// document.getElementById("sendBtn").addEventListener("click", sendMessage);
// document.getElementById("chatInput").addEventListener("keypress", function (e) {
//   if (e.key === "Enter") sendMessage();
// });

// function sendMessage() {
//   const input = document.getElementById("chatInput");
//   const message = input.value.trim();
//   if (!message) return;

//   appendMessage("user", message);
//   input.value = "";

//   // Simulate a basic bot response
//   setTimeout(() => {
//     appendMessage("bot", "🤖 I'm still learning! Ask me anything general.");
//   }, 800);
// }

// function appendMessage(sender, text) {
//   const msgDiv = document.createElement("div");
//   msgDiv.className = `chat-message ${sender}-msg`;
//   msgDiv.textContent = text;

//   const messages = document.getElementById("chatMessages");
//   messages.appendChild(msgDiv);
//   messages.scrollTop = messages.scrollHeight;
// }


// function sendMessage() {
//   const input = document.getElementById("userInput");
//   const chatWindow = document.getElementById("chatWindow");

//   const userMessage = input.value.trim();
//   if (!userMessage) return;

//   const userBubble = document.createElement("p");
//   userBubble.textContent = `You: ${userMessage}`;
//   chatWindow.appendChild(userBubble);

//   // Simulated AI response
//   const aiResponse = document.createElement("p");
//   aiResponse.textContent = `AI: I'm still learning! You said "${userMessage}".`;
//   setTimeout(() => {
//     chatWindow.appendChild(aiResponse);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
//   }, 1000);

//   input.value = "";
// }

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
