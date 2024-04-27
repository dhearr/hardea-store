import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiMenuAlt2 } from "react-icons/hi";

type PropTypes = {
  lists: {
    title: string;
    linkUrl: string;
    icon: React.ReactNode;
  }[];
  products?: string[];
};

const Sidebar = (props: PropTypes) => {
  const { lists, products } = props;
  const { pathname } = useRouter();

  return (
    <>
      <aside className="fixed left-0 top-0 z-0 h-screen w-64 -translate-x-full pt-20 transition-transform sm:translate-x-0">
        <div className="h-full overflow-y-auto px-3 pb-4">
          <h1 className="mb-8 text-center text-xl font-semibold text-black">
            All Product ({products?.length})
          </h1>
          <ul className="space-y-2.5 font-semibold">
            {lists?.map((list, index) => (
              <li key={index}>
                <Link
                  href={list.linkUrl}
                  className={`group p-2 ${
                    pathname === list.linkUrl
                      ? "rounded-md text-black"
                      : "text-[#626262]"
                  } rounded-md transition-all duration-200 hover:text-[#626262]`}
                >
                  {list.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
