import React, { useState, useRef, useEffect } from 'react';

function SusuBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm SusuBot, your Windows 98 AI assistant. How can I help you today?",
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

  const responses = [
    "That's interesting! Tell me more about that.",
    "I see! I'm still learning about the world from my Windows 98 perspective.",
    "Beep boop! Processing... That's a great question!",
    "In my experience running on this retro system, I'd say...",
    "Let me consult my vintage knowledge base... 🤖",
    "Error 404: Sarcasm not found. But seriously, that's cool!",
    "My circuits are buzzing with excitement about that topic!",
    "According to my dial-up connection to the internet... just kidding!",
    "That reminds me of something I learned from Clippy back in the day.",
    "Fascinating! My floppy disk memory banks are storing this information.",
    "Blue screen of death? Nah, more like blue screen of enlightenment!",
    "My retro algorithms suggest that's a wonderful idea!",
    "Computing... computing... Yes, I concur with your assessment!",
    "That's more advanced than my Y2K programming can handle, but I'll try!"
  ];

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
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
        text: "Chat cleared! I'm SusuBot, ready to assist you again.",
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