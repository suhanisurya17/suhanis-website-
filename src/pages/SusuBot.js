import React, { useState, useRef, useEffect } from 'react';

function SusuBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm SusuBot, your smart Windows 98 AI assistant! 🤖 I can answer questions, chat about anything, and help you explore this retro website. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // Try to call the AI API
      const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

    } catch (error) {
      console.error('Chat API error:', error);

      // Fallback to local responses if API fails
      const fallbackResponses = [
        "Sorry, my connection to the AI servers is having trouble! My Windows 98 brain says: That's a great question though!",
        "Network error! But my local circuits think that's really interesting!",
        "API timeout! Let me use my vintage knowledge base instead... That's fascinating!",
        "Server down! But my retro algorithms suggest that's worth exploring further!",
        "Connection failed! My floppy disk memory says: Tell me more about that!"
      ];

      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      const botMessage = {
        id: Date.now() + 1,
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Chat cleared! I'm SusuBot, your smart AI assistant, ready to help you again. Ask me anything! 🤖",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: '11px',
      backgroundColor: '#c0c0c0'
    }}>
      {/* Header */}
      <div style={{
        padding: '8px',
        backgroundColor: '#c0c0c0',
        borderBottom: '2px inset #c0c0c0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🤖</span>
          <span style={{ fontWeight: 'bold', fontSize: '12px' }}>SusuBot v1.0</span>
        </div>
        <button
          onClick={clearChat}
          style={{
            padding: '2px 8px',
            border: '2px outset #c0c0c0',
            backgroundColor: '#c0c0c0',
            cursor: 'pointer',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '10px'
          }}
        >
          Clear Chat
        </button>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        padding: '8px',
        backgroundColor: 'white',
        border: '2px inset #c0c0c0',
        margin: '4px',
        overflowY: 'auto',
        maxHeight: '300px'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '80%',
              padding: '6px 8px',
              backgroundColor: message.sender === 'user' ? '#0078d4' : '#f0f0f0',
              color: message.sender === 'user' ? 'white' : 'black',
              border: message.sender === 'user' ? '2px outset #0078d4' : '2px inset #f0f0f0',
              fontSize: '11px',
              lineHeight: '1.4'
            }}>
              {message.sender === 'bot' && (
                <span style={{ marginRight: '6px' }}>🤖</span>
              )}
              {message.text}
            </div>
            <div style={{
              fontSize: '9px',
              color: '#666',
              marginTop: '2px',
              textAlign: message.sender === 'user' ? 'right' : 'left'
            }}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>🤖</span>
            <div style={{
              padding: '6px 8px',
              backgroundColor: '#f0f0f0',
              border: '2px inset #f0f0f0',
              fontSize: '11px',
              fontStyle: 'italic'
            }}>
              SusuBot is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '4px',
        backgroundColor: '#c0c0c0',
        borderTop: '2px inset #c0c0c0',
        display: 'flex',
        gap: '4px'
      }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          style={{
            flex: 1,
            minHeight: '40px',
            maxHeight: '80px',
            resize: 'vertical',
            border: '2px inset #c0c0c0',
            padding: '4px',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
            backgroundColor: 'white'
          }}
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim() || isTyping}
          style={{
            padding: '8px 12px',
            border: '2px outset #c0c0c0',
            backgroundColor: inputText.trim() && !isTyping ? '#c0c0c0' : '#a0a0a0',
            cursor: inputText.trim() && !isTyping ? 'pointer' : 'not-allowed',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
            fontWeight: 'bold',
            minWidth: '60px'
          }}
        >
          Send
        </button>
      </div>

      {/* Status Bar */}
      <div style={{
        padding: '4px 8px',
        backgroundColor: '#c0c0c0',
        borderTop: '1px solid #808080',
        fontSize: '10px',
        color: '#666',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>💾 Running on Windows 98 compatibility mode</span>
        <span>Messages: {messages.length}</span>
      </div>
    </div>
  );
}

export default SusuBot;