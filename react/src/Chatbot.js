import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';
import './css/bootstrap.min.css'

const API_BASE_URL = 'https://localhost:7044/api/Home'; // Replace with your API endpoint

const Chatbot = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const sendMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_BASE_URL, {
        Message: inputMessage,
        NewSession: currentSessionId === null, // Start a new session for the first message
        CurrentSessionId: currentSessionId, // Provide the current session ID for subsequent messages
      });

      const answer = response.data.message;
      const id = response.data.currentSessionId;
      setConversation((prevConversation) => [
        ...prevConversation,
        { user: inputMessage, bot: answer },
      ]);
      setCurrentSessionId(id); // Update the session ID for subsequent messages
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }finally{
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== '') {
      sendMessage();
    }
  };

  return (
    <div>
      <h1 className='chatbot-title'>CHAT-GPT DEMO</h1>
      <div>
        {conversation.map((message, index) => (
          <div className='chatbot-container' key={index}>
            <strong className='user-message'>You:</strong> {message.user}
            <br />
            <strong className='bot-message'>Bot:</strong> {message.bot}
            <br />
            <br />
          </div>
        ))}
      </div>
      <form className='input-container' onSubmit={handleFormSubmit}>
        <input className='chat-input'
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Ask a question..."
        />
        <button className='send-button' type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                          </svg>
        </button>
      </form>
      {loading && (
        <div className="text-center mt-3">
          <div class="spinner-grow text-primary" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-dark" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
