import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import authServices from "@/services/auth";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import { HiDevicePhoneMobile, HiOutlineUser } from "react-icons/hi2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { styles } from "./Register.module";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const RegisterView = ({ setToaster }: PropTypes) => {
  // State untuk menangani loading, dan router
  const [isLoading, setIsLoading] = useState(false); // State untuk menangani status loading
  const [showPassword, setShowPassword] = useState(false); // State untuk menampilkan password
  const { push } = useRouter(); // Menggunakan hook useRouter untuk mendapatkan objek router

  // Fungsi untuk menangani proses registrasi
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah reload halaman saat submit form
    setIsLoading(true);
    const form = event.target as HTMLFormElement; // Mengakses form yang sedang di-submit
    const data = {
      fullname: form.fullname.value, // Mengambil nilai fullname dari input fullname
      email: form.email.value, // Mengambil nilai email dari input email
      phone: form.phone.value, // Mengambil nilai phone dari input phone
      password: form.password.value, // Mengambil nilai password dari input password
    };

    try {
      // Mendaftarkan akun dan menyimpan hasilnya ke result.
      const result = await authServices.registerAccount(data);

      // Jika status respons 200, berarti registrasi berhasil
      if (result.status === 200) {
        form.reset(); // Mengosongkan form
        setIsLoading(false);
        push("/auth/login"); // Redirect ke halaman login
        setToaster({
          variant: "success",
          message: "Register success, please login",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Register failed, please call support",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Register failed, email already exists",
      });
    }
  };

  return (
    <AuthLayout
      title="Register for your account"
      link="/auth/login"
      linkText="Already have an account? Sign In"
      setToaster={setToaster}
    >
      <form className={styles.form} onSubmit={handleRegister}>
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
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          toggle={
            showPassword ? (
              <FaEye onClick={() => setShowPassword(false)} />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(true)} />
            )
          }
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant={styles.form__button}
        >
          {/* Tampilan tombol saat loading */}
          {isLoading ? (
            <span className={styles.form__button__loading}></span>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
