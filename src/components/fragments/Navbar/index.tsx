import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { styles } from "./Navbar.module";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const [image, setImage] = useState("/images/profile.jpg");

  useEffect(() => {
    const storedSessionString = localStorage.getItem("session");
    const storedSession = storedSessionString
      ? JSON.parse(storedSessionString)
      : null;

    const userImage =
      storedSession || sessionData?.user?.image || "/images/profile.jpg";
    setImage(userImage);
  }, [sessionData]);

  const handleSignOut = () => {
    localStorage.removeItem("session");
    signOut();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <h1 className={styles.logo__title}>
            Hardea<span className="text-sm">.Store</span>
          </h1>
        </Link>
      </div>
      <div className={styles.navbar__main}>
        {sessionData && (
          <Image
            src={image}
            alt="profile"
            width={40}
            height={40}
            className={styles.navbar__main__image}
          />
        )}
        <Button
          type="button"
          onClick={() => (sessionData ? handleSignOut() : signIn())}
          variant={styles.navbar__main__button}
        >
          {sessionData ? "Logout" : "Login"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
