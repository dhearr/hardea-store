import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { styles } from "./Navbar.module";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaShop } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { PiHandbagBold } from "react-icons/pi";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const [image, setImage] = useState("/images/profile.jpg");
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isScrollY, setIsScrollY] = useState(0);

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

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > isScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      setIsScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [isScrollY]);

  const header = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Find a Store",
      link: "/",
    },
    {
      name: "Help",
      link: "/",
    },
    {
      name: sessionData ? "Sign Out" : "Sign In",
      action: sessionData ? handleSignOut : signIn,
    },
  ];

  const navigasi = [
    {
      name: "New & Fetured",
      link: "/",
    },
    {
      name: "Men",
      link: "/",
    },
    {
      name: "Womens",
      link: "/",
    },
    {
      name: "Kids",
      link: "/",
    },
    {
      name: "Sale",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
  ];

  return (
    <>
      <nav
        className={`${isNavbarVisible ? "top-0" : "-top-32"} duration-350 fixed w-full transition-all`}
      >
        <div
          className={`${isScrollY === 0 ? "block" : "hidden"} flex w-full items-center justify-between bg-[#F5F5F5] px-16 py-2`}
        >
          <h1 className="text-3xl text-[#0a0a0a]">
            <FaShop />
          </h1>
          <ul className="flex">
            {header.map((item, index) => (
              <li
                key={index}
                className="transform-gpu text-xs font-semibold tracking-wide transition-all hover:text-black/50"
              >
                {item.link ? (
                  <Link href={item.link}>{item.name}</Link>
                ) : (
                  <Button
                    type="button"
                    onClick={item.action}
                    variant="bg-transparent hover:text-black/50 text-xs font-semibold tracking-wide"
                  >
                    {item.name}
                  </Button>
                )}
                {index < header.length - 1 && (
                  <span className="mx-3 border-l border-black"></span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <Link href="/">
              <h1 className={styles.logo__title}>
                Hardea<span className="text-sm">.Store</span>
              </h1>
            </Link>
          </div>
          <div>
            <ul className="flex gap-10">
              {navigasi.map((item, index) => (
                <li
                  key={index}
                  className="transform-gpu text-lg font-semibold tracking-wide transition-all hover:text-black/50"
                >
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.navbar__main}>
            <div className="relative">
              <input
                type="text"
                className="w-[150px] rounded-full bg-[#F5F5F5] p-2.5 pl-12 hover:bg-[#c8c8c8] focus:outline-none"
                placeholder="Search"
              />
              <label className="absolute left-0 top-0 flex items-center rounded-full bg-[#F5F5F5] p-2.5">
                <FiSearch className="text-2xl" />
              </label>
            </div>
            <div className="flex gap-1">
              <MdFavoriteBorder className="rounded-full p-2 text-5xl text-black hover:bg-[#c8c8c8]" />
              <PiHandbagBold className="rounded-full p-2 text-5xl text-black hover:bg-[#c8c8c8]" />
            </div>
            {sessionData && (
              <Image
                src={image}
                alt="profile"
                width={40}
                height={40}
                className={styles.navbar__main__image}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
