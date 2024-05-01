import Sidebar from "@/components/fragments/Sidebar";
import {
  MdAccountCircle,
  MdShoppingCart,
  MdSpaceDashboard,
} from "react-icons/md";
import { styles } from "./MemberLayout.module";

type PropTypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    linkUrl: "/member",
    icon: <MdSpaceDashboard />,
  },
  {
    title: "Orders",
    linkUrl: "/member/orders",
    icon: <MdShoppingCart />,
  },
  {
    title: "Profile",
    linkUrl: "/member/profile",
    icon: <MdAccountCircle />,
  },
];

const MemberLayout = (props: PropTypes) => {
  const { children } = props;

  return (
    <>
      <Sidebar lists={listSidebarItem} />
      <section className={styles.memberlayout}>
        <div className={styles.memberlayout__main}>
          <div className={styles.memberlayout__main__content}>{children}</div>
        </div>
      </section>
    </>
  );
};

export default MemberLayout;
