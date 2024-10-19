// src/Chatbot.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        // Call the Gemini API
        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDp38JIvL_7j4TDEDb1Vg6tqZ2LlZBE1Ic',
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: input 
                                }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const botMessage = { 
                text: response.data.candidates[0].content.parts[0].text,
                sender: 'bot' 
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            const errorMessage = { text: "Sorry, I couldn't process that. Please try again.", sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    return (
        <div className="chatbot">
          <div style={{width:"100%",height:"40px",backgroundColor:"orange",color:"black"}}>  CHAT BOT</div>
            <div className="chat-window">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="input-form">
                    <input 
                        type="text" 
                        value={input} 
                        onChange={handleInputChange} 
                        placeholder="Type your message..." 
                        required 
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default App;
