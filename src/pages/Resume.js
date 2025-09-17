import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import '../pdf-worker'; // 👈 this line loads your local worker

export default function Resume() {
  const [numPages, setNumPages] = useState(null);

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '1rem' }}>
      <Document
        file="/icons/Suhani_Surya_Resume_3.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(error) => console.error('PDF load error:', error)}
        loading="Loading resume..."
      >
        {Array.from({ length: numPages || 0 }, (_, i) => (
          <Page key={i} pageNumber={i + 1} />
        ))}
      </Document>
    </div>
  );
}
