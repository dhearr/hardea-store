import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import usersServices from "@/services/users";
import { useSession } from "next-auth/react";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setDataUpdateUsers } = props;
  const session: any = useSession(); // Inisialisasi session

  const handleDeleteUser = async () => {
    usersServices.deleteUser(deletedUser.id, session.data?.accessToken); // Menghapus user dari server
    setDeletedUser({});
    const { data } = await usersServices.getAllUsers(); // Mengambil data users dari server
    setDataUpdateUsers(data.data); // Menetapkan data users ke state
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1>Are You Sure?</h1>
      <Button
        type="button"
        onClick={() => handleDeleteUser()}
        variant="bg-red-500 hover:bg-red-600"
      >
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
