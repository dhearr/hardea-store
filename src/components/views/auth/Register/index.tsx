import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import { HiDevicePhoneMobile, HiOutlineUser } from "react-icons/hi2";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already exist");
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
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full p-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white"
              >
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
