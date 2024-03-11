import { useEffect, useState } from "react";
import { authenticateUser } from "@/lib/auth.js";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Session
  const [session, setSession] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const sessionData = localStorage.getItem("session");
    if (sessionData) {
      const { session, isAdmin } = JSON.parse(sessionData);
      setSession(session);
      setIsAdmin(isAdmin);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error: loginError } = await authenticateUser(
      email,
      password
    );
    if (success) {
      setSession(true);
      setShowSuccessMessage(true);

      localStorage.setItem(
        "session",
        JSON.stringify({ session: true, isAdmin })
      );
      router.push("/");
    } else {
      // setError(loginError);
      setError(loginError ?? "Unknown error occurred.");
    }
  };

  return (
    <>
      <form className={styles.form} id='login-form' onSubmit={handleLogin}>
        <div className={styles["title-container"]}>Log In</div>
        {error && <p className={styles["alert-login"]}>{error}</p>}
        <div className={styles.fieldEmail}>
          <input
            type='text'
            placeholder='Email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.fieldPassword}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash onClick={togglePasswordVisibility} />
          ) : (
            <FaEye onClick={togglePasswordVisibility} />
          )}
        </div>
        <button type='submit' id='btn-login'>
          Login
        </button>
        <div className={styles["btn-forget-password"]}>
          <Link href='/forgot-password' className={styles.link}>
            <b>Forgot Password?</b>
          </Link>
        </div>
        <div className={styles["btn-register"]}>
          <Link href='/register' className={styles.link}>
            {"Don't have an account?"} <b>Sign Up</b>
          </Link>
        </div>
      </form>
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          <p>Login berhasil!</p>
        </div>
      )}
    </>
  );
};

export default LoginForm;

// import { useEffect, useState } from "react";
// import { authenticateUser } from "@/lib/auth.js";
// import { useRouter } from "next/navigation";
// import { FormEvent, MouseEvent } from "react";
// import styles from "./login.module.css";
// import Link from "next/link";

// // add component icons
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { register } from "module";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [showPassword, setShowPassword] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const [session, setSession] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     // Memulihkan sesi saat komponen dimuat
//     const sessionData = localStorage.getItem("session");
//     if (sessionData) {
//       const { session, isAdmin } = JSON.parse(sessionData);
//       setSession(session);
//       setIsAdmin(isAdmin);
//       console.log("Session 01");
//     }
//   }, []);

//   const handleGoBack = () => {
//     router.back();
//   };

//   const simpanSesi = () => {
//     localStorage.setItem("session", JSON.stringify({ session, isAdmin }));
//     console.log("Session saved");
//   };

//   // function to show visibility of the Password
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     // e.preventDefault();
//     // const { success, error: loginError } = await authenticateUser(
//     //   email,
//     //   password
//     // );
//     // if (success) {
//     //   // localStorage.setItem("isLoggedIn", "true");
//     //   setSession(true);
//     //   simpanSesi();
//     //   console.log("session saved session is true");
//     //   router.push("/");
//     // } else {
//     //   if (loginError) {
//     //     setError(loginError);
//     //   }
//     // }
//   };

//   return (
//     <form className={styles.form} onSubmit={handleLogin}>
//       {/* <button onClick={handleGoBack}>Kembali</button> */}
//       <div className={styles["title-container"]}>Log In</div>

//       {error && <p className={styles["alert-login"]}>{error}</p>}
//       <div className={styles.fieldEmail}>
//         <input
//           type='text'
//           placeholder='Email'
//           name='email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className={styles.fieldPassword}>
//         <input
//           // type='password'
//           type={showPassword ? "text" : "password"}
//           placeholder='Password'
//           name='password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {showPassword ? (
//           <FaEyeSlash onClick={togglePasswordVisibility} />
//         ) : (
//           <FaEye onClick={togglePasswordVisibility} />
//         )}
//       </div>
//       <button type='submit'>Login</button>
//       {/* {error && <p className='alert-login'>{error}</p>} */}
//       <div className={styles["btn-forget-password"]}>
//         <Link href='/forgot-password' className={styles.link}>
//           <b>Forgot Password?</b>
//         </Link>
//       </div>
//       <div className={styles["btn-register"]}>
//         <Link href='/register' className={styles.link}>
//           {"Don't have an account?"} <b>Sign Up</b>
//         </Link>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;
