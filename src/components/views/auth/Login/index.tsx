import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
        setError("Email or Password is incorrect"); // Menetapkan pesan error
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or Password is incorrect"); // Menetapkan pesan error
    }
  };

  return (
    <AuthLayout
      title="Login to your account"
      link="/auth/register"
      linkText="Don't have an account? Sign Up "
    >
      <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
        <Input
          label={<HiOutlineMail />}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Input
          label={<HiOutlineKey />}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {/* Pesan error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Button
          disabled={isLoading}
          type="submit"
          variant="w-full p-2.5 rounded-lg bg-green-700 hover:bg-green-600 text-white"
        >
          {/* Tampilan tombol saat loading */}
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </Button>
        <hr />
      </form>
      {/* Tombol login dengan Google */}
      <Button
        type="button"
        onClick={() => signIn("google", { callbackUrl, redirect: false })}
        variant="w-full p-2.5 flex items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-600 text-white"
      >
        <span className="inline-flex">
          <Image
            src="/images/google.png"
            alt="google"
            className="w-6 h-6 mr-3"
            width={200}
            height={200}
          />
        </span>
        Login with Google
      </Button>
    </AuthLayout>
  );
};

export default LoginView;
