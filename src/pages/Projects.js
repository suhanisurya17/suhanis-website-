import React, { useEffect, useState } from "react";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/suhanisurya17/repos?sort=updated&per_page=10")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching repos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center", color: "#000080" }}>Loading projects...</p>;
  if (!repos.length) return <p style={{ textAlign: "center", color: "#000080" }}>No public repos found.</p>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "#C0C0C0", // classic Win98 gray
        border: "2px solid #808080",
        fontFamily: "MS Sans Serif, sans-serif",
      }}
    >
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "black",
            border: "2px inset #fff", // inset border for 3D look
            borderRadius: "2px",
            padding: "12px",
            width: "220px",
            backgroundColor: "#E0E0E0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "all 0.1s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = "2px outset #fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = "2px inset #fff";
          }}
        >
          <h3 style={{ margin: "0 0 6px 0", fontSize: "13px" }}>{repo.name}</h3>
          <p style={{ flexGrow: 1, fontSize: "11px", margin: "0 0 6px 0" }}>
            {repo.description || "No description provided."}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
              color: "#000080",
            }}
          >
            <span>{repo.language || "N/A"}</span>
            <span>⭐ {repo.stargazers_count}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
