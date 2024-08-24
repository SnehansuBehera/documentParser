import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import DocumentAnalysis from './components/DocumentAnalysis';

function App() {
  const [filename, setFilename] = useState('');

  return (
    <div className="App">
      <h1>AI-Powered Legal Document Analyzer</h1>
      <UploadForm setFilename={setFilename} />
      {filename && <DocumentAnalysis filename={filename} />}
    </div>
  );
}

export default App;
