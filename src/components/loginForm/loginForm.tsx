import { useState } from 'react';
import { authenticateUser } from '@/lib/auth.js';
import { useRouter } from 'next/navigation'
import styles from "./loginForm.module.css";
import Link from "next/link";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { success, error } = await authenticateUser(email, password);
        if (success) {
            localStorage.setItem('isLoggedIn', 'true');
            router.push('/');
        } else {
            setError(error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            {error && <p className={styles["alert-login"]}>{error}</p>}
            <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {/* {error && <p className='alert-login'>{error}</p>} */}
            <Link href="/register">
                {"Don't have an account?"} <b>Register</b>
            </Link>
        </form>
    );
};

export default LoginForm;