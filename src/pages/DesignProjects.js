import React, { useState } from "react";

export default function DesignProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  const projects = [
    {
      id: 1,
      name: "Brand Identity Design",
      type: "folder",
      icon: "📁",
      description: "Complete brand identity package including logo, color palette, and typography guidelines.",
      details: "Created for a tech startup looking to establish their visual identity. The project included logo variations, brand guidelines, and marketing materials.",
      tags: ["Branding", "Logo Design", "Typography"],
      date: "2024-01-15",
      images: ["/icons/projects.png"]
    },
    {
      id: 2,
      name: "Mobile App UI",
      type: "folder",
      icon: "📱",
      description: "User interface design for a social media mobile application.",
      details: "Designed a modern, intuitive interface focusing on user experience and accessibility. Includes wireframes, mockups, and interactive prototypes.",
      tags: ["UI Design", "Mobile", "Figma"],
      date: "2024-02-20",
      images: ["/icons/file.png"]
    },
    {
      id: 3,
      name: "Website Redesign",
      type: "folder",
      icon: "🌐",
      description: "Complete website redesign for an e-commerce platform.",
      details: "Modernized the user experience with improved navigation, responsive design, and enhanced visual hierarchy.",
      tags: ["Web Design", "UX", "Responsive"],
      date: "2024-03-10",
      images: ["/icons/projects.png"]
    },
    {
      id: 4,
      name: "Poster Series",
      type: "folder",
      icon: "🎨",
      description: "Collection of promotional posters for music events.",
      details: "Designed a series of eye-catching posters combining bold typography and vibrant imagery.",
      tags: ["Graphic Design", "Print", "Typography"],
      date: "2023-12-05",
      images: ["/icons/image-viewer.png"]
    },
    {
      id: 5,
      name: "Icon Pack",
      type: "folder",
      icon: "⭐",
      description: "Custom icon set with 50+ unique icons.",
      details: "Created a cohesive icon pack suitable for web and mobile applications. Available in multiple sizes and formats.",
      tags: ["Icon Design", "Vector", "UI Elements"],
      date: "2024-01-30",
      images: ["/icons/file.png"]
    }
  ];

  const handleProjectClick = (project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
  };

  const handleProjectDoubleClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div style={containerStyle}>
      <div style={toolbarStyle}>
        <button
          style={toolbarButtonStyle}
          onClick={() => setViewMode(viewMode === "list" ? "icons" : "list")}
        >
          {viewMode === "list" ? "🔲 Icons" : "📋 List"}
        </button>
        <div style={addressBarStyle}>
          <span style={{ marginRight: "8px" }}>📍</span>
          <span>My Computer \ Design Projects</span>
        </div>
      </div>

      <div style={mainContentStyle}>
        <div style={fileExplorerStyle}>
          <div style={explorerHeaderStyle}>
            <span>Name</span>
            <span>Type</span>
            <span>Date Modified</span>
          </div>

          {viewMode === "list" ? (
            <div style={listViewStyle}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    ...fileItemStyle,
                    backgroundColor: selectedProject?.id === project.id ? "#000080" : "white",
                    color: selectedProject?.id === project.id ? "white" : "black",
                  }}
                  onClick={() => handleProjectClick(project)}
                  onDoubleClick={() => handleProjectDoubleClick(project)}
                >
                  <div style={fileNameCellStyle}>
                    <span style={{ fontSize: "16px", marginRight: "8px" }}>{project.icon}</span>
                    <span>{project.name}</span>
                  </div>
                  <div style={fileTypeCellStyle}>Design Project</div>
                  <div style={fileDateCellStyle}>{new Date(project.date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={iconViewStyle}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    ...iconItemStyle,
                    backgroundColor: selectedProject?.id === project.id ? "#000080" : "transparent",
                    color: selectedProject?.id === project.id ? "white" : "black",
                  }}
                  onClick={() => handleProjectClick(project)}
                  onDoubleClick={() => handleProjectDoubleClick(project)}
                >
                  <div style={iconLargeStyle}>{project.icon}</div>
                  <div style={iconLabelStyle}>{project.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedProject && (
          <div style={detailsPanelStyle}>
            <div style={detailsHeaderStyle}>
              <span style={{ fontSize: "20px", marginRight: "8px" }}>{selectedProject.icon}</span>
              <span style={{ fontWeight: "bold", fontSize: "12px" }}>{selectedProject.name}</span>
            </div>

            <div style={detailsContentStyle}>
              <div style={detailsSectionStyle}>
                <div style={detailsLabelStyle}>Description:</div>
                <div style={detailsValueStyle}>{selectedProject.description}</div>
              </div>

              <div style={detailsSectionStyle}>
                <div style={detailsLabelStyle}>Details:</div>
                <div style={detailsValueStyle}>{selectedProject.details}</div>
              </div>

              <div style={detailsSectionStyle}>
                <div style={detailsLabelStyle}>Tags:</div>
                <div style={tagsContainerStyle}>
                  {selectedProject.tags.map((tag, index) => (
                    <span key={index} style={tagStyle}>{tag}</span>
                  ))}
                </div>
              </div>

              <div style={detailsSectionStyle}>
                <div style={detailsLabelStyle}>Date:</div>
                <div style={detailsValueStyle}>{new Date(selectedProject.date).toLocaleDateString()}</div>
              </div>

              <div style={previewSectionStyle}>
                <div style={detailsLabelStyle}>Preview:</div>
                <div style={previewImageContainerStyle}>
                  {selectedProject.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${selectedProject.name} preview ${index + 1}`}
                      style={previewImageStyle}
                    />
                  ))}
                </div>
              </div>

              <button style={openButtonStyle}>
                Open Project
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={statusBarStyle}>
        <span>{projects.length} object(s)</span>
        {selectedProject && <span style={{ marginLeft: "20px" }}>1 object(s) selected</span>}
      </div>
    </div>
  );
}

const containerStyle = {
  fontFamily: "MS Sans Serif, sans-serif",
  fontSize: "11px",
  backgroundColor: "#C0C0C0",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const toolbarStyle = {
  backgroundColor: "#C0C0C0",
  borderBottom: "2px groove #808080",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const toolbarButtonStyle = {
  padding: "4px 8px",
  border: "2px outset #C0C0C0",
  backgroundColor: "#C0C0C0",
  cursor: "pointer",
  fontFamily: "MS Sans Serif, sans-serif",
  fontSize: "10px",
  fontWeight: "bold",
};

const addressBarStyle = {
  flex: 1,
  padding: "4px 8px",
  backgroundColor: "white",
  border: "2px inset #C0C0C0",
  fontSize: "11px",
  display: "flex",
  alignItems: "center",
};

const mainContentStyle = {
  flex: 1,
  display: "flex",
  overflow: "hidden",
  backgroundColor: "white",
  margin: "2px",
  border: "2px inset #C0C0C0",
};

const fileExplorerStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  borderRight: "2px solid #808080",
  overflow: "auto",
};

const explorerHeaderStyle = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  padding: "4px 8px",
  backgroundColor: "#C0C0C0",
  borderBottom: "2px groove #808080",
  fontWeight: "bold",
  fontSize: "11px",
};

const listViewStyle = {
  flex: 1,
  overflow: "auto",
};

const fileItemStyle = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  padding: "4px 8px",
  cursor: "pointer",
  borderBottom: "1px solid #E0E0E0",
  alignItems: "center",
};

const fileNameCellStyle = {
  display: "flex",
  alignItems: "center",
};

const fileTypeCellStyle = {
  fontSize: "10px",
};

const fileDateCellStyle = {
  fontSize: "10px",
};

const iconViewStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
  gap: "16px",
  padding: "16px",
  overflow: "auto",
};

const iconItemStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "8px",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: "2px",
};

const iconLargeStyle = {
  fontSize: "32px",
  marginBottom: "4px",
};

const iconLabelStyle = {
  fontSize: "10px",
  wordBreak: "break-word",
};

const detailsPanelStyle = {
  width: "300px",
  backgroundColor: "#C0C0C0",
  padding: "8px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
};

const detailsHeaderStyle = {
  padding: "8px",
  backgroundColor: "white",
  border: "2px inset #C0C0C0",
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
};

const detailsContentStyle = {
  flex: 1,
  overflow: "auto",
};

const detailsSectionStyle = {
  marginBottom: "12px",
  padding: "8px",
  backgroundColor: "white",
  border: "2px inset #C0C0C0",
};

const detailsLabelStyle = {
  fontWeight: "bold",
  marginBottom: "4px",
  color: "#000080",
};

const detailsValueStyle = {
  fontSize: "10px",
  lineHeight: "1.4",
};

const tagsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
  marginTop: "4px",
};

const tagStyle = {
  padding: "2px 6px",
  backgroundColor: "#000080",
  color: "white",
  fontSize: "9px",
  border: "1px outset #C0C0C0",
};

const previewSectionStyle = {
  marginBottom: "12px",
  padding: "8px",
  backgroundColor: "white",
  border: "2px inset #C0C0C0",
};

const previewImageContainerStyle = {
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const previewImageStyle = {
  width: "100%",
  height: "auto",
  border: "1px solid #808080",
};

const openButtonStyle = {
  width: "100%",
  padding: "6px",
  border: "2px outset #C0C0C0",
  backgroundColor: "#C0C0C0",
  cursor: "pointer",
  fontFamily: "MS Sans Serif, sans-serif",
  fontSize: "11px",
  fontWeight: "bold",
  marginTop: "8px",
};

const statusBarStyle = {
  padding: "4px 8px",
  backgroundColor: "#C0C0C0",
  borderTop: "2px groove #808080",
  fontSize: "10px",
  display: "flex",
  alignItems: "center",
};
