"use client";
import type { Metadata } from "next";
import React, { useState } from "react";
import styles from "./home.module.css";

// export const metadata: Metadata = {
//   title: "Upload Image | Gocapje",
//   description: "Upload page",
// };

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <main>
      <div className="container container-content">
        <div>
          <h1>Upload Gambar</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={(e) => {
              if (e.target.files) setImage(e.target.files[0]);
              }} />
              <button type="submit">Upload</button>
          </form>
          
          {url && (
            <div>
              <p>Upload berhasil:</p>
              <img src={url} alt="Uploaded" width="300" />
            </div>
            )}
        </div>
          {/* Optional UI Components */}
          {/* <HomeCarousell /> */}
          {/* <BannerComponent /> */}
          {/* <PromoCard /> */}
          {/* <CategoryComponent /> */}
          {/* <Products /> */}
      </div>
    </main>
  );
}
