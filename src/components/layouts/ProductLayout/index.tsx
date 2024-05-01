import Sidebar from "@/components/views/products/Sidebar";
import { MdSpaceDashboard } from "react-icons/md";
import { styles } from "./ProductLayout";

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
      <section className={styles.productlayout}>
        <div className={styles.productlayout__main}>
          <div className={styles.productlayout__main__content}>{children}</div>
        </div>
      </section>
    </>
  );
};

export default ProductLayout;
