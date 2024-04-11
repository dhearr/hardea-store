import UsersAdminView from "@/components/views/admin/Users";
import usersServices from "@/services/users";
import { useEffect, useState } from "react";

const AdminUsersPage = ({ setToaster }: any) => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const { data } = await usersServices.getAllUsers();
    setUsers(data.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <UsersAdminView users={users} setToaster={setToaster} />
    </>
  );
};

export default AdminUsersPage;
