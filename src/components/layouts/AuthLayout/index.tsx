import Link from "next/link";

type PropTypes = {
  title?: string;
  linkText?: string;
  link: string;
  children: React.ReactNode;
};

const AuthLayout = (props: PropTypes) => {
  const { title, linkText, link, children } = props;

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-black/80 mb-2">
            Hardea<span className="text-sm">.Store</span>
          </h1>
        </Link>
        <div className="w-full bg-white rounded-lg border shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-black/80 md:text-2xl">
              {title}
            </h1>
            {children}
          </div>
        </div>
        <p className="text-black/60 mt-5">
          {linkText}
          <Link href={link} className="text-blue-500 hover:underline">
            here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthLayout;
