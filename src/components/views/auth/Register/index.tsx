import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import authServices from "@/services/auth";
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

    // Mendaftarkan akun dan menyimpan hasilnya ke result.
    const result = await authServices.registerAccount(data);

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
    <AuthLayout
      title="Register for your account"
      link="/auth/login"
      linkText="Already have an account? Sign In "
    >
      <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
        <Input
          label={<HiOutlineUser />}
          name="fullname"
          type="fullname"
          placeholder="Fullname"
          required
        />
        <Input
          label={<HiOutlineMail />}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Input
          label={<HiDevicePhoneMobile />}
          name="phone"
          type="phone"
          placeholder="Phone Number"
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
          variant="w-full p-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white"
        >
          {/* Tampilan tombol saat loading */}
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
