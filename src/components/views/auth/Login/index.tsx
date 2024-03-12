import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";

const LoginView = () => {
  // State untuk menangani loading, error, dan router
  const [isLoading, setIsLoading] = useState(false); // State untuk menangani status loading
  const [error, setError] = useState(""); // State untuk menangani pesan error
  const { push, query } = useRouter(); // Menggunakan hook useRouter untuk mendapatkan informasi tentang router

  // Mendapatkan callbackUrl dari query atau default "/"
  const callbackUrl: any = query.callbackUrl || "/";

  // Fungsi untuk menangani proses login
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah reload halaman saat submit form
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement; // Mengakses form yang sedang di-submit
    try {
      // Melakukan sign in dengan credential (email dan password)
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value, // Mengambil nilai email dari input email
        password: form.password.value, // Mengambil nilai password dari input password
        callbackUrl, // Menggunakan callbackUrl yang telah ditentukan
      });

      // Jika tidak terdapat error, reset form dan redirect ke callbackUrl
      if (!res?.error) {
        form.reset(); // Mengosongkan form
        setIsLoading(false);
        push(callbackUrl); // Redirect ke callbackUrl
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect"); // Menetapkan pesan error
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect"); // Menetapkan pesan error
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg border shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-black/80 md:text-2xl">
              Login to your account
            </h1>
            <hr />
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="input input-bordered bg-slate-50 text-black/70 flex items-center gap-2">
                  <HiOutlineMail />
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="grow placeholder:text-black/70"
                    placeholder="Email"
                  />
                </label>
              </div>
              <div>
                <label className="input input-bordered bg-slate-50 text-black/70 flex items-center gap-2">
                  <HiOutlineKey />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="grow placeholder:text-black/70"
                    placeholder="Password"
                  />
                </label>
              </div>
              <hr />
              {/* Pesan error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full p-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white"
              >
                {/* Tampilan tombol saat loading */}
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
        <p className="text-black/60 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginView;
