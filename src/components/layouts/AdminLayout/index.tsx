import Sidebar from "@/components/fragments/Sidebar";
import { FaUsers } from "react-icons/fa";
import { MdShoppingBag, MdSpaceDashboard } from "react-icons/md";

type PropTypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    linkUrl: "/admin",
    icon: <MdSpaceDashboard />,
  },
  {
    title: "Products",
    linkUrl: "/admin/products",
    icon: <MdShoppingBag />,
  },
  {
    title: "Users",
    linkUrl: "/admin/users",
    icon: <FaUsers />,
  },
];

const AdminLayout = (props: PropTypes) => {
  const { children } = props;

  return (
    <>
      <Sidebar lists={listSidebarItem} />
      <section className="bg-[#111111] min-h-screen">
        <div className="p-4 sm:ml-64">
          <div className="p-4 mt-14">{children}</div>
        </div>
      </section>
    </>
  );
};

export default AdminLayout;
