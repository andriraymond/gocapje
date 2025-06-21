"use client";

import LoginForm from "components/auth/login/page";
import CarousellComponent from "components/common/carousell/carousell";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import React, { useEffect } from "react";

const LoginPage = () => {
  // Menggunakan useEffect untuk memastikan penggunaan useRouter hanya terjadi di sisi klien
  useEffect(() => {
    // const router = useRouter();
  }, []); // Efek ini hanya berjalan sekali saat komponen terpasang

  return (
    <div className='container'>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <form>
          </form>
          <LoginForm />
        </div>
        <div className={styles.wrapperSlide}>
          <CarousellComponent />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
