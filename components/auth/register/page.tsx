"use client";
import { useEffect, useState } from "react";
import { authRegister } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

export default function RegisterForm() {
  const [name, setName] = useState("");
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
    const { success, error: registerError } = await authRegister(
      name,
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
          placeholder='Name'
          name='name'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          </div>
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
            <FaEye onClick={togglePasswordVisibility} />
          ) : (
            // <FaEye onClick={togglePasswordVisibility} />
            <FaEyeSlash onClick={togglePasswordVisibility} />
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
            <FaEye onClick={secondTogglePasswordVisibility} />
          ) : (
            <FaEyeSlash onClick={secondTogglePasswordVisibility} />
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
            <CldImage
              src='gocapje/assets/logos/icon-google.svg'
              alt="google-logos"
              id="google-logo"
              width={20}
              height={20}
            />
            Google
          </button>

          <button type='reset'>
            <CldImage
              src="/gocapje/assets/logos/icon-facebook.svg"
              alt="facebook-logos"
              id="facebook-logo"
              width={20}
              height={20}
            />

            Facebook
          </button>
        </div>
        <div className={styles["btn-login"]}>
          <Link href='/login' className={styles.link}>
            {"Already have and account?"} <b>Login</b>
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
