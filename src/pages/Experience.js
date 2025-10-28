import React, { useState } from 'react';

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  const experiences = [
    {
      id: 1,
      company: "FIRST Robotics",
      position: "Software Developer",
      period: "2022",
      description: "Developed and documented Java-based software to improve robot control, enhancing performance and maintainability.",
      logo: "🤖",
      color: "#E74C3C",
      technologies: ["Java", "Robotics", "Documentation"],
      achievements: "Improved robot control systems"
    },
    {
      id: 2,
      company: "Dairy Queen",
      position: "Crew Member",
      period: "2023",
      description: "Delivered quick, friendly service while managing orders and food prep in a fast-paced environment.",
      logo: "🍦",
      color: "#F39C12",
      technologies: ["Customer Service", "Food Prep", "Team Collaboration"],
      achievements: "Maintained high service standards"
    },
    {
      id: 3,
      company: "The Food Society",
      position: "Social Media and Marketing Intern",
      period: "2024",
      description: "Grew social media reach by creating engaging content and optimizing strategy based on performance analytics.",
      logo: "🌱",
      color: "#27AE60",
      technologies: ["Social Media", "Content Creation", "Analytics"],
      achievements: "Increased social media engagement"
    },
    {
      id: 4,
      company: "HATCH",
      position: "Rail Systems Engineering Intern",
      period: "2025",
      description: "Supported engineering teams by maintaining internal tools and virtual lab environments while gaining hands-on experience with rail technologies, systems design, and project workflows.",
      logo: "🚆",
      color: "#E74C3C",
      technologies: ["Rail Systems", "Virtual Labs", "Engineering Tools"],
      achievements: "Supported critical infrastructure projects"
    },
    {
      id: 5,
      company: "SS&C Technologies",
      position: "Software Engineering Intern",
      period: "2025",
      description: "Developing software solutions and gaining experience in financial technology systems.",
      logo: "💻",
      color: "#3498DB",
      technologies: ["Software Development", "FinTech", "System Design"],
      achievements: "Contributing to financial technology solutions"
    }
  ];

  const handleExperienceClick = (experience) => {
    setSelectedExperience(experience);
  };

  const closeDialog = () => {
    setSelectedExperience(null);
  };

  return (
    <div>
      {/* Main Experience Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          padding: "16px",
          backgroundColor: "#C0C0C0",
          border: "2px solid #808080",
          fontFamily: "MS Sans Serif, sans-serif",
        }}
      >
        {experiences.map((exp) => (
          <div
            key={exp.id}
            onClick={() => handleExperienceClick(exp)}
            style={{
              textDecoration: "none",
              color: "black",
              border: "2px inset #fff",
              borderLeft: `6px solid ${exp.color}`,
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
              e.currentTarget.style.borderLeft = `6px solid ${exp.color}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "2px inset #fff";
              e.currentTarget.style.borderLeft = `6px solid ${exp.color}`;
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "24px", marginRight: "8px" }}>{exp.logo}</span>
              <h3 style={{ margin: "0", fontSize: "13px" }}>
                {exp.position}
              </h3>
            </div>
            <p style={{ flexGrow: 1, fontSize: "11px", margin: "0 0 6px 0" }}>
              {exp.company}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "10px",
                color: "#000080",
              }}
            >
              <span>{exp.period}</span>
              <span>💼 {exp.technologies.length} skills</span>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Details Dialog */}
      {selectedExperience && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            fontFamily: "MS Sans Serif, sans-serif",
          }}
          onClick={closeDialog}
        >
          <div
            style={{
              backgroundColor: "#C0C0C0",
              border: "2px outset #fff",
              borderRadius: "0px",
              width: "400px",
              maxWidth: "90vw",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Title Bar */}
            <div
              style={{
                backgroundColor: "#000080",
                color: "white",
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              <span>Job Details</span>
              <button
                onClick={closeDialog}
                style={{
                  width: "16px",
                  height: "14px",
                  backgroundColor: "#C0C0C0",
                  border: "1px outset #fff",
                  fontSize: "10px",
                  cursor: "pointer",
                  color: "black",
                  fontWeight: "bold",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.border = "1px inset #fff";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.border = "1px outset #fff";
                }}
              >
                ×
              </button>
            </div>

            {/* Dialog Content */}
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "32px", marginRight: "12px" }}>{selectedExperience.logo}</span>
                <div>
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedExperience.position}
                  </h3>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "12px",
                      color: "#000080",
                    }}
                  >
                    {selectedExperience.company} • {selectedExperience.period}
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#fff",
                  border: "2px inset #C0C0C0",
                  padding: "8px",
                  margin: "8px 0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                {selectedExperience.description}
              </div>

              <div style={{ margin: "8px 0" }}>
                <p style={{ margin: "0 0 4px 0", fontSize: "11px", fontWeight: "bold" }}>
                  Skills & Technologies:
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  {selectedExperience.technologies.map((tech, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#E0E0E0",
                        border: "1px inset #fff",
                        padding: "2px 6px",
                        fontSize: "10px",
                        borderRadius: "0px",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#FFFFE0",
                  border: "2px inset #C0C0C0",
                  padding: "6px",
                  margin: "8px 0",
                  fontSize: "10px",
                }}
              >
                <strong>Key Achievement:</strong> {selectedExperience.achievements}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px",
                }}
              >
                <button
                  onClick={closeDialog}
                  style={{
                    padding: "6px 16px",
                    backgroundColor: "#C0C0C0",
                    border: "2px outset #fff",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontFamily: "MS Sans Serif, sans-serif",
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.border = "2px inset #fff";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.border = "2px outset #fff";
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
