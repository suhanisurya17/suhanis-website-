import React from 'react';

function Home() {
  const skills = [
    { icon: '🐍', label: 'Python' },
    { icon: '⚛️', label: 'React' },
    { icon: '☕', label: 'Java' },
    { icon: '🌐', label: 'JavaScript' },
    { icon: '🎨', label: 'HTML/CSS' },
    { icon: '🗄️', label: 'SQL' },
  ];

  return (
    <div
      style={{
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        color: '#000',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header card */}
      <div
        style={{
          border: '2px inset #c0c0c0',
          backgroundColor: '#ffffff',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
        }}
      >
        <div style={{ fontSize: '36px', lineHeight: 1, alignItems: 'center' }}>👩‍💻</div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '3px' }}>
            Suhani Surya
          </div>
          <div style={{ color: '#444', lineHeight: '1.5' }}>
            Systems Design Engineering @ University of Waterloo
          </div>
          <div style={{ color: '#0000aa', marginTop: '2px' }}>
            suhanisurya17@gmail.com
          </div>
        </div>
      </div>

      
      <div style={{ border: '2px inset #c0c0c0', backgroundColor: '#fff', padding: '8px 12px', lineHeight: '1.6' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#000080' }}>About Me</div>
        I am a 2nd year Systems Design Engineering student at UWaterloo. I am interested in exploring the intersection of fashion and engineering, hoping to pursue a career in that space. 
        I love to code, build and create in any way that I can. Outside of school/career stuff, I love to play sports and pursue as many hobbies as I can. I play volleyball, tennis, pickleball and badminton, and I also like to go on runs, bedazzle items, go thrifting, and crochet. 
        I am always looking for new ways to learn and grow, and I am excited to see where my interests take me in the future.
      </div>

      {/* Skills */}
      <div style={{ border: '2px inset #c0c0c0', backgroundColor: '#fff', padding: '8px 12px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#000080' }}>Tech Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {skills.map(({ icon, label }) => (
            <div
              key={label}
              style={{
                border: '1px outset #c0c0c0',
                backgroundColor: '#c0c0c0',
                padding: '2px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div style={{ border: '2px inset #c0c0c0', backgroundColor: '#fff', padding: '8px 12px', lineHeight: '1.6' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#000080' }}>Career Goals</div>
        Exploring software and biomedical engineering in real-world systems — focused on innovation,
        accessibility, and impactful user experiences.
      </div>
    </div>
  );
}

export default Home;
