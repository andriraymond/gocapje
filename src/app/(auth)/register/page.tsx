import styles from "./register.module.css";
import RegisterForm from "@/components/auth/register/page";
import HomeCarousell from "@/components/___carousell/carousell";
import CarousellComponent from "@/components/common/carousell/carousell";

export default function RegisterPage() {
  return (
    <div className='container'>
      <div className={styles.container}>
        <div className={styles.wrapperSlide}>
          {/* <HomeCarousell />
        <CarousellComponent /> */}
          <CarousellComponent />
          {/* <form action=''></form>
        <RegisterForm /> */}
        </div>
        <div className={styles.wrapper}>
          <form action=''></form>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
