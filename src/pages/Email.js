import React, { useState } from "react";

export default function Email() {
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const win98ButtonStyle = {
    padding: "4px 12px",
    border: "2px outset #c0c0c0",
    backgroundColor: "#c0c0c0",
    cursor: "pointer",
    fontFamily: "MS Sans Serif, sans-serif",
    fontSize: "11px",
    color: "black",
    outline: "none",
  };

//   const win98ButtonPressedStyle = {
//     ...win98ButtonStyle,
//     border: "2px inset #c0c0c0",
//   };

  const win98InputStyle = {
    padding: "2px 4px",
    border: "2px inset #c0c0c0",
    backgroundColor: "white",
    fontFamily: "MS Sans Serif, sans-serif",
    fontSize: "11px",
    outline: "none",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        fontFamily: "MS Sans Serif, sans-serif",
        fontSize: "11px",
        backgroundColor: "#c0c0c0",
        border: "2px outset #c0c0c0",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      {/* Menu Bar */}
<div
  style={{
    backgroundColor: "#c0c0c0",
    borderBottom: "1px solid #808080",
    fontSize: "11px",
    display: "flex",       // use flex to align items
    alignItems: "center",  // vertically center
    padding: "2px",        // less padding to move left
    gap: "4px",            // small space between menu items
  }}
>
  {["File", "Edit", "View", "Tools", "Message", "Help"].map((menu) => (
    <span
      key={menu}
      style={{
        padding: "2px 6px",   // smaller padding
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#316ac5";
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "black";
      }}
    >
      {menu}
    </span>
  ))}
</div>


      {/* Toolbar */}
      <div
        style={{
          backgroundColor: "#c0c0c0",
          borderBottom: "1px solid #808080",
          padding: "4px",
          display: "flex",
          gap: "2px",
          alignItems: "center",
        }}
      >
        <button style={win98ButtonStyle}>📨 Send/Recv</button>
        <div style={{ width: "1px", height: "16px", backgroundColor: "#808080", margin: "0 4px" }} />
        <button style={win98ButtonStyle}>✉️ New</button>
        <button style={win98ButtonStyle}>📤 Reply</button>
        <button style={win98ButtonStyle}>↩️ Forward</button>
        <div style={{ width: "1px", height: "16px", backgroundColor: "#808080", margin: "0 4px" }} />
        <button style={win98ButtonStyle}>🗑️ Delete</button>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar (Folders) */}
        <div
          style={{
            width: "180px",
            borderRight: "2px inset #c0c0c0",
            backgroundColor: "#c0c0c0",
            padding: "4px",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "11px" }}>
            📁 Folders
          </div>
          {[
            { name: "Inbox", icon: "📥" },
            { name: "Outbox", icon: "📤" },
            { name: "Sent Items", icon: "📨" },
            { name: "Deleted Items", icon: "🗑️" },
            { name: "Drafts", icon: "📝" },
            { name: "Compose", icon: "✍️" }
          ].map((folder) => (
            <div
              key={folder.name}
              onClick={() => setSelectedFolder(folder.name)}
              style={{
                padding: "3px 6px",
                marginBottom: "1px",
                cursor: "pointer",
                backgroundColor: selectedFolder === folder.name ? "#316ac5" : "transparent",
                color: selectedFolder === folder.name ? "white" : "black",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                if (selectedFolder !== folder.name) {
                  e.currentTarget.style.backgroundColor = "#ddeeff";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedFolder !== folder.name) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span style={{ marginRight: "6px" }}>{folder.icon}</span>
              {folder.name}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: "8px", position: "relative", backgroundColor: "white", border: "2px inset #c0c0c0" }}>
          {sent && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#c0c0c0",
                border: "2px outset #c0c0c0",
                padding: "16px 20px",
                fontWeight: "bold",
                boxShadow: "4px 4px 8px rgba(0,0,0,0.5)",
                zIndex: 1000,
                minWidth: "250px",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "24px", marginRight: "8px" }}>💌</span>
                <span>Message Sent Successfully!</span>
              </div>
              <button
                onClick={() => setSent(false)}
                style={{
                  ...win98ButtonStyle,
                  minWidth: "60px",
                }}
              >
                OK
              </button>
            </div>
          )}

          {selectedFolder === "Inbox" && (
            <div>
              <h3 style={{ marginTop: 0, fontSize: "12px", fontWeight: "bold", color: "#0a246a" }}>
                📥 Inbox
              </h3>
              <div style={{ border: "2px inset #c0c0c0", padding: "8px", backgroundColor: "#f0f0f0" }}>
                <p style={{ margin: 0, fontSize: "11px" }}>No new messages</p>
              </div>
            </div>
          )}

          {(selectedFolder === "Sent Items" || selectedFolder === "Outbox") && (
            <div>
              <h3 style={{ marginTop: 0, fontSize: "12px", fontWeight: "bold", color: "#0a246a" }}>
                📨 {selectedFolder}
              </h3>
              <div style={{ border: "2px inset #c0c0c0", padding: "8px", backgroundColor: "#f0f0f0" }}>
                <p style={{ margin: 0, fontSize: "11px" }}>No sent messages yet</p>
              </div>
            </div>
          )}

          {selectedFolder === "Compose" && (
            <div>
              <h3 style={{ marginTop: 0, fontSize: "12px", fontWeight: "bold", color: "#0a246a" }}>
                ✍️ Compose New Message
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "11px" }}>From:</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    style={win98InputStyle}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "11px" }}>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    required
                    style={win98InputStyle}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "11px" }}>Subject:</label>
                  <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                    required
                    style={win98InputStyle}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "11px" }}>Message:</label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    required
                    rows="8"
                    style={{
                      ...win98InputStyle,
                      resize: "none",
                      fontFamily: "Courier New, monospace",
                    }}
                  ></textarea>
                </div>

                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button 
                    type="button" 
                    style={win98ButtonStyle}
                    onClick={() => setSent(true)}
                  >
                    📤 Send
                  </button>
                  <button 
                    type="button" 
                    style={win98ButtonStyle}
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setSubject("");
                      setMessage("");
                    }}
                  >
                    🗑️ Clear
                  </button>
                  <button type="button" style={win98ButtonStyle}>
                    💾 Save Draft
                  </button>
                </div>
              </div>
            </div>
          )}

          {(selectedFolder === "Deleted Items" || selectedFolder === "Drafts") && (
            <div>
              <h3 style={{ marginTop: 0, fontSize: "12px", fontWeight: "bold", color: "#0a246a" }}>
                {selectedFolder === "Deleted Items" ? "🗑️" : "📝"} {selectedFolder}
              </h3>
              <div style={{ border: "2px inset #c0c0c0", padding: "8px", backgroundColor: "#f0f0f0" }}>
                <p style={{ margin: 0, fontSize: "11px" }}>
                  {selectedFolder === "Deleted Items" ? "No deleted items" : "No drafts saved"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div
        style={{
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #808080",
          padding: "2px 8px",
          fontSize: "11px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "18px",
        }}
      >
        <span>Ready</span>
        <div style={{ display: "flex", gap: "16px" }}>
          <span>📧 0 messages</span>
          <span>🌐 Offline</span>
        </div>
      </div>
    </div>
  );
}