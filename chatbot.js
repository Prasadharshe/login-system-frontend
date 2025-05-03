document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("chat-input");
  const sendButton = document.querySelector(".chat-send");
  const chatWrapper = document.querySelector(".chat-wrapper");
  const messageContainer = document.getElementById("chatMessages");
  const clearChatButton = document.getElementById("clearChat");
  const popup = document.getElementById("clearChatPopup");
  const confirmBtn = document.getElementById("confirmClear");
  const cancelBtn = document.getElementById("cancelClear");

  // Clear chat logic with popup
  clearChatButton.addEventListener("click", () => {
    popup.style.display = "flex";
  });
  
  cancelBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  confirmBtn.addEventListener("click", () => {
    localStorage.removeItem("chatMessages");
    messageContainer.innerHTML = "";
    popup.style.display = "none";
  });

  // Load saved messages
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

  async function fetchAIReply(input) {
    try {
      const res = await fetch("https://login-system-backend-1.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      return data.reply || "🤖 Sorry, I didn’t understand that.";
    } catch (err) {
      console.error("AI fetch error:", err);
      return "⚠️ Error reaching AI server.";
    }
  }

  // sendButton.addEventListener("click", async () => {
  //   const input = inputField.value.trim();
  //   if (input === "") return;

  //   addMessage(input, true);
  //   saveMessage(input, true);
  //   inputField.value = "";

  //   // Fetch AI response from backend
  //   const aiReply = await fetchAIReply(input);
  //   addMessage(aiReply, false);
  //   saveMessage(aiReply, false);
  // });

  sendButton.addEventListener("click", async () => {
    const input = inputField.value.trim();
    if (input === "") return;
  
    addMessage(input, true);
    saveMessage(input, true);
    inputField.value = "";
  
    try {
      // Send message to your backend
      const response = await fetch("https://login-system-backend-1.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await response.json();
  
      if (data.reply) {
        addMessage(data.reply, false);
        saveMessage(data.reply, false);
      } else {
        addMessage("⚠️ No reply received from AI", false);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      addMessage("❌ Error talking to AI", false);
    }
  });  

  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendButton.click();
  });
});
