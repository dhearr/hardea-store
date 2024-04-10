import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import usersServices from "@/services/users";
import { User } from "@/types/user.type";
import { Dispatch, SetStateAction, useState } from "react";
import { CgDanger } from "react-icons/cg";

type PropTypes = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  setDataUpdateUsers: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalDeleteUser = (props: PropTypes) => {
  const {
    deletedUser,
    setDeletedUser,
    setDataUpdateUsers,
    setToaster,
    session,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async () => {
    const result = await usersServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken,
    ); // Menghapus user dari server

    // Mengecek status permintaan
    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "User deleted successfully",
      });
      setDeletedUser({});
      const { data } = await usersServices.getAllUsers(); // Mengambil data users dari server
      setDataUpdateUsers(data.data); // Menetapkan data users ke state
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed to delete user",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className="flex justify-center text-5xl">
        <CgDanger />
      </h1>
      <h1 className="text-center text-2xl">
        Are you sure you want to delete this user?
      </h1>
      <div className="flex justify-between gap-5">
        <Button
          type="button"
          onClick={() => handleDeleteUser()}
          variant="w-full bg-red-600 hover:bg-red-500 text-white rounded-md p-2 mt-4"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Delete"
          )}
        </Button>
        <Button
          type="button"
          onClick={() => setDeletedUser({})}
          variant="w-full bg-gray-600 hover:bg-gray-500 rounded-md p-2 text-white mt-4"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
