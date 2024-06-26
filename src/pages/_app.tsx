import Navbar from "@/components/fragments/Navbar";
import Toaster from "@/components/ui/Toaster";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const roboto = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const disabledNavbar = ["auth", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  const [toaster, setToaster] = useState<any>({});

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  }, [toaster]);

  return (
    <SessionProvider session={session}>
      <div className={roboto.className}>
        {!disabledNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        <Component {...pageProps} setToaster={setToaster} />
        {Object.keys(toaster).length > 0 && (
          <Toaster
            variant={toaster.variant}
            message={toaster.message}
            setToaster={setToaster}
          />
        )}
      </div>
    </SessionProvider>
  );
}
