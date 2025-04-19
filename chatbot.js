document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("chat-input");
  const sendButton = document.querySelector(".chat-send");
  const chatWrapper = document.querySelector(".chat-wrapper");
  const messageContainer = document.getElementById("chatMessages");
  const clearChatButton = document.getElementById("clearChat");
  const popup = document.getElementById("clearChatPopup");
  const confirmBtn = document.getElementById("confirmClear");
  const cancelBtn = document.getElementById("cancelClear");

  // logic for clear button 
  clearChatButton.addEventListener("click", () => {
    // localStorage.removeItem("chatMessages"); // Clear stored messages. Without the pop up, directly clear the chats after click on clear button
    // messageContainer.innerHTML = ""; // Clear UI  
    popup.style.display = "flex"; // Show the popup
  });

  cancelBtn.addEventListener("click", () => {
    popup.style.display = "none"; // Close without clearing
  });
  
  confirmBtn.addEventListener("click", () => {
    localStorage.removeItem("chatMessages");
    messageContainer.innerHTML = ""; // Clear UI
    popup.style.display = "none"; // Close popup
  });

  // Load saved messages on page load
  const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  savedMessages.forEach((msg) => addMessage(msg.text, msg.isUser));

  function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  function saveMessage(text, isUser) {
    const currentMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    currentMessages.push({ text, isUser });
    localStorage.setItem("chatMessages", JSON.stringify(currentMessages));
  }

  function addMessage(message, isUser = false) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", isUser ? "user-message" : "bot-message");
    msgDiv.textContent = message;
    messageContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  sendButton.addEventListener("click", () => {
    const input = inputField.value.trim();
    if (input === "") return;

    addMessage(input, true);
    saveMessage(input, true);
    inputField.value = "";

    setTimeout(() => {
      const reply = `🤖 You said: "${input}"`;
      addMessage(reply, false);
      saveMessage(reply, false); // ✅ This line saves bot response
    }, 600);
  });

  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendButton.click();
  });
});
