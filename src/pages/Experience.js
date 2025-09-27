import React, { useState } from 'react';

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  const experiences = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      position: "Senior Software Developer",
      period: "2022 - Present",
      description: "Developed web applications using React and Node.js. Led a team of 5 developers on multiple projects. Implemented CI/CD pipelines and improved code quality standards.",
      technologies: ["React", "Node.js", "TypeScript", "AWS"],
      achievements: "Led 3 major product launches"
    },
    {
      id: 2,
      company: "Digital Innovations Ltd.",
      position: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Built responsive websites and database systems. Improved application performance by 40%. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["JavaScript", "Python", "PostgreSQL", "Docker"],
      achievements: "Reduced load times by 40%"
    },
    {
      id: 3,
      company: "StartUp Dynamics",
      position: "Junior Developer",
      period: "2018 - 2020",
      description: "Maintained legacy systems and developed new features. Collaborated with design team on UI/UX improvements. Participated in code reviews and agile development processes.",
      technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
      achievements: "Delivered 15+ feature releases"
    },
    {
      id: 4,
      company: "CodeCraft Agency",
      position: "Frontend Intern",
      period: "2017 - 2018",
      description: "Assisted in building client websites and learned modern web development practices. Worked closely with senior developers to understand best practices and coding standards.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      achievements: "Completed 8 client projects"
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
            <h3 style={{ margin: "0 0 6px 0", fontSize: "13px" }}>
              {exp.position}
            </h3>
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
              <span>💼 {exp.technologies.length} techs</span>
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
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {selectedExperience.position}
              </h3>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "12px",
                  color: "#000080",
                }}
              >
                {selectedExperience.company} • {selectedExperience.period}
              </p>

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
                  Technologies:
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