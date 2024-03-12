import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  // Menggunakan hook useSession untuk mendapatkan data sesi pengguna.
  const { data } = useSession();

  return (
    <nav className="sticky z-10 bg-black backdrop-blur-lg top-0 flex py-2.5 px-16 items-center justify-between border-b-2 border-[#333333] back">
      <div className="flex items-center h-100">
        <Link href="/">
          <h1 className="text-3xl font-bold mr-12 text-[#ededed]">
            Hardea<span className="text-sm">.Store</span>
          </h1>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center">
          <Button
            type="button"
            onClick={() => (data ? signOut() : signIn())}
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

{
  /* <button onClick={() => (data ? signOut() : signIn())} className="btn">
          {data ? "Logout" : "Login"}
        </button>
      </div> */
}
