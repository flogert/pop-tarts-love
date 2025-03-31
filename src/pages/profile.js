import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UploadImageForm from "@/components/uploadImageForm";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null); // State to manage the selected file

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetch(`/api/getProfile?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProfileData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching profile data:", err);
          setLoading(false);
        });
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const handleUpload = async (event) => {
    event.preventDefault();
  
    if (!file) {
      alert('Please choose a file to upload');
      return;
    }
  
    // Get presigned URL from the backend
    const response = await fetch('/api/getPresignedUrl', {
      method: 'POST',
      body: JSON.stringify({ fileName: file.name }),
    });
  
    const { url, fileName } = await response.json();
  
    // Upload file directly to S3 using the presigned URL
    const uploadResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });
  
    if (uploadResponse.ok) {
      console.log('File uploaded successfully');
      // Optionally, you can update the list of images after successful upload
      setImages((prevImages) => [...prevImages, fileName]);
    } else {
      console.error('Upload failed');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (!session)
    return (
      <div className="login-container">
        <p>Please log in to view your profile.</p>
        <Link href="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    );

  return (
    <div className="profile-container">
      <h2>Welcome, {session.user.firstName}!</h2>
      <div className="profile-content">
        <div className="profile-info">
          <p><strong>First Name:</strong> {profileData?.firstName || "Not provided"}</p>
          <p><strong>Last Name:</strong> {profileData?.lastName || "Not provided"}</p>
          <p><strong>Age:</strong> {profileData?.age || "Not provided"}</p>
          <p><strong>Location:</strong> {profileData?.location || "Not provided"}</p>
          <p><strong>Education:</strong> {profileData?.education || "Not provided"}</p>
          <p><strong>Marital Status:</strong> {profileData?.maritalStatus || "Not provided"}</p>
          <p><strong>About Me:</strong> {profileData?.bio || "Not provided"}</p>
        </div>

        {/* Image Upload Section */}
        <div className="image-upload-container">
          <h3>Upload Your Photos</h3>
          <UploadImageForm setFile={setFile} />
        </div>

        <div className="uploaded-images">
          <h3>Your Uploaded Images</h3>
          {images.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            <ul>
              {images.map((image, index) => (
                <li key={index}>{image}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="profile-actions">
        <Link href="/">
          <button className="home-button">Home</button>
        </Link>
        <Link href="/match">
          <button className="home-button">Match</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
