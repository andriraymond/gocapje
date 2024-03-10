"use client";
import { handleGithubLogin } from "@/lib/action";
import LoginForm from "@/components/auth/login/page";
import CarousellComponent from "@/components/common/carousell/carousell";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import React, { useEffect } from "react";

const LoginPage = () => {
  // Menggunakan useEffect untuk memastikan penggunaan useRouter hanya terjadi di sisi klien
  useEffect(() => {
    // const router = useRouter();
  }, []); // Efek ini hanya berjalan sekali saat komponen terpasang

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          {/* <button className={styles.github}>Login with Github</button> */}
        </form>
        <LoginForm />
      </div>
      <div className={styles.wrapperSlide}>
        <CarousellComponent />
      </div>
    </div>
  );
};

export default LoginPage;
