import { useState, useRef, useEffect } from "react";
import { FiSend, FiTrash2, FiCopy, FiMic } from "react-icons/fi"; // FiMic imported but not used
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";

// Import GoogleGenerativeAI from the SDK if you plan to switch to it later
// import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  // Use a more dynamic alias for the model if possible (e.g., 'gemini-1.5-pro-latest')
  // This helps you get model updates without changing code.
  // However, with direct REST API calls, you might stick to a specific version like -002.
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-001:generateContent?key=${API_KEY}`;
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
      // Define the initial prompt that will be sent
      const initialPrompt = `
        Act as a certified dietitian and fitness coach. Provide a personalized meal plan and fitness advice based on the user's details:

        - Gender: ${storedUserData.gender}
        - Age: ${storedUserData.age}
        - Goal: ${storedUserData.goal}
        - Meal Frequency: ${storedUserData.mealFrequency} meals per day
        - Dietary Preferences: ${storedUserData.preference ? storedUserData.preference.join(", ") : "None specified"}
        - Allergies: ${storedUserData.allergy ? storedUserData.allergy : "None"}
        - Workout: ${storedUserData.workout === "yes" ? `Yes, ${storedUserData.workoutDetails.frequency} times per week, ${storedUserData.workoutDetails.duration} minutes per session` : "No"}

        Provide meal suggestions with macro breakdowns. If the user works out, add fitness recommendations.
      `;
      // Call fetchInitialMessage with the generated prompt
      fetchInitialMessage(initialPrompt);
    }
  }, []); // Empty dependency array means this runs once on mount

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- Core Change: getGeminiResponse now takes the full conversation history ---
  const getGeminiResponse = async (conversationHistory) => {
    // conversationHistory will be an array of { role: "user" | "model", parts: [{ text: "..." }] }
    console.log("Sending to Gemini API with history:", conversationHistory);

    try {
      const response = await axios.post(
        geminiApiUrl,
        {
          // Structure the request payload to include the full conversation history
          contents: conversationHistory
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Full Gemini API Response:", response.data);

      const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!aiText) {
        // Log more details about the response if it's unexpected
        console.warn("Unexpected API response structure or no text content:", JSON.stringify(response.data, null, 2));
        // You might want to return a more informative error message to the user
        return "No clear response from AI. Please try again.";
      }

      return aiText;
    } catch (error) {
      console.error("Error fetching Gemini API response:", error.response?.data || error.message);
      // More specific error message if it's a quota error
      if (error.response?.status === 429) {
        return "Sorry, I've hit my conversation limit for now. Please try again in a few minutes, or try shortening your messages.";
      }
      return "Sorry, I couldn't process your request. There was an unexpected error.";
    }
  };

  const fetchInitialMessage = async (prompt) => {
    setIsLoading(true);

    // Prepare the initial prompt as a user message for the API
    const initialApiPrompt = [{
      role: "user",
      parts: [{ text: prompt }]
    }];

    // Display a user-like message for the initial prompt in the UI
    const initialUserMessageForUI = {
      id: Date.now(),
      text: "Generating your personalized plan based on your details...", // A friendly message, not the full prompt
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([initialUserMessageForUI]); // Show user's "request" immediately

    try {
      // Call the API with the initial prompt (this is the first turn)
      const aiText = await getGeminiResponse(initialApiPrompt);

      const aiResponse = {
        id: Date.now() + 1,
        text: aiText,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiResponse]); // Append AI response
    } catch (error) {
      console.error("Error fetching initial AI response:", error);
      // Display an error message if the initial fetch fails
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Failed to load initial plan. Please try refreshing.",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const userInput = inputMessage;
    setInputMessage(""); // Clear input field immediately

    // Add user message and a temporary loading message to state
    const loadingMessage = {
      id: "loading-temp", // Use a unique temporary ID
      text: "Thinking...",
      sender: "ai", // Display as if AI is thinking
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPending: true, // Custom property to identify loading message
    };

    // Update state to show user's message and then the loading message
    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true); // Control input field disable state

    try {
      // --- Core Change: Build conversation history for the API call ---
      // Map UI messages to API format: { role: "user" | "model", parts: [{ text: "..." }] }
      // Filter out any "system" or "isPending" messages that shouldn't go to the AI.
      const conversationHistoryForAPI = messages
        .filter(msg => msg.sender === "user" || msg.sender === "ai") // Only include actual chat turns
        .map(msg => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        }))
        // Add the current user input to the history for this turn
        .concat({ role: "user", parts: [{ text: userInput }] });


      const aiText = await getGeminiResponse(conversationHistoryForAPI);

      // Remove the loading message and add the actual AI response
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== "loading-temp") // Remove only the loading message
          .concat({
            id: Date.now() + 2, // New unique ID for AI response
            text: aiText,
            sender: "ai",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          })
      );
    } catch (error) {
      console.error("AI Response Error:", error);
      // Remove loading message and display a user-friendly error
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== "loading-temp")
          .concat({
            id: Date.now() + 2,
            text: "Failed to get a response. Please try again.",
            sender: "ai",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          })
      );
    } finally {
      setIsLoading(false); // Enable input field
    }
  };


  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // Allow Shift+Enter for new lines
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className={`max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          {/* Header */}
          <div className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} flex justify-between items-center`}>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>MindMellow🌿💛☁️</h2>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-600"}`}>
                {isDarkMode ? "🌙" : "☀️"}
              </button>
              <button onClick={() => setMessages([])} className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-600"}`}>
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={`h-[500px] overflow-y-auto p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
                <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user" ? `${isDarkMode ? "bg-blue-600" : "bg-blue-500"} text-white` : `${isDarkMode ? "bg-gray-700" : "bg-gray-200"} ${isDarkMode ? "text-white" : "text-gray-800"}`}`}>
                  <p className="text-lg">
                    {/* Display loading animation for pending messages */}
                    {message.isPending ? (
                      <BsThreeDots className="w-6 h-6 animate-bounce" />
                    ) : (
                      message.text
                    )}
                  </p>
                  {!message.isPending && ( // Only show timestamp and copy for non-pending messages
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm opacity-70">{message.timestamp}</span>
                      <button onClick={() => navigator.clipboard.writeText(message.text)} className="opacity-70 hover:opacity-100 transition-opacity">
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Old isLoading spinner can be removed if using `isPending` */}
            {/* {isLoading && (
              <div className="flex items-center space-x-2 ml-4">
                <BsThreeDots className="w-6 h-6 animate-bounce" />
              </div>
            )} */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center space-x-2">
              <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message here..." className={`flex-1 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 ${isDarkMode ? "bg-gray-700 text-white focus:ring-blue-500" : "bg-gray-100 text-gray-800 focus:ring-blue-400"}`} rows="1" maxLength="1000" disabled={isLoading} /> {/* Disable textarea when loading */}
              <button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbox;