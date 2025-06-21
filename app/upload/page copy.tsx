"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function Page() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Upload Image Preview</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {imagePreview && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            style={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
          />
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <ReactPlayer
          url="https://res.cloudinary.com/gocapje/video/upload/q_auto/f_auto:video/v1/andriraymond/videos/Anne_Marie_-_Ciao_Adios_Radio_1_s_Big_Weekend_2017_ihfo0p?_s=vp-1.11.1"
          controls
          width="100%"
          height="auto"
        />
      </div>
    </div>
  );
}
