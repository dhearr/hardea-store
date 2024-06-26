import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import { styles } from "./Login.module";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const LoginView = ({ setToaster }: PropTypes) => {
  // State untuk menangani loading, dan router
  const [isLoading, setIsLoading] = useState(false); // State untuk menangani status loading
  const [showPassword, setShowPassword] = useState(false); // State untuk menampilkan password
  const { push, query } = useRouter(); // Menggunakan hook useRouter untuk mendapatkan informasi tentang router

  // Mendapatkan callbackUrl dari query atau default "/"
  const callbackUrl: any = query.callbackUrl || "/";

  // Fungsi untuk menangani proses login
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah reload halaman saat submit form
    setIsLoading(true);
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
        setToaster({
          variant: "success",
          message: "Login success, Wellcome",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Email or Password is incorrect",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Login failed, please call support",
      });
    }
  };

  return (
    <AuthLayout
      title="Login to your account"
      link="/auth/register"
      linkText="Don't have an account? Sign Up "
      setToaster={setToaster}
    >
      <form className={styles.form} onSubmit={handleLogin}>
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
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          toggle={
            showPassword ? (
              <FaEye onClick={() => setShowPassword(false)} />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(true)} />
            )
          }
          required
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant={styles.form__button}
        >
          {/* Tampilan tombol saat loading */}
          {isLoading ? (
            <span className={styles.form__button__laoding}></span>
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
        variant={styles.button__google}
      >
        <span className="inline-flex">
          <Image
            src="/images/google.png"
            alt="google"
            className={styles.button__google__icon}
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
