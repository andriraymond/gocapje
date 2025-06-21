'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [url, setUrl] = useState('');
  const [namaFoto, setNamaFoto] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !namaFoto) return; // pastikan namaFoto diisi
  
    const formData = new FormData();
    formData.append('file', image);
    formData.append('namaFoto', namaFoto); // ← tambahkan ini
  
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
    setUrl(data.url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className='container container-content'>
      <main>
        <>
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">Upload Gambar</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Description"
              value={namaFoto}
              onChange={(e) => setNamaFoto(e.target.value)}
              className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100 cursor-pointer"
            />

            {imagePreview && (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full rounded-md shadow-md border mt-2"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </form>

          {url && (
            <div className="text-center space-y-2">
              <p className="text-green-600 font-medium">Upload berhasil:</p>
              <img
                src={url}
                alt="Uploaded"
                width="300"
                className="mx-auto rounded-md shadow-md border"
              />
            </div>
          )}
        </div>
        </>
      </main>
    </div>
  );
}