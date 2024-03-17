"use client";
import React, { useEffect, useState } from "react";
import { handleGithubLogin } from "@/lib/action";
import LoginForm from "@/components/auth/login/page";
import CarousellComponent from "@/components/common/carousell/carousell";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Loading from "@/app/loading";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Menggunakan useEffect untuk memastikan penggunaan useRouter hanya terjadi di sisi klien
  useEffect(() => {
    setIsLoading(false);
  }, []); // Efek ini hanya berjalan sekali saat komponen terpasang

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className='container'>
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
    </div>
  );
};

export default LoginPage;
