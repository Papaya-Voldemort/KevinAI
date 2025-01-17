from transformers import pipeline

# Load a pre-trained conversational model
chatbot = pipeline("conversational", model="microsoft/DialoGPT-small")

print("Basic AI Chatbot: Type 'exit' to quit")

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        print("Goodbye!")
        break
    
    response = chatbot(user_input)
    print(f"AI: {response[0]['generated_text']}")
