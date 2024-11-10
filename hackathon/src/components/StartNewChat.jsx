import React, { useState } from "react";
import { BackgroundBeams } from "./ui/backgroundBeams";

function StartNewChat() {
  const [chatTitle, setChatTitle] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle title input change
  const handleTitleChange = (e) => {
    setChatTitle(e.target.value);
  };

  // Function to handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if both fields have values
    if (chatTitle && message) {
      // Example logic for submitting data
      const chatData = {
        title: chatTitle,
        message: message,
      };
      
      console.log("New Chat Created:", chatData);

      // Clear form fields after submission
      setChatTitle("");
      setMessage("");
    } else {
      alert("Please fill out both fields");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <BackgroundBeams />
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Start New Chat</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Enter Title of the Chat</label>
            <input
              type="text"
              placeholder="Chat Title"
              value={chatTitle}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={handleMessageChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartNewChat;
