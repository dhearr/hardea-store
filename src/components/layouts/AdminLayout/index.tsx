import Sidebar from "@/components/fragments/Sidebar";
import { FaUsers } from "react-icons/fa";
import { MdShoppingBag, MdSpaceDashboard } from "react-icons/md";
import { styles } from "./AdminLayout.module";

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
      <section className={styles.adminlayout}>
        <div className={styles.adminlayout__main}>
          <div className={styles.adminlayout__main__content}>{children}</div>
        </div>
      </section>
    </>
  );
};

export default AdminLayout;
