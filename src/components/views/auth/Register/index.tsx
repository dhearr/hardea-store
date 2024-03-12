import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import { HiDevicePhoneMobile, HiOutlineUser } from "react-icons/hi2";

const RegisterView = () => {
  // State untuk menangani loading, error, dan router
  const [isLoading, setIsLoading] = useState(false); // State untuk menangani status loading
  const [error, setError] = useState(""); // State untuk menangani pesan error
  const { push } = useRouter(); // Menggunakan hook useRouter untuk mendapatkan objek router

  // Fungsi untuk menangani proses registrasi
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah reload halaman saat submit form
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement; // Mengakses form yang sedang di-submit
    const data = {
      fullname: form.fullname.value, // Mengambil nilai fullname dari input fullname
      email: form.email.value, // Mengambil nilai email dari input email
      phone: form.phone.value, // Mengambil nilai phone dari input phone
      password: form.password.value, // Mengambil nilai password dari input password
    };

    // Melakukan fetch ke API untuk registrasi pengguna baru
    const result = await fetch("/api/users/register", {
      method: "POST", // Metode request POST
      headers: {
        "Content-Type": "application/json", // Tipe konten JSON
      },
      body: JSON.stringify(data), // Mengubah objek data menjadi JSON
    });

    // Jika status respons 200, berarti registrasi berhasil
    if (result.status === 200) {
      form.reset(); // Mengosongkan form
      setIsLoading(false);
      push("/auth/login"); // Redirect ke halaman login
    } else {
      setIsLoading(false);
      setError("Email already exist"); // Menetapkan pesan error
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg border shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-black/80 md:text-2xl">
              Register for your account
            </h1>
            <hr />
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="input input-bordered bg-slate-50 text-black/70 flex items-center gap-2">
                  <HiOutlineUser />
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    className="grow placeholder:text-black/70"
                    placeholder="Fullname"
                  />
                </label>
              </div>
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
                  <HiDevicePhoneMobile />
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="grow placeholder:text-black/70"
                    placeholder="Phone Number"
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
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
        <p className="text-black/60 mt-5">
          already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterView;
