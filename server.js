// server.js
import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow requests from frontend

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
