import UsersAdminView from "@/components/views/admin/Users";
import usersServices from "@/services/users";
import { useEffect, useState } from "react";

const AdminUsersPage = ({ setToaster }: any) => {
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
      <UsersAdminView usersData={users} setToaster={setToaster} />
    </>
  );
};

export default AdminUsersPage;
