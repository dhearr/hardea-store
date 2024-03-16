import Sidebar from "@/components/fragments/Sidebar";
import {
  MdAccountCircle,
  MdShoppingCart,
  MdSpaceDashboard,
} from "react-icons/md";

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
      <section className="bg-[#111111] min-h-screen">
        <div className="p-4 sm:ml-64">
          <div className="p-4 mt-14">{children}</div>
        </div>
      </section>
    </>
  );
};

export default MemberLayout;
