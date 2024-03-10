import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./links.module.css";
import NavLink from "./navLink/navLinks";
import { useRouter } from "next/navigation";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({}) => {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Memulihkan sesi saat komponen dimuat
    const sessionData = localStorage.getItem("session");
    if (sessionData) {
      const { session, isAdmin } = JSON.parse(sessionData);
      setSession(session);
      setIsAdmin(isAdmin);
    }
  }, []);

  // Fungsi untuk menyimpan sesi ke localStorage
  const simpanSesi = () => {
    localStorage.setItem("session", JSON.stringify({ session, isAdmin }));
  };

  // Fungsi untuk menghapus sesi dari localStorage
  const hapusSesi = () => {
    localStorage.removeItem("session");
    setSession(false);
    setIsAdmin(false);
  };

  const handleLogin = () => {
    setSession(true);
    simpanSesi();
  };

  const handleLogout = () => {
    hapusSesi();
    router.push("/login");
    console.log("Berhasil logout");
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button
              type='button'
              className={styles.logout}
              onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink
            item={{ title: "Login", path: "/login" }}
            onClick={handleLogin}
          />
        )}
      </div>
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}>
        Menu
      </button>
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import styles from "./links.module.css";
// import NavLink from "./navLink/navLinks";

// const links = [
//   {
//     title: "Home",
//     path: "/",
//   },
//   {
//     title: "About",
//     path: "/about",
//   },
//   {
//     title: "Contact",
//     path: "/contact",
//   },
//   {
//     title: "Blog",
//     path: "/blog",
//   },
// ];

// const Links = ({}) => {
//   const [open, setOpen] = useState(false);
//   const [session, setSession] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   // TEMPORARY FOR DUMMY
//   //   const session = false;
//   //   const isAdmin = false;

//   // To make session in localStorage
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

//   // Fungsi untuk menyimpan sesi ke localStorage
//   const simpanSesi = () => {
//     localStorage.setItem("session", JSON.stringify({ session, isAdmin }));
//     console.log("Session saved");
//   };

//   // Fungsi untuk menghapus sesi dari localStorage
//   const hapusSesi = () => {
//     localStorage.removeItem("session");
//     setSession(false);
//     setIsAdmin(false);
//   };

//   const handleLogin = () => {
//     setSession(true);
//     simpanSesi();
//   };

//   const handleLogout = () => {
//     hapusSesi();
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.links}>
//         {links.map((link) => (
//           // <Link href={link.path} key={link.title} >{link.title}</Link>
//           <NavLink item={link} key={link.title} />
//         ))}
//         {session ? (
//           <>
//             {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
//             <button type='button' className={styles.logout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <NavLink item={{ title: "Login", path: "/login" }} />
//         )}
//       </div>
//       <button
//         className={styles.menuButton}
//         onClick={() => setOpen((prev) => !prev)}>
//         Menu
//       </button>
//       {open && (
//         <div className={styles.mobileLinks}>
//           {/* <div className="hamburger-inner"> */}
//           {links.map((link) => (
//             <NavLink item={link} key={link.title} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Links;
