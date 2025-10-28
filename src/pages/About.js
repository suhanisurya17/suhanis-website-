import React from 'react';

function About() {
  return (
    <div
      style={{
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        color: '#000',
        lineHeight: 1.6,
        padding: '14px',
        backgroundColor: '#ECECEC',
        border: '2px inset #C0C0C0',
      }}
    >
      {/* Main Header */}
      <h2
        style={{
          marginTop: 0,
          marginBottom: '8px',
          fontSize: '16px',
          color: '#000080',
          backgroundColor: '#C0C0C0',
          border: '1px solid #808080',
          padding: '4px 8px',
          boxShadow: 'inset 1px 1px #fff, inset -1px -1px #808080',
          fontWeight: 'bold',
        }}
      >
        👋 Hi, I'm Suhani!
      </h2>

      <p style={{ marginBottom: '12px' }}>
        I’m a curious soul who loves discovering new cafés, hunting for vintage finds, and playing sports like volleyball, badminton and tennis!
      </p>


      {/* Section Header */}
      <h3
        style={{
          margin: '10px 0 4px',
          fontSize: '13px',
          color: '#000080',
          borderBottom: '1px dashed #808080',
          paddingBottom: '2px',
        }}
      >
        🎶 Music & Entertainment
      </h3>
      <p>
        My favourite artists are Drake, The Weeknd, and SZA. I’m always down for a good movie night or binge-watching a new series (currently obsessed with
        "Severance" and "Real Housewives of Salt Lake City").
      </p>

      <h3
        style={{
          margin: '10px 0 4px',
          fontSize: '13px',
          color: '#000080',
          borderBottom: '1px dashed #808080',
          paddingBottom: '2px',
        }}
      >
        ˙ ✩°˖ 🍵 Foodie Adventures ⋆｡˚꩜
      </h3>
      <p>
        Obsessed with trying new foods and I LOVE MATCHA. I love cozy cafes and discovering hidden gems in the city.
        My favourite spots are Matcha Matcha, Tsujiri, Williams Fresh Cafe, 10 Dean, and Starbucks!
      </p>

      <h3
        style={{
          margin: '10px 0 4px',
          fontSize: '13px',
          color: '#000080',
          borderBottom: '1px dashed #808080',
          paddingBottom: '2px',
        }}
      >
        🌟 Fun Facts
      </h3>
      <ul
  style={{
    paddingLeft: '0',
    marginTop: 0,
    textAlign: 'center',
    listStyleType: 'none', // removes bullet points for a cleaner look
  }}
>
  <li>I love shopping! Brandy Melville, Garage, Aritzia, H&M and Stradivarius are my go-tos</li>
  <li>Always down for a beach day or exploring the city</li>
  <li>Obsessed with vintage purses and jewelry</li>
  <li>Big fan of sunsets, city lights, and spontaneous walks</li>
</ul>

    </div>
  );
}

export default About;
