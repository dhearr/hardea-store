import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import ModalUpdateUser from "./ModalUpdateUser";
import { BiSolidEdit } from "react-icons/bi";
import ModalDeleteUser from "./ModalDeleteUser";

type PropTypes = {
  usersData: any;
  setToaster: any;
};

const UsersAdminView = (props: PropTypes) => {
  const { usersData, setToaster } = props;
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  const [dataUpdateUsers, setDataUpdateUsers] = useState([]);

  useEffect(() => {
    setDataUpdateUsers(usersData);
  }, [usersData]);

  return (
    <>
      <AdminLayout>
        <div className="mb-5">
          <h1 className="text-2xl text-white font-semibold">User Management</h1>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-md">
          <table className="w-full text-sm text-left text-white font-medium">
            <thead className="text-xs text-white uppercase bg-[#000000] border-b border-[#333333]">
              <tr>
                <th scope="col" className="px-6 py-5">
                  No
                </th>
                <th scope="col" className="px-6 py-5">
                  Name
                </th>
                <th scope="col" className="px-6 py-5">
                  Email
                </th>
                <th scope="col" className="px-6 py-5">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-5">
                  Role
                </th>
                <th scope="col" className="px-6 py-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataUpdateUsers.map((user: any, index: number) => (
                <tr
                  key={user.id}
                  className="bg-[#000000] border-b border-[#333333]"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    {index + 1}.
                  </th>
                  <td className="px-6 py-4">{user.fullname}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="flex px-6 py-4 space-x-2">
                    <Button
                      type="button"
                      variant="bg-red-800 text-sm p-2 rounded-md"
                      onClick={() => setDeletedUser(user)}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      type="button"
                      variant="bg-blue-800 text-sm p-2 rounded-md"
                      onClick={() => setUpdatedUser(user)}
                    >
                      <BiSolidEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {/* Modal untuk mengedit pengguna */}
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setDataUpdateUsers={setDataUpdateUsers}
          setToaster={setToaster}
        />
      )}
      {/* Modal untuk menghapus pengguna */}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setDataUpdateUsers={setDataUpdateUsers}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default UsersAdminView;
