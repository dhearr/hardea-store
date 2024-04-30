import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { styles } from "./Navbar.module";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data } = useSession();
  const [image, setImage] = useState("/images/profile.jpg");

  useEffect(() => {
    const storedSessionString = localStorage.getItem("session");
    const storedSession = storedSessionString
      ? JSON.parse(storedSessionString)
      : null;

    const userImage = storedSession || "/images/profile.jpg";
    setImage(userImage);
  }, []);

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
        {data && (
          <Image
            src={image}
            alt="profile"
            width={40}
            height={40}
            className={styles.navbar__main__image}
          />
        )}
        <div>
          <Button
            type="button"
            onClick={() => (data ? handleSignOut() : signIn())}
            variant="bg-[#ededed] text-[#0a0a0a] hover:bg-[#d0d0d0] py-1 px-5 rounded-md transition-all"
          >
            {data ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
