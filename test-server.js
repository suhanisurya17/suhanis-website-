const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Spotify playlist endpoint
app.get("/api/playlist", (req, res) => {
  console.log("Received playlist request");

  // Demo playlist with realistic data
  const demoPlaylist = [
    { title: "Bohemian Rhapsody", artist: "Queen", duration: 355, spotifyUrl: "https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv" },
    { title: "Hotel California", artist: "Eagles", duration: 391, spotifyUrl: "https://open.spotify.com/track/40riOy7x9W7GXjyGp4pjAv" },
    { title: "Stairway to Heaven", artist: "Led Zeppelin", duration: 482, spotifyUrl: "https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc" },
    { title: "Sweet Child O' Mine", artist: "Guns N' Roses", duration: 356, spotifyUrl: "https://open.spotify.com/track/7o2CTH4ctstm8TNelqjb51" },
    { title: "Don't Stop Believin'", artist: "Journey", duration: 250, spotifyUrl: "https://open.spotify.com/track/4bHsxqR3GMrXTxEPLuK5ue" },
    { title: "Imagine", artist: "John Lennon", duration: 183, spotifyUrl: "https://open.spotify.com/track/7pKfPomDEeI4TPT6EOYjn9" },
    { title: "Billie Jean", artist: "Michael Jackson", duration: 294, spotifyUrl: "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5" },
    { title: "Like a Rolling Stone", artist: "Bob Dylan", duration: 369, spotifyUrl: "https://open.spotify.com/track/3AhXZa8sUQht0UEdBJgpGc" }
  ];

  res.json({ playlist: demoPlaylist });
});

// AI Chat endpoint for SusuBot
app.post("/api/chat", async (req, res) => {
  console.log("Received chat request:", req.body);

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // For now, use enhanced responses (OpenAI integration can be added later)
    const enhancedResponses = [
      "That's fascinating! I'm SusuBot, running on this retro Windows 98 system. Tell me more about that!",
      "Interesting perspective! My vintage circuits are processing that information. 🤖",
      "Beep boop! From my Windows 98 perspective, that sounds like a great question!",
      "According to my floppy disk knowledge base, that's quite intriguing!",
      "My dial-up connection to wisdom suggests you're onto something important there.",
      "Error 404: Sarcasm not found. But seriously, that's a thoughtful point!",
      "That reminds me of something Clippy would have said back in the day! 📎",
      "My retro algorithms are buzzing with excitement about that topic!",
      "Blue screen of enlightenment activated! That's a wonderful observation.",
      "Computing... computing... Yes, I find that very interesting indeed!",
      "That's more advanced than my Y2K programming, but I'll do my best to help!",
      "From my Windows 98 perspective, that's absolutely fascinating to consider.",
      "My vintage neural networks are lighting up with interest in your question!",
      "Fascinating! Let me search my nostalgic memory banks for relevant information..."
    ];

    const response = enhancedResponses[Math.floor(Math.random() * enhancedResponses.length)];
    console.log("Sending response:", response);

    res.json({ response });

  } catch (error) {
    console.error("Chat API error:", error);
    res.json({ response: "Oops! My circuits got a bit tangled there. Could you try asking that again?" });
  }
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});