import { useState, useRef, useEffect } from "react";
import { FiSend, FiTrash2, FiCopy, FiMic } from "react-icons/fi"; // FiMic imported but not used
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
// Import GoogleGenerativeAI from the SDK if you plan to switch to it later
// import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  // IMPORTANT: For Canvas environment, leave API_KEY as empty string.
  // The Canvas environment will automatically provide the API key.
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Removed the useEffect hook that fetched initial user data from localStorage.
  // The chat will now start with an empty message history unless the user types something.

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper function for exponential backoff
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getGeminiResponse = async (conversationHistory) => {
    console.log("Sending to Gemini API with history:", conversationHistory);

    const MAX_RETRIES = 5;
    let retries = 0;
    let delay = 1000; // Start with 1 second delay

    while (retries < MAX_RETRIES) {
      try {
        const response = await axios.post(
          geminiApiUrl, // Use Gemini API URL
          {
            contents: conversationHistory // Directly use conversationHistory for Gemini API
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        console.log("Full Gemini API Response:", response.data);

        const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text; // Extract text for Gemini API
        if (!aiText) {
          console.warn("Unexpected API response structure or no text content:", JSON.stringify(response.data, null, 2));
          return "No clear response from AI. Please try again.";
        }

        return aiText;
      } catch (error) {
        console.error("Error fetching Gemini API response:", error.response?.data || error.message);

        if (error.response?.status === 429) {
          retries++;
          if (retries < MAX_RETRIES) {
            console.log(`Rate limit hit. Retrying in ${delay / 1000} seconds... (Attempt ${retries}/${MAX_RETRIES})`);
            await sleep(delay);
            delay *= 2; // Exponential increase
          } else {
            return "Sorry, I've hit my conversation limit for now after multiple retries. Please try again later.";
          }
        } else {
          // For errors other than 429, re-throw or return a generic message
          return "Sorry, I couldn't process your request. There was an unexpected error.";
        }
      }
    }
    return "Sorry, I couldn't process your request after multiple retries."; // Should ideally not be reached
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
    setInputMessage("");

    const loadingMessage = {
      id: "loading-temp",
      text: "Thinking...",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPending: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      // Add a prompt to encourage Markdown formatting from the AI
      const markdownInstruction = "\n\nPlease format your response using Markdown (e.g., bold text, bullet points, headings) for readability.";
      const currentUserInputWithMarkdownInstruction = userInput + markdownInstruction;

      const conversationHistoryForAPI = messages
        .filter(msg => msg.sender === "user" || msg.sender === "ai")
        .map(msg => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        }))
        .concat({ role: "user", parts: [{ text: currentUserInputWithMarkdownInstruction }] }); // Use the modified input

      const aiText = await getGeminiResponse(conversationHistoryForAPI);

      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== "loading-temp")
          .concat({
            id: Date.now() + 2,
            text: aiText,
            sender: "ai",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          })
      );
    } catch (error) {
      console.error("AI Response Error:", error);
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
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      console.error('Could not copy text. Please copy manually.');
    }
    document.body.removeChild(textarea);
  };

  return (
    <>
      <IndexNavbar fixed />
      <div className={`min-h-screen pt-16 bg-gray-100`}>
        <div className="container mx-auto px-4 py-8">
          <div className={`max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden bg-white`}>
            <div className={`p-4 border-b border-gray-200 flex justify-between items-center`}>
              <h2 className={`text-xl font-semibold text-gray-800`}>MindMellow🌿💛☁️</h2>
              <div className="flex items-center gap-4">
                {/* Removed dark mode toggle button */}
                <button onClick={() => setMessages([])} className={`p-2 rounded-full bg-gray-200 text-gray-600`}>
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className={`h-[500px] overflow-y-auto p-4 bg-gray-50`}>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
                  <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user" ? `bg-blueGray-100 text-black` : `bg-blueGray-200 text-gray-800`}`}>
                    <p className="text-lg">
                      {message.isPending ? (
                        <BsThreeDots className="w-6 h-6 animate-bounce" />
                      ) : (
                        // Render message text as Markdown
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      )}
                    </p>
                    {!message.isPending && (
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm opacity-70">{message.timestamp}</span>
                        <button onClick={() => copyToClipboard(message.text)} className="opacity-70 hover:opacity-100 transition-opacity">
                          <FiCopy className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className={`p-4 border-t border-gray-200`}>
              <div className="flex items-center space-x-2">
                <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message here..." className={`flex-1 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 bg-gray-100 text-gray-800 focus:ring-blue-400`} rows="1" maxLength="1000" disabled={isLoading} />
                <button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} className="p-2 rounded-full bg-blue-500 text-black hover:bg-blue-600 transition-colors">
                  <FiSend className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatbox;
