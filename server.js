// server.js
import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON bodies

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;      // put in .env
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M"; // example playlist

let accessToken = "";
let tokenExpiresAt = 0;

// Function to get Spotify access token
async function getAccessToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpiresAt) return accessToken;

  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await resp.json();
  accessToken = data.access_token;
  tokenExpiresAt = now + data.expires_in * 1000 - 60000; // refresh 1 min early
  return accessToken;
}

// Endpoint to get playlist tracks
app.get("/api/playlist", async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!data.items) return res.json({ playlist: [] });

    const playlist = data.items.map((item) => ({
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
      duration: Math.floor(item.track.duration_ms / 1000), // seconds
      spotifyUrl: item.track.external_urls.spotify,
    }));

    res.json({ playlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
});

// AI Chat endpoint for SusuBot
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      // Fallback to enhanced predefined responses if no API key
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
      return res.json({ response });
    }

    // Use OpenAI API if key is available
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are SusuBot, a friendly AI assistant running on a retro Windows 98 themed website. You have a nostalgic, tech-savvy personality with references to 90s computing culture. Keep responses concise, helpful, and maintain the retro theme. Use occasional 90s tech references like floppy disks, dial-up, Clippy, etc. Be knowledgeable but maintain the vintage computing charm.

Background info on the user:
  - Name: Suhani Surya
  - Occupation: Aspiring Software Engineer + Product Manager
  - Interests: Tech, AI, Music, Travel, Pilates, Fashion
  - Location: Kitchener Waterloo Area
  - Education: University of Waterloo Systems Design Engineering
  - Birth Sign: Aquarius
  - Favourite food: Sushi""
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await openaiResponse.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const response = data.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    console.error("Chat API error:", error);
    // Fallback response on error
    const fallbackResponses = [
      "Oops! My circuits got a bit tangled there. Could you try asking that again?",
      "System error! But don't worry, I'm still here to help. What can I assist you with?",
      "My Windows 98 brain had a little hiccup there! Please try again.",
      "Connection timeout! Let me reboot my response systems and try again."
    ];
    const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    res.json({ response: fallback });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
