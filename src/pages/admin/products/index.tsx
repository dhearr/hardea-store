import ProductsAdminView from "@/components/views/admin/Products";
import usersServices from "@/services/users";
import { useEffect, useState } from "react";

const AdminProductsPage = ({ setToaster }: any) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await usersServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <ProductsAdminView usersData={users} setToaster={setToaster} />
    </>
  );
};

export default AdminProductsPage;
