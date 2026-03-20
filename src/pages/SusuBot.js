import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are SusuBot, a friendly AI assistant on a retro Windows 98 themed portfolio website. Keep responses concise (2-3 sentences max), helpful, and fun. Use occasional 90s tech references like floppy disks, dial-up, Clippy, etc.

About the website owner (Suhani Surya):
  - Aspiring Software Engineer + Product Manager at University of Waterloo (Systems Design Engineering)
  - Interests: Tech, AI, Music, Travel, Pilates, Fashion
  - Location: Kitchener Waterloo Area
  - Birth Sign: Aquarius, Favourite food: Sushi, Had a fish named Hunter`;

function SusuBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm SusuBot, your Windows 98 AI assistant! 🤖 Ask me anything about Suhani or just chat!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

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
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

      if (!apiKey) throw new Error('No API key');

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${currentInput}` }] }],
            generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
          }),
        }
      );

      const data = await response.json();

      if (!data.candidates || !data.candidates[0]) throw new Error('No response');

      const botText = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot', timestamp: new Date() }]);

    } catch (error) {
      const fallbacks = [
        "Sorry, my dial-up connection is acting up! Try again in a sec. 📡",
        "Blue screen of thought! My circuits need a reboot. Ask me again!",
        "Oops! My floppy disk got corrupted. Could you repeat that? 💾",
      ];
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
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
    setMessages([{
      id: 1,
      text: "Chat cleared! I'm SusuBot, ready to help again. Ask me anything! 🤖",
      sender: 'bot',
      timestamp: new Date()
    }]);
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
          <span style={{ fontWeight: 'bold', fontSize: '12px' }}>SusuBot v2.0</span>
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
              backgroundColor: message.sender === 'user' ? '#000080' : '#f0f0f0',
              color: message.sender === 'user' ? 'white' : 'black',
              border: message.sender === 'user' ? '2px outset #000080' : '2px inset #f0f0f0',
              fontSize: '11px',
              lineHeight: '1.4'
            }}>
              {message.sender === 'bot' && <span style={{ marginRight: '6px' }}>🤖</span>}
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
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
        <span>⚡ Powered by Gemini AI</span>
        <span>Messages: {messages.length}</span>
      </div>
    </div>
  );
}

export default SusuBot;
