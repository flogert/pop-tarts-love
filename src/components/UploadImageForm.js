import React, { useState } from 'react';

const UploadImageForm = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);  // Track authentication status

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please choose a file to upload');
      return;
    }

    // Check if the user is authenticated (using NextAuth)
    const response = await fetch('/api/checkSession');
    const data = await response.json();
    
    if (data.error) {
      setIsAuthenticated(false);
      setUploadMessage('You must be logged in to upload images.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    setUploadMessage('Uploading...');

    try {
      const uploadResponse = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      if (uploadResponse.ok) {
        setUploadMessage('Upload successful!');
        setUploadSuccess(true);
      } else {
        setUploadMessage(`Upload failed: ${uploadData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadMessage('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        disabled={isUploading || !isAuthenticated} 
      />
      <button 
        type="submit" 
        disabled={isUploading || !file || !isAuthenticated}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadMessage && (
        <p style={{ color: uploadSuccess ? 'green' : 'red' }}>
          {uploadMessage}
        </p>
      )}
    </form>
  );
};

export default UploadImageForm;
