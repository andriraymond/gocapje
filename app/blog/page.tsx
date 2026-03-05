'use client';

import Link from 'next/link';
import { useEffect, useState } from "react";
import styles from "./blog.module.css";
import { CldImage } from "next-cloudinary";
import Loading from '../loading';

interface Photo {
  id: number;
  name: string;
  path: string;
}

export default function BlogPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPhotos(data);


      setTimeout(() => {
        setLoading(false);
      }, 1500);

    };
    fetchPhotos();
    //
  }, []);

  if (loading) return <Loading />;

  return (
    <div className='container container-content'>
      <main>
        <>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md">
          <div className={styles.grid}>
            {photos.map((photo) => (
              <div key={photo.id} className={styles.card}>
                <img
                width={500}
                height={330}
                src={photo.path}
                alt={photo.name}
                // crop="fill"
                />
                <p className={styles.name} href={photo.path}><a href={photo.path}>{photo.name}</a></p>
              </div>
            ))}
            </div>
        </div>
        </>
      </main>
    </div>

    //   <div className={styles.container}>
    //     <div className={styles.wrapper}>
    //     <div className={styles.grid}>
    //       {photos.map((photo) => (
    //         <div key={photo.id} className={styles.card}>
    //           <CldImage
    //             width="300"
    //             height="200"
    //             src={photo.path}
    //             alt={photo.name}
    //             crop="fill"
    //           />
    //           <p className={styles.name}>{photo.name}</p>
    //         </div>
    //       ))}
    //     </div>
    //     </div>
    //   </div>
    // </div>
  )
}