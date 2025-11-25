import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UploadImageForm from "@/components/UploadImageForm";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null); // State to manage the selected file

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // Fetch profile data from the database
      fetch(`/api/getProfile?userId=${session.user.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch profile data");
          }
          return res.json();
        })
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
      alert("Please choose a file to upload");
      return;
    }

    // Get presigned URL from the backend
    const response = await fetch("/api/getPresignedUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: file.name }),
    });

    const { url, fileName } = await response.json();

    // Upload file directly to S3 using the presigned URL
    const uploadResponse = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (uploadResponse.ok) {
      console.log("File uploaded successfully");
      // Optionally, you can update the list of images after successful upload
      setImages((prevImages) => [...prevImages, fileName]);
    } else {
      console.error("Upload failed");
    }
  };

  if (loading) return <div className="text-center text-xl mt-12">Loading...</div>;

  if (!session)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl">Please log in to view your profile.</p>
        <Link href="/login">
          <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors">Login</button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-purple-800 font-['Agbalumo']">Welcome, {profileData?.firstName || "User"}!</h2>
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2 text-sm md:text-base">
          <p><strong className="text-purple-700">First Name:</strong> {profileData?.firstName || "Not provided"}</p>
          <p><strong className="text-purple-700">Last Name:</strong> {profileData?.lastName || "Not provided"}</p>
          <p><strong className="text-purple-700">Age:</strong> {profileData?.age || "Not provided"}</p>
          <p><strong className="text-purple-700">Location:</strong> {profileData?.location || "Not provided"}</p>
          <p><strong className="text-purple-700">Education:</strong> {profileData?.education || "Not provided"}</p>
          <p><strong className="text-purple-700">Marital Status:</strong> {profileData?.maritalStatus || "Not provided"}</p>
          <p><strong className="text-purple-700">About Me:</strong> {profileData?.bio || "Not provided"}</p>
        </div>

        {/* Image Upload Section */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Upload Your Photos</h3>
          <UploadImageForm setFile={setFile} />
          <button 
            onClick={handleUpload} 
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 transition-colors mt-2 w-full md:w-auto text-sm"
          >
            Upload
          </button>
          
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Your Uploaded Images</h3>
            {images.length === 0 ? (
              <p className="text-gray-500 italic text-sm">No images uploaded yet.</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <li key={index} className="list-none">
                    {/* Placeholder for actual image URL since we only have filename here */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 text-xs text-gray-500 overflow-hidden p-1 text-center">
                        {image}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Link href="/">
          <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors shadow-lg text-sm">Home</button>
        </Link>
        <Link href="/match">
          <button className="bg-pink-500 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-600 transition-colors shadow-lg text-sm">Match</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
