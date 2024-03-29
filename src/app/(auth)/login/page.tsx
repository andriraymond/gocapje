// "use client";
// import { useState, useEffect } from "react";
// import LoginForm from "@/components/auth/login/page";
// import CarousellComponent from "@/components/common/carousell/carousell";
// import styles from "./login.module.css";
// import Loading from "@/app/loading";

// const LoginPage = () => {
//   const [loading, setLoading] = useState(true); // State untuk menandai apakah sedang loading
//   const [cssLoaded, setCssLoaded] = useState(false); // State untuk menandai apakah CSS sudah dimuat

//   // Menggunakan useEffect untuk mengatur loading menjadi false setelah beberapa saat
//   useEffect(() => {
//     // Set timeout untuk mengubah loading menjadi false setelah 500ms
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);

//     // Membersihkan timeout saat komponen unmount atau efek berubah
//     return () => clearTimeout(timer);
//   }, []); // Efek ini hanya berjalan sekali saat komponen terpasang

//   // Menggunakan useEffect untuk menandai saat CSS selesai dimuat
//   useEffect(() => {
//     // Menandai bahwa CSS sudah dimuat setelah 100ms
//     const cssTimer = setTimeout(() => {
//       setCssLoaded(true);
//     }, 100);

//     // Membersihkan timeout saat komponen unmount atau efek berubah
//     return () => clearTimeout(cssTimer);
//   }, []);

//   return (
//     <div className={`container ${cssLoaded ? "container-loading" : ""}`}>
//       {/* Tampilkan konten hanya jika loading sudah selesai */}
//       {!loading && (
//         <div className={styles.container}>
//           <div className={styles.wrapper}>
//             <form>
//               {/* <button className={styles.github}>Login with Github</button> */}
//             </form>
//             <LoginForm />
//           </div>
//           <div className={styles.wrapperSlide}>
//             <CarousellComponent />
//           </div>
//         </div>
//       )}

//       {/* Tampilkan pesan loading saat loading masih berlangsung */}
//       {loading && (
//         <>
//           {/* <p>Loading...</p> */}
//           <Loading />
//         </>
//       )}
//     </div>
//   );
// };

// export default LoginPage;

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
    <div className='container'>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <form>
            {/* <form action={handleGithubLogin}> */}
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
