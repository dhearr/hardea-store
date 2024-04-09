import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import usersServices from "@/services/users";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";

type PropTypes = {
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
  setDataUpdateUsers: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalUpdateUser = (props: PropTypes) => {
  const {
    updatedUser,
    setUpdatedUser,
    setDataUpdateUsers,
    setToaster,
    session,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah reload halaman saat submit form
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement; // Mengakses form yang sedang di-submit
    const data = {
      role: form.role.value, // Mengambil nilai role dari input role
    };

    // Mengirimkan permintaan POST ke server
    const result = await usersServices.updateUser(
      updatedUser.id,
      data,
      session.data?.accessToken
    );

    // Mengecek status permintaan
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await usersServices.getAllUsers(); // Mengambil data users dari server
      setDataUpdateUsers(data.data); // Menetapkan data users ke state
      setToaster({
        variant: "success",
        message: "User updated successfully",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed to update user",
      });
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
        <Input
          label={<HiOutlineUser />}
          name="fullname"
          type="fullname"
          placeholder="Fullname"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          label={<HiOutlineMail />}
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          label={<HiDevicePhoneMobile />}
          name="phone"
          type="phone"
          placeholder="Phone Number"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          label={<GrUserSettings />}
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Admin", value: "admin" },
            { label: "Member", value: "member" },
          ]}
        />
        <Button
          type="submit"
          variant="p-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
