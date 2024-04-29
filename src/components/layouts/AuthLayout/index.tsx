import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  title?: string;
  linkText?: string;
  link: string;
  children: React.ReactNode;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const AuthLayout = (props: PropTypes) => {
  const { title, linkText, link, children, setToaster } = props;

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Link href="/">
          <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-black/80">
            Hardea<span className="text-sm">.Store</span>
          </h1>
        </Link>
        <div className="w-full rounded-lg border bg-white shadow-lg sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-black/80 md:text-2xl">
              {title}
            </h1>
            {children}
          </div>
        </div>
        <p className="mt-5 text-black/60">
          {linkText}{" "}
          <Link href={link} className="text-blue-500 hover:underline">
            here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthLayout;
