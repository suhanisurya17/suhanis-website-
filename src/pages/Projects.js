import React, { useEffect, useState } from "react";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);

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

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <div style={loadingBoxStyle}>
          <div style={{ fontSize: "14px", marginBottom: "10px" }}>⏳ Loading projects...</div>
          <div style={{ fontSize: "10px", color: "#666" }}>Fetching from GitHub...</div>
        </div>
      </div>
    );
  }

  if (!repos.length) {
    return (
      <div style={loadingContainerStyle}>
        <div style={errorBoxStyle}>
          <div style={{ fontSize: "14px", marginBottom: "10px" }}>⚠️ No public repos found</div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>📁 GitHub Projects</div>
        <div style={subtitleStyle}>
          {repos.length} repositories • <a href="https://github.com/suhanisurya17" target="_blank" rel="noopener noreferrer" style={linkStyle}>View on GitHub</a>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={gridContainerStyle}>
        {repos.map((repo) => (
          <div
            key={repo.id}
            style={projectCardStyle}
            onClick={() => setSelectedRepo(selectedRepo === repo.id ? null : repo.id)}
          >
            {/* Card Header */}
            <div style={cardHeaderStyle}>
              <div style={repoIconStyle}>📦</div>
              <div style={{ flex: 1 }}>
                <div style={repoNameStyle}>{repo.name}</div>
                {/* <div style={repoVisibilityStyle}>
                  {repo.private ? "🔒 Private" : "🌐 Public"}
                </div> */}
              </div>
            </div>

            {/* Description */}
            <div style={descriptionStyle}>
              {repo.description || "No description provided."}
            </div>

            {/* Stats Row */}
            <div style={statsRowStyle}>
              <div style={statItemStyle}>
                {repo.language && (
                  <>
                    <span style={languageDotStyle(repo.language)}></span>
                    <span>{repo.language}</span>
                  </>
                )}
              </div>
              {/* <div style={statItemStyle}>⭐ {repo.stargazers_count}</div>
              <div style={statItemStyle}>🍴 {repo.forks_count}</div> */}
            </div>

            {/* Expanded Details */}
            {selectedRepo === repo.id && (
              <div style={expandedDetailsStyle}>
                <div style={detailRowStyle}>
                  <span style={detailLabelStyle}>Updated:</span>
                  <span style={detailValueStyle}>
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div style={detailRowStyle}>
                  <span style={detailLabelStyle}>Created:</span>
                  <span style={detailValueStyle}>
                    {new Date(repo.created_at).toLocaleDateString()}
                  </span>
                </div>
                {repo.homepage && (
                  <div style={detailRowStyle}>
                    <span style={detailLabelStyle}>Website:</span>
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer" style={homepageLinkStyle}>
                      🔗 Visit
                    </a>
                  </div>
                )}
                <div style={{ textAlign: "center", marginTop: "8px" }}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={viewButtonStyle}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Language color mapping
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    TypeScript: "#2b7489",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    PHP: "#4F5D95",
  };
  return colors[language] || "#808080";
};

// Styles
const containerStyle = {
  fontFamily: "MS Sans Serif, sans-serif",
  fontSize: "11px",
  backgroundColor: "#C0C0C0",
  height: "100%",
  overflow: "auto",
  padding: "0",
};

const loadingContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  backgroundColor: "#C0C0C0",
};

const loadingBoxStyle = {
  backgroundColor: "white",
  border: "2px outset #C0C0C0",
  padding: "20px",
  textAlign: "center",
  fontFamily: "MS Sans Serif, sans-serif",
};

const errorBoxStyle = {
  ...loadingBoxStyle,
  backgroundColor: "#FFFFCC",
  border: "2px solid #808080",
};

const headerStyle = {
  backgroundColor: "white",
  border: "2px inset #C0C0C0",
  padding: "12px",
  margin: "8px",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#000080",
  marginBottom: "4px",
};

const subtitleStyle = {
  fontSize: "10px",
  color: "#666",
};

const linkStyle = {
  color: "#000080",
  textDecoration: "underline",
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "12px",
  padding: "8px",
};

const projectCardStyle = {
  backgroundColor: "white",
  border: "2px outset #C0C0C0",
  padding: "10px",
  cursor: "pointer",
  transition: "all 0.1s ease",
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  marginBottom: "8px",
};

const repoIconStyle = {
  fontSize: "20px",
  lineHeight: 1,
};

const repoNameStyle = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#000080",
  wordBreak: "break-word",
};

const repoVisibilityStyle = {
  fontSize: "9px",
  color: "#666",
  marginTop: "2px",
};

const descriptionStyle = {
  fontSize: "10px",
  color: "#333",
  lineHeight: "1.4",
  marginBottom: "8px",
  minHeight: "32px",
};

const statsRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "10px",
  color: "#666",
  borderTop: "1px solid #C0C0C0",
  paddingTop: "6px",
};

const statItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

const languageDotStyle = (language) => ({
  display: "inline-block",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: getLanguageColor(language),
});

const expandedDetailsStyle = {
  marginTop: "8px",
  paddingTop: "8px",
  borderTop: "1px solid #C0C0C0",
  fontSize: "10px",
};

const detailRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "4px",
};

const detailLabelStyle = {
  fontWeight: "bold",
  color: "#666",
};

const detailValueStyle = {
  color: "#333",
};

const homepageLinkStyle = {
  color: "#000080",
  textDecoration: "underline",
};

const viewButtonStyle = {
  display: "inline-block",
  padding: "4px 12px",
  border: "2px outset #C0C0C0",
  backgroundColor: "#C0C0C0",
  color: "black",
  textDecoration: "none",
  fontSize: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};
