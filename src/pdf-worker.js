// src/pdf-worker.js
import { pdfjs } from 'react-pdf';

// Make sure the path matches the folder you just created in public/
pdfjs.GlobalWorkerOptions.workerSrc = '/3.11.174/pdf.worker.min.js';
