"use client";
import React, { useEffect, useState } from "react";
import { fetchBanners } from "@/lib/api.js";
import styles from "./carousell.module.css";
import Image from "next/image";

interface slideData {
  ID: number;
  Image: string;
}

export default function CarousellComponent() {
  const [slideData, setSlideData] = useState<slideData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {});

  return (
    <div className={styles.container}>
      <img src='./assets/slide-login/slide-01.jpg' alt='' />
    </div>
  );
}
