document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    if (userInput === '') return;

    const chatDisplay = document.getElementById('chat-display');
    chatDisplay.innerHTML += `<div class="user-message">${userInput}</div>`;
    document.getElementById('user-input').value = '';

    // Simple keyword matching logic
    let aiResponse = "I'm not sure I understand.";
    if (userInput.includes('hello')) {
        aiResponse = "Hi there! How can I assist you?";
    } else if (userInput.includes('weather')) {
        aiResponse = "The weather is sunny with a chance of learning!";
    } else if (userInput.includes('bye')) {
        aiResponse = "Goodbye! Take care.";
    }

    chatDisplay.innerHTML += `<div class="ai-message">${aiResponse}</div>`;
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});
