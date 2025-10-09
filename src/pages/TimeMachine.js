import React, { useState } from 'react';

function TimeMachine() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [animationClass, setAnimationClass] = useState('');

  const timelineData = {
    2022: {
      title: "FIRST Robotics",
      role: "Software Developer",
      description: "Developed and documented Java-based software to improve robot control, enhancing performance and maintainability.",
      logo: "🤖",
      color: "#E74C3C"
    },
    2023: {
      title: "Dairy Queen",
      role: "Crew Member",
      description: "Delivered quick, friendly service while managing orders and food prep in a fast-paced environment.",
      logo: "🍦",
      color: "#F39C12"
    },
    2024: {
      title: "The Food Society",
      role: "Social Media and Marketing Intern",
      description: "Grew social media reach by creating engaging content and optimizing strategy based on performance analytics.",
      logo: "🌱",
      color: "#27AE60"
    },
    2025: [
      {
        title: "HATCH",
        role: "Rail Systems Engineering Intern",
        description: "Supported engineering teams by maintaining internal tools and virtual lab environments while gaining hands-on experience with rail technologies, systems design, and project workflows.",
        logo: "🚆",
        color: "#E74C3C"
      },
      {
        title: "SS&C Technologies",
        role: "Software Engineering Intern",
        description: "Developing software solutions and gaining experience in financial technology systems.",
        logo: "💻",
        color: "#3498DB"
      }
    ]
  };

  const years = [2022, 2023, 2024, 2025];

  const handleYearClick = (year) => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setSelectedYear(year);
      setAnimationClass('fade-in');
    }, 150);
  };

  const getCurrentData = () => {
    const data = timelineData[selectedYear];
    return Array.isArray(data) ? data : [data];
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>🕰️ Timeline of Experience</h2>
        <div style={subtitleStyle}>Navigate through my professional journey</div>
      </div>

      {/* Timeline Navigation */}
      <div style={timelineStyle}>
        <div style={timelineLineStyle}></div>
        {years.map((year) => (
          <div
            key={year}
            style={{
              ...yearButtonStyle,
              backgroundColor: selectedYear === year ? "#0078D4" : "#C0C0C0",
              color: selectedYear === year ? "white" : "black",
              transform: selectedYear === year ? "scale(1.1)" : "scale(1)"
            }}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </div>
        ))}
      </div>

      {/* Content Display */}
      <div style={contentAreaStyle}>
        <div className={animationClass} style={contentContainerStyle}>
          {getCurrentData().map((item, index) => (
            <div key={index} style={{
              ...experienceCardStyle,
              borderLeftColor: item.color
            }}>
              <div style={logoStyle}>{item.logo}</div>
              <div style={cardContentStyle}>
                <div style={companyTitleStyle}>{item.title}</div>
                <div style={roleStyle}>{item.role}</div>
                <div style={descriptionStyle}>{item.description}</div>
                <div style={yearBadgeStyle}>{selectedYear}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Instructions */}
      <div style={instructionsStyle}>
        <div style={instructionTextStyle}>
          💡 Click on any year above to explore that period • Use your mouse to navigate through time
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        .fade-out {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.15s ease-out;
        }
        .fade-in {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s ease-in;
        }
      `}</style>
    </div>
  );
}

// Styles
const containerStyle = {
  fontFamily: "MS Sans Serif, sans-serif",
  backgroundColor: "#C0C0C0",
  padding: "16px",
  height: "100%",
  overflow: "hidden"
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
  padding: "12px",
  backgroundColor: "white",
  border: "2px inset #C0C0C0"
};

const titleStyle = {
  margin: "0 0 8px 0",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#000080"
};

const subtitleStyle = {
  fontSize: "11px",
  color: "#666",
  margin: 0
};

const timelineStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "20px 0",
  padding: "20px 0",
  position: "relative",
  backgroundColor: "#F0F0F0",
  border: "2px inset #C0C0C0"
};

const timelineLineStyle = {
  position: "absolute",
  top: "50%",
  left: "10%",
  right: "10%",
  height: "3px",
  backgroundColor: "#808080",
  zIndex: 1
};

const yearButtonStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  border: "3px outset #C0C0C0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold",
  zIndex: 2,
  position: "relative",
  transition: "all 0.2s ease",
  boxShadow: "2px 2px 4px rgba(0,0,0,0.3)"
};

const contentAreaStyle = {
  height: "280px",
  padding: "16px",
  backgroundColor: "white",
  border: "2px inset #C0C0C0",
  margin: "16px 0",
  overflow: "hidden"
};

const contentContainerStyle = {
  opacity: 1,
  transform: "translateY(0)",
  transition: "all 0.3s ease"
};

const experienceCardStyle = {
  display: "flex",
  padding: "16px",
  marginBottom: "16px",
  backgroundColor: "#F8F8F8",
  border: "2px outset #C0C0C0",
  borderLeft: "6px solid #3498DB",
  position: "relative"
};

const logoStyle = {
  fontSize: "32px",
  marginRight: "16px",
  display: "flex",
  alignItems: "center"
};

const cardContentStyle = {
  flex: 1
};

const companyTitleStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#000080",
  marginBottom: "4px"
};

const roleStyle = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#000",
  marginBottom: "8px"
};

const descriptionStyle = {
  fontSize: "11px",
  color: "#333",
  lineHeight: "1.4",
  marginBottom: "8px"
};

const yearBadgeStyle = {
  position: "absolute",
  top: "8px",
  right: "8px",
  backgroundColor: "#000080",
  color: "white",
  padding: "2px 6px",
  fontSize: "10px",
  border: "1px solid #000"
};

const instructionsStyle = {
  textAlign: "center",
  padding: "12px",
  backgroundColor: "#FFFFCC",
  border: "2px inset #C0C0C0",
  marginTop: "16px"
};

const instructionTextStyle = {
  fontSize: "10px",
  color: "#333",
  margin: 0
};

export default TimeMachine;