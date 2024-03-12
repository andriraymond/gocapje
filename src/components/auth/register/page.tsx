"use client";
import { useEffect, useState } from "react";
import { authenticateUser } from "@/lib/auth.js";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
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

  const secondTogglePasswordVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error: registerError } = await authenticateUser(
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
      // setError(registerError);
      setError(registerError ?? "Unknown error occurred.");
    }
  };

  return (
    <>
      <form
        className={styles.form}
        id='register-form'
        onSubmit={handleRegister}>
        <div className={styles["title-container"]}>Sign Up</div>
        {error && <p className={styles["alert-register"]}>{error}</p>}
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
        <div className={styles.fieldPassword}>
          <input
            type={showPasswordConfirmation ? "text" : "password"}
            placeholder='Repeat Password'
            name='password-confirmation'
            id='password-confirmation'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {showPasswordConfirmation ? (
            <FaEyeSlash onClick={secondTogglePasswordVisibility} />
          ) : (
            <FaEye onClick={secondTogglePasswordVisibility} />
          )}
        </div>
        <button type='submit' id='btn-register'>
          Sign Up
        </button>
        <div className={styles["flex-line"]}>
          <div className={styles["span-line"]}>
            <div className={styles["left-line"]}></div>
            <span className='or'>or</span>
            <div className={styles["right-line"]}></div>
          </div>
        </div>
        <div className={styles["btn-register"]}>
          <button type='reset'>
            {" "}
            <img
              src='./assets/icon-google.webp'
              alt=''
              className={styles["icon-google"]}
            />
            Google
          </button>
          <button type='reset'>
            <img
              src='https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico?_nc_eui2=AeHz4CNewVqUH5ldeK3KvgRGrSiY817De8atKJjzXsN7xiZPQWQJHqRMVzmbNqYdFtHxZjIdpPsauTRVJEzMLdZU'
              alt=''
              className={styles["icon-google"]}
            />
            Facebook
          </button>
        </div>
        <div className={styles["btn-login"]}>
          <Link href='/login' className={styles.link}>
            {"Already have and account?"} <b>Log In</b>
          </Link>
        </div>
      </form>
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          <p>Register berhasil!</p>
        </div>
      )}
    </>
  );
}
