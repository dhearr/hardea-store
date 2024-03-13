import Sidebar from "@/components/fragments/Sidebar";
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
];

const AdminLayout = (props: PropTypes) => {
  const { children } = props;

  return (
    <>
      <Sidebar lists={listSidebarItem} />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
