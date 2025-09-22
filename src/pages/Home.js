import React from 'react';

function About() {
  return (
    <div
      style={{
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        color: '#000', // classic black text
        lineHeight: '1.6',
        padding: '12px',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Hello, I'm Suhani Surya 👋</h2>
      <p>
        I'm a Systems Design Engineering student at the University of Waterloo with a passion for
        software development and building meaningful projects. I enjoy creating applications and solving
        problems using both front-end and back-end technologies.
      </p>

      <h3>💡 Tech Skills</h3>
      <ul style={{ paddingLeft: '20px' }}>
        <li>💻 Python – data analysis, scripting, and software projects</li>
        <li>⚛️ React – building interactive and modern web interfaces</li>
        <li>☕ Java – object-oriented programming and software development</li>
        <li>🌐 JavaScript & HTML – creating dynamic web applications</li>
      </ul>

      <h3>🎯 Interests</h3>
      <p>
        Beyond coding, I enjoy exploring new technologies, engaging in side projects, and
        learning how software can solve real-world problems. I’m passionate about collaborating
        with people from different fields to create impactful solutions.
      </p>

      <h3>✨ Fun Fact</h3>
      <p>
        My grandmother was one of the first female engineers in Karnataka, which inspired me to pursue
        a career in technology and innovation.
      </p>

      <h3>🎓 Career Goals</h3>
      <p>
        I aim to explore software and biomedical engineering applications in real-world systems,
        focusing on innovation, accessibility, and impactful user experiences.
      </p>
    </div>
  );
}

export default About;
