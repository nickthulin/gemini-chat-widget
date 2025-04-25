<script type="text/javascript">
  (function() {
    // Wait until the page has fully loaded
    window.addEventListener('load', function() {
      // Create the chat button
      const chatButton = document.createElement('button');
      chatButton.innerText = 'Chat';
      chatButton.style.position = 'fixed';
      chatButton.style.bottom = '20px';
      chatButton.style.right = '20px';
      chatButton.style.zIndex = '9999';
      chatButton.style.padding = '12px 18px';
      chatButton.style.backgroundColor = '#0078D4';
      chatButton.style.color = '#fff';
      chatButton.style.border = 'none';
      chatButton.style.borderRadius = '50px';
      chatButton.style.cursor = 'pointer';
      chatButton.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
      
      document.body.appendChild(chatButton);

      // Create the chat iframe (hidden by default)
      const chatIframe = document.createElement('iframe');
      chatIframe.src = 'https://example.com';  // Replace with your chatbot URL later
      chatIframe.style.position = 'fixed';
      chatIframe.style.bottom = '80px';
      chatIframe.style.right = '20px';
      chatIframe.style.width = '400px';
      chatIframe.style.height = '500px';
      chatIframe.style.border = 'none';
      chatIframe.style.zIndex = '9998';
      chatIframe.style.display = 'none';
      chatIframe.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
      chatIframe.style.borderRadius = '10px';
      
      document.body.appendChild(chatIframe);

      // Toggle iframe visibility
      chatButton.addEventListener('click', function() {
        chatIframe.style.display = (chatIframe.style.display === 'none') ? 'block' : 'none';
      });
    });
  })();
</script>
