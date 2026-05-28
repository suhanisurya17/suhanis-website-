import React, { useState } from "react";
// import ModelViewer from "../components/ModelViewer"; // Temporarily commented until dependencies are installed

export default function DesignProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  const projects = [
    {
      id: 1,
      name: "Range Rover Assembly",
      type: "folder",
      icon: "⚙️",
      description: "Dynamic CAD assembly simulating the mechanical systems of a Range Rover.",
      details: "Built a visually detailed and mechanically accurate 3D assembly with over 14 parts. Presented through animated exploded views and rendered visuals to demonstrate mechanical interaction and assembly workflow.",
      tags: ["SolidWorks", "CAD", "Mechanical Design"],
      date: "2024-03-15",
      images: ["/icons/designprojects-page/rangerover.png"],
      modelPath: "/models/rangerover.glb" // Add your GLB file path here
    },
    {
      id: 2,
      name: "Kettle Solidworks Part",
      type: "folder",
      icon: "🔧",
      description: "Parametric 3D model of a household kettle.",
      details: "Designed a consumer kettle with sleek contours and intuitive usability. Focused on ergonomic comfort, sustainability, and efficient assembly. Modeled all components parametrically in SolidWorks and validated durability",
      tags: ["SolidWorks", "Product Design", "Engineering"],
      date: "2024-02-10",
      images: ["/icons/designprojects-page/kettle.png"],
      modelPath: "/models/kettle.glb" // Add your GLB file path here
    },
    {
      id: 3,
      name: "Cloakify: Invisibility Cloak",
      type: "folder",
      icon: "🎭",
      description: "Computer vision–based invisibility cloak using Python and OpenCV.",
      details: "Developed a real-time image-processing system that detects a target color in live video and replaces it with background pixels to create an invisibility effect. Implemented background subtraction, color masking, and contour filtering for smooth visual blending. Demonstrates core concepts in OpenCV, frame differencing, and computer vision pipelines.",
      tags: ["Python", "OpenCV", "Computer Vision", "Image Processing"],
      date: "2024-01-20",
      images: ["/icons/designprojects-page/cloakify.jpeg"]
    },
    {
      id: 4,
      name: "Kitchen Nova",
      type: "folder",
      icon: "🏗️",
      description: "Full-stack kitchen management web app built with React and MongoDB.",
      details: "Developed a responsive web platform for organizing recipes, tracking ingredients, and managing kitchen tasks. Designed the interface in Figma with a focus on intuitive navigation and modern visuals. Integrated a MongoDB database for scalable data storage and implemented dynamic front-end interactions with React and RESTful APIs.",
      tags: ["React", "MongoDB", "Figma", "Full-Stack Development", "UI/UX Design"],
      date: "2023-12-08",
      images: ["/icons/designprojects-page/kitchennova1.png"]
    },
    {
      id: 5,
      name: "ChuteDry Pro",
      type: "folder",
      icon: "🧺",
      description: "Smart washer–dryer control interface concept designed in Figma.",
      details: "Developed a connected appliance interface concept for efficient laundry management. Designed a modern mobile UI in Figma with intuitive controls for wash and dry cycles, real-time status tracking, and quick actions. Focused on enhancing user convenience, reducing interaction friction, and integrating IoT-inspired automation for next-gen home appliances.",
      tags: ["Figma", "UI/UX Design", "Product Design", "Smart Home", "IoT"],
      date: "2024-03-22",
      images: ["/icons/designprojects-page/ChuteDryPro.png"]
    },
{
      id: 6,
      name: "Compass",
      type: "folder",
      icon: "🧭",
      description: "Smart washer–dryer control interface concept designed in Figma.",
      details: "Compass is a digital assistant designed to help older adults navigate technology with confidence. By combining clear step-by-step voice guidance, on-screen visual cues, and built-in scam protection, Compass turns confusing digital tasks into simple, manageable actions. It empowers seniors to stay independent online: whether they’re booking appointments, checking emails, or avoiding unsafe pop-ups.",
      tags: ["Figma", "UI/UX Design", "Product Design", "Product Management", "Entrepreneurship"],
      date: "2025-11-22",
      images: ["/icons/designprojects-page/Compass Pitch Deck.mp4"]
    },


    // {
    //   id: 5,
    //   name: "Robot Arm Design",
    //   type: "folder",
    //   icon: "🤖",
    //   description: "Articulated robot arm with servo motor integration.",
    //   details: "Engineered a multi-axis robot arm with accurate joint modeling and motion simulation. Designed for 3D printing with optimized part assembly.",
    //   tags: ["SolidWorks", "Robotics", "Simulation"],
    //   date: "2024-04-05",
    //   images: ["/icons/file.png"]
    // },
    // {
    //   id: 6,
    //   name: "Abstract Animation",
    //   type: "folder",
    //   icon: "🎨",
    //   description: "Procedural animation with geometric patterns.",
    //   details: "Created an animated sequence using procedural modeling and shader nodes. Features dynamic geometry, particle systems, and color gradients.",
    //   tags: ["Blender", "Animation", "Procedural"],
    //   date: "2024-03-28",
    //   images: ["/icons/image-viewer.png"]
    // },
    // {
    //   id: 7,
    //   name: "Drone Frame Design",
    //   type: "folder",
    //   icon: "🚁",
    //   description: "Lightweight carbon fiber drone frame assembly.",
    //   details: "Designed an optimized quadcopter frame with aerodynamic considerations and mounting points for electronics. Includes stress analysis and weight calculations.",
    //   tags: ["SolidWorks", "Drone", "Aerospace"],
    //   date: "2023-11-15",
    //   images: ["/icons/file.png"]
    // },
    // {
    //   id: 8,
    //   name: "Product Visualization",
    //   type: "folder",
    //   icon: "💎",
    //   description: "Commercial product renders for marketing materials.",
    //   details: "Produced high-quality product visualization renders with studio lighting setup. Optimized for web and print marketing with multiple angle variants.",
    //   tags: ["Blender", "Product Viz", "Marketing"],
    //   date: "2024-02-22",
    //   images: ["/icons/projects.png"]
    // }
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

              {/* 3D Model Viewer - Temporarily disabled until dependencies are installed */}
              {/* {selectedProject.modelPath && (
                <div style={previewSectionStyle}>
                  <div style={detailsLabelStyle}>3D Model:</div>
                  <ModelViewer modelPath={selectedProject.modelPath} />
                </div>
              )} */}

              {/* Image/Video Preview */}
              <div style={previewSectionStyle}>
                <div style={detailsLabelStyle}>Preview:</div>
                <div style={previewImageContainerStyle}>
                  {selectedProject.images.map((media, index) => {
                    const isVideo = media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.mov');
                    return isVideo ? (
                      <video
                        key={index}
                        controls
                        style={previewImageStyle}
                      >
                        <source src={media} type={`video/${media.split('.').pop()}`} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        key={index}
                        src={media}
                        alt={`${selectedProject.name} preview ${index + 1}`}
                        style={previewImageStyle}
                      />
                    );
                  })}
                </div>
              </div>

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

const statusBarStyle = {
  padding: "4px 8px",
  backgroundColor: "#C0C0C0",
  borderTop: "2px groove #808080",
  fontSize: "10px",
  display: "flex",
  alignItems: "center",
};
