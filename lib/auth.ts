// var message = "Login Successfully";

// export const authenticateUser = async (email, password) => {
//   try {
//     const response = await fetch(
//       "https://andriraymond.github.io/json-repository/accounts.json"
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     const users = await response.json();

//     const user = users.find((user) => user.email === email);
//     if (user && user.password === password) {
//       console.log("Login successful");
//       return { success: true };
//     } else {
//       console.log("Login Failed");
//       return { success: false, error: "Invalid email or password" };
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//     console.log("Login Failed Error");
//     return { success: false, error: "Failed to authenticate" };
//   }
// };


// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return await bcrypt.hash(password, hashed);
}

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'});
}

export function verifyToken(token: string) {
  return jwt.sign(token, JWT_SECRET);
}

// lib/authenticateUser.ts (atau sesuaikan path-nya)
export async function authLogin(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return {
    success: res.ok,
    error: !res.ok ? data.error : null,
    user: res.ok ? data.user : null,
  };
}

// lib/registerUser.ts
// export async function authRegister(name: string, email: string, password: string) {
//   const res = await fetch("/api/auth/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   });

//   const data = await res.json();

//   return {
//     success: res.ok,
//     error: !res.ok ? data.error : null,
//     user: res.ok ? data.user : null,
//   };
// }

export async function authRegister(name: string, email: string, password: string) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  return {
    success: res.ok,
    error: !res.ok ? data.error : null,
    user: res.ok ? data.user : null,
  };
}
