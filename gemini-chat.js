(function () {
  function initGeminiChat() {
    try {
      setTimeout(() => {
        if (!document.body) {
          console.error("❌ document.body not available. Chat widget cannot mount.");
          return;
        }

        const pageTitle = document.title || window.location.pathname;

        // 💬 Create a modern button
        const chatButton = document.createElement('button');
        chatButton.innerText = 'Chat';
        Object.assign(chatButton.style, {
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '9999',
          padding: '12px 18px',
          backgroundColor: '#0078D4',
          color: '#fff',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          fontSize: '16px'
        });
        document.body.appendChild(chatButton);

        // 🪟 Create the chat window (hidden initially)
        const chatWindow = document.createElement('div');
        Object.assign(chatWindow.style, {
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '360px',
          height: '460px',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'none',
          flexDirection: 'column',
          padding: '16px',
          zIndex: '9998',
          fontFamily: 'sans-serif'
        });

        chatWindow.innerHTML = `
          <div style="font-weight:bold;margin-bottom:8px;">Ask about: "${pageTitle}"</div>
          <input type="text" id="gemini-prompt" placeholder="Type your question..." style="width:100%;padding:8px;font-size:14px;margin-bottom:8px;" />
          <button id="gemini-send" style="padding:8px;background:#0078D4;color:white;border:none;border-radius:4px;width:100%;cursor:pointer;margin-bottom:8px;">Send</button>
          <div id="gemini-response" style="flex-grow:1;overflow-y:auto;font-size:14px;color:#333;border-top:1px solid #eee;padding-top:8px;"></div>
        `;
        document.body.appendChild(chatWindow);

        // 🎯 Clicking the Chat button toggles the window
        chatButton.addEventListener('click', function () {
          chatWindow.style.display = (chatWindow.style.display === 'none') ? 'flex' : 'none';
        });

        // 🎯 Sending a message
        document.addEventListener('click', function (e) {
          if (e.target && e.target.id === 'gemini-send') {
            const promptInput = document.getElementById('gemini-prompt').value;
            const responseBox = document.getElementById('gemini-response');
            if (!promptInput) return;

            const fullPrompt = `The user is currently viewing the page titled "${pageTitle}". Their question is: ${promptInput}`;

            responseBox.innerHTML = "<em>Thinking...</em>";

            fetch('https://gemini-chat-1041125844271.us-central1.run.app/gemini-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt: fullPrompt })
            })
            .then(res => res.json())
            .then(data => {
              responseBox.innerText = data.text || data.error || "No response.";
            })
            .catch(err => {
              responseBox.innerText = "Error: " + err.message;
            });
          }
        });

        console.log("✅ Gemini chat widget with clean modern UI loaded");
      }, 1500); // Delay for Thought Industries/other heavy pages
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
