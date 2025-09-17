// import React, { useEffect, useState } from 'react';

// export default function Projects() {
//     const [repos, setRepos] = useState([]);

//     useEffect(() => {
//         fetch('https://api.github.com/users/suhanisurya17/repos?sort=updated&per_page=5')
//             .then((res) => res.json())
//             .then((data) => setRepos(data))
//             .catch((err) => console.error('Error fetching repos:', err));
//     }, []);

//     return (
//         <div
//             style={{
//                 maxHeight: '300px', // increased so GitHub repos fit nicely
//                 overflowY: 'auto',
//                 paddingRight: '10px',
//                 border: '1px solid #ddd',
//                 borderRadius: '8px',
//                 padding: '20px',
//                 backgroundColor: '#f9f9f9',
//             }}
//         >
//             <h2>Projects</h2>
//             <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
//                 {/* Static projects
//                 <li>
//                     <strong>Tailored:</strong> AI-powered virtual closet that scrapes fashion data from TikTok and Pinterest to help users plan outfits.
//                 </li>
//                 <li>
//                     <strong>Traffic Light Simulator:</strong> Built with Raspberry Pi Pico and MicroPython for an embedded systems class project.
//                 </li>
//                 <li>
//                     <strong>Breast Cancer Detection:</strong> Trained an object detection model with 99.5% mAP using Roboflow and a medical image dataset.
//                 </li>
//                 <li>
//                     <strong>OCR Web Tool:</strong> React-based app that uses Tesseract.js to extract and copy text from uploaded images and PDFs.
//                 </li> */}

//                 {/* Dynamic GitHub repos */}
//                 {repos.map((repo) => (
//                     <li key={repo.id}>
//                         <strong>{repo.name}:</strong> {repo.description || 'No description'}{' '}
//                         <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
//                             🔗
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';

export default function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.github.com/users/suhanisurya17/repos?sort=updated&per_page=10')
            .then((res) => res.json())
            .then((data) => {
                setRepos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching repos:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading projects...</p>;
    if (!repos.length) return <p>No public repos found.</p>;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {repos.map((repo) => (
                <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '16px',
                        width: '250px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <h3 style={{ margin: '0 0 8px 0' }}>{repo.name}</h3>
                    <p style={{ flexGrow: 1, fontSize: '0.9rem', margin: '0 0 8px 0' }}>
                        {repo.description || 'No description provided'}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#555' }}>
                        <span>{repo.language || 'N/A'}</span>
                        <span>⭐ {repo.stargazers_count}</span>
                    </div>
                </a>
            ))}
        </div>
    );
}
