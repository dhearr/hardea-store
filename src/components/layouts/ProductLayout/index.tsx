import Sidebar from "@/components/views/products/Sidebar";
import { FaUsers } from "react-icons/fa";
import { MdShoppingBag, MdSpaceDashboard } from "react-icons/md";

type PropTypes = {
  children: React.ReactNode;
  products: string[];
};

const listSidebarItem = [
  {
    title: "Products",
    linkUrl: "/products",
    icon: <MdSpaceDashboard />,
  },
];

const ProductLayout = (props: PropTypes) => {
  const { children, products } = props;

  return (
    <>
      <Sidebar lists={listSidebarItem} products={products} />
      <section className="min-h-screen bg-[#111111]">
        <div className="p-4 sm:ml-64">
          <div className="mt-14 p-4">{children}</div>
        </div>
      </section>
    </>
  );
};

export default ProductLayout;
