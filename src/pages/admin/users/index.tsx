import UsersAdminView from "@/components/views/admin/Users";
import usersServices from "@/services/users";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
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
      <UsersAdminView usersData={users} />
    </>
  );
};

export default AdminUsersPage;
