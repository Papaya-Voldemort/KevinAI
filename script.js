// Load Compromise.js for natural language processing
const script = document.createElement("script");
script.src = "https://unpkg.com/compromise@13.11.3/builds/compromise.min.js";
document.head.appendChild(script);

// Wait for the library to load
script.onload = () => {
    const botName = "ChatBot"; // Bot's name
    const userName = "User"; // Default username (can be updated based on user input)

    const responses = {
        greetings: [
            "Hello! How can I assist you today?",
            "Hi there! What's on your mind?",
            "Hey! How can I help you?"
        ],
        farewells: [
            "Goodbye! Have a great day!",
            "Bye! Take care.",
            "See you next time!"
        ],
        smallTalk: [
            "I'm just a chatbot, but I'm here to help!",
            "I may be made of code, but I try to be helpful!",
            "I'm here for your questions or just to chat!"
        ],
        default: [
            "I'm not sure I understand. Can you rephrase?",
            "Hmm, that's a bit tricky. Could you clarify?",
            "I don't have the answer to that right now, but I'm learning every day!"
        ]
    };

    // Get a random response from an array
    function getRandomResponse(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Analyze user input and determine response
    function getAIResponse(input) {
        const nlp = window.nlp(input); // Parse input using Compromise.js

        // Greeting detection
        if (nlp.has("hello") || nlp.has("hi") || nlp.has("hey")) {
            return getRandomResponse(responses.greetings);
        }

        // Farewell detection
        if (nlp.has("bye") || nlp.has("goodbye") || nlp.has("see you")) {
            return getRandomResponse(responses.farewells);
        }

        // Small talk detection
        if (nlp.has("how are you") || nlp.has("what's up")) {
            return getRandomResponse(responses.smallTalk);
        }

        // Sentiment analysis
        const sentiment = nlp.sentiment().score;
        if (sentiment > 0.5) {
            return "You seem happy! Is there anything specific you'd like to discuss?";
        } else if (sentiment < -0.5) {
            return "I'm sensing some negativity. Is there something I can help you with?";
        }

        // Default response
        return getRandomResponse(responses.default);
    }

    // DOM manipulation for chatbot UI
    document.getElementById("send-button").addEventListener("click", () => {
        const userInput = document.getElementById("user-input").value.trim();
        if (userInput === "") return;

        const chatDisplay = document.getElementById("chat-display");
        chatDisplay.innerHTML += `<div class="user-message">${userInput}</div>`;
        document.getElementById("user-input").value = "";

        const aiResponse = getAIResponse(userInput);
        chatDisplay.innerHTML += `<div class="ai-message">${aiResponse}</div>`;
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    });
};
