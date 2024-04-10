import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { User } from "@/types/user.type";

type PropTypes = {
  usersData: User[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropTypes) => {
  const { usersData, setToaster } = props;
  const [dataUpdateUsers, setDataUpdateUsers] = useState<User[]>([]);

  useEffect(() => {
    setDataUpdateUsers(usersData);
  }, [usersData]);

  return (
    <>
      <AdminLayout>
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-white">
            Product Management
          </h1>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-md">
          <table className="w-full text-left text-sm font-medium text-white">
            <thead className="border-b border-[#333333] bg-[#000000] text-xs uppercase text-white">
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
              {dataUpdateUsers.map((user: User, index: number) => (
                <tr
                  key={user.id}
                  className="border-b border-[#333333] bg-[#000000]"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-white"
                  >
                    {index + 1}.
                  </th>
                  <td className="px-6 py-4">{user.fullname}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="flex space-x-2 px-6 py-4">
                    <Button
                      type="button"
                      variant="bg-red-800 text-sm p-2 rounded-md"
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      type="button"
                      variant="bg-blue-800 text-sm p-2 rounded-md"
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
    </>
  );
};

export default ProductsAdminView;
