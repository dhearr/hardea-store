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
};

const Sidebar = (props: PropTypes) => {
  const { lists } = props;
  const { pathname } = useRouter();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[#000000] border-b-[1px] border-[#333333]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="flex items-center p-2 text-3xl text-gray-500 rounded-lg sm:hidden"
              >
                <span className="inline-flex">
                  <HiMenuAlt2 />
                </span>
              </button>
              <Link href="/">
                <h1 className="hidden sm:block text-3xl ml-3 font-bold text-[#ededed]">
                  Hardea<span className="text-sm">.Store</span>
                </h1>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <Button
                    type="button"
                    onClick={() => signOut()}
                    variant="bg-[#ededed] text-[#0a0a0a] hover:bg-[#d0d0d0] py-1 px-5 rounded-md transition-all"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-[#000000] border-r-[1px] border-[#333333] sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#000000]">
          <ul className="space-y-2.5 font-semibold">
            {lists?.map((list, index) => (
              <li key={index}>
                <Link
                  href={list.linkUrl}
                  className={`group flex items-center p-2 ${
                    pathname === list.linkUrl
                      ? "text-white bg-[#161616] rounded-md"
                      : "text-[#626262]"
                  } transition-all duration-200 hover:text-white hover:bg-[#161616] rounded-md`}
                >
                  <div
                    className={`flex items-center justify-center text-[22px] w-6 h-6 ${
                      pathname === list.linkUrl
                        ? "text-white"
                        : "text-[#626262]"
                    } transition-all duration-200 group-hover:text-white`}
                  >
                    {list.icon}
                  </div>
                  <span className="ml-3">{list.title}</span>
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
