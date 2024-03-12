"use client";
import React from "react";
import { useState } from "react";
import { authenticateUser } from "@/lib/auth.js";
import { useRouter } from "next/navigation";
import { FormEvent, MouseEvent } from "react";
import styles from "./register.module.css";
import Link from "next/link";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error: RegisterError } = await authenticateUser(
      email,
      password
    );
    if (success) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      if (RegisterError) {
        setError(RegisterError);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <button onClick={handleGoBack}>Kembali</button>
      {error && <p className={styles["alert-register"]}>{error}</p>}
      <input
        type='text'
        placeholder='Full Name'
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='text'
        placeholder='Phone Number'
        name='phone'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password Confirmation'
        name='passwordConfirmation'
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button type='submit'>Register</button>
      {/* {error && <p className='alert-Register'>{error}</p>} */}
      <Link href='/login'>
        {"Already have an account?"} <b>Log In</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
