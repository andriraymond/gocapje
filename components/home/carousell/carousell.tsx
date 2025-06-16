"use client";
import React, { useEffect, useState } from "react";
import { fetchBanners } from "@/lib/api.js";
import Image from "next/image";
import styles from "./carousell.module.css";

interface BannerData {
  ID: string;
  Image: string;
}

export default function BannerComponent() {
  const [bannerData, setBannerData] = useState<BannerData[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBannerData() {
      try {
        const response = await fetchBanners();
        setBannerData(response.Data);
      } catch (error) {
        console.error("Gagal mengambil data Banner", error);
      } finally {
        setLoading(false); // Setelah fetching selesai, berhenti loading
      }
    }
    fetchBannerData();

    const interval = setInterval(() => {
      setCurrentBanner(
        (currentBanner) => (currentBanner + 1) % bannerData.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [bannerData.length]);

  return (
    <div className={styles["container-banner"]}>
      {loading ? ( // Tampilkan skeleton saat masih loading
        <div
          className={styles["container-banner-skeleton"]}
          id='skeleton'></div>
      ) : (
        // <div className='skeleton animate-pulse'></div>
        <>
          <div className={styles["container-banner"]}>
            <a href={bannerData[currentBanner].Image}>
              <img
                src={bannerData[currentBanner].Image}
                alt={bannerData[currentBanner].ID}
              />
              {/* <Image
                src={bannerData[currentBanner].Image}
                alt={bannerData[currentBanner].ID.toString()}
                width={1180}
                height={296}
              /> */}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
