(function () {
  function initGeminiChat() {
    try {
      // 💬 Create chat bubble
      const bubble = document.createElement("div");
      bubble.id = "gemini-chat-bubble";
      bubble.textContent = "💬";
      Object.assign(bubble.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        backgroundColor: "#0080FF",
        color: "white",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        fontSize: "28px",
        textAlign: "center",
        lineHeight: "56px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 9999
      });
      document.body.appendChild(bubble);

      // 🪟 Chat window
      const chatWindow = document.createElement("div");
      chatWindow.id = "gemini-chat-window";
      Object.assign(chatWindow.style, {
        position: "fixed",
        bottom: "90px",
        right: "24px",
        width: "320px",
        maxHeight: "400px",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        display: "none",
        flexDirection: "column",
        gap: "8px",
        zIndex: 9999,
        fontFamily: "sans-serif"
      });

      chatWindow.innerHTML = `
        <div style="font-weight:bold;">Ask Gemini</div>
        <input type="text" id="gemini-prompt" placeholder="Ask me anything..." style="width:100%;padding:6px;font-size:14px;" />
        <button id="gemini-send" style="padding:6px;background:#0080FF;color:white;border:none;border-radius:4px;width:100%;cursor:pointer;">Send</button>
        <div id="gemini-response" style="max-height:200px;overflow-y:auto;font-size:14px;color:#333;"></div>
      `;
      document.body.appendChild(chatWindow);

      bubble.addEventListener("click", () => {
        chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
        chatWindow.style.flexDirection = "column";
      });

      document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "gemini-send") {
          const prompt = document.getElementById("gemini-prompt").value;
          const responseBox = document.getElementById("gemini-response");
          if (!prompt) return;

          responseBox.innerHTML = "<em>Thinking...</em>";
          fetch("https://gemini-chat-1041125844271.us-central1.run.app/gemini-chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
          })
            .then(res => res.json())
            .then(data => {
              responseBox.innerText = data.text || data.error;
            })
            .catch(err => {
              responseBox.innerText = "Error: " + err.message;
            });
        }
      });

      console.log("✅ Gemini chat widget loaded");
    } catch (e) {
      console.error("Gemini chat widget error:", e);
    }
  }

  if (document.readyState === "complete") {
    initGeminiChat();
  } else {
    window.addEventListener("load", initGeminiChat);
  }
})();
