import styles from "./register.module.css";
import RegisterForm from "@/components/auth/register/page";
import HomeCarousell from "@/components/___carousell/carousell";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <HomeCarousell />
        {/* <form action=''></form>
        <RegisterForm /> */}
      </div>
      <div className={styles.wrapper}>
        <form action=''></form>
        <RegisterForm />
      </div>
    </div>
  );
}
