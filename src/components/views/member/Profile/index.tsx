import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { uploadFile } from "@/lib/firebase/service";
import usersServices from "@/services/users";
import { User } from "@/types/user.type";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineKey, HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";

type PropTypes = {
  profile: User | any;
  setProfile: Dispatch<SetStateAction<{}>>;
  session: any;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfileMemberView = ({
  profile,
  setProfile,
  session,
  setToaster,
}: PropTypes) => {
  const [changeImage, setChangeImage] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState("");

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement; // Mengakses form yang sedang di-submit
    const data = {
      fullname: form.fullname.value, // Mengambil nilai fullname dari input fullname
      phone: form.phone.value, // Mengambil nilai phone dari input phone
    };
    // Mengirimkan permintaan POST ke server
    const result = await usersServices.updateProfile(
      data,
      session.data?.accessToken
    );

    // Mengecek status permintaan
    if (result.status === 200) {
      setIsLoading("");
      setProfile({ ...profile, fullname: data.fullname, phone: data.phone });
      form.reset();
      setToaster({
        variant: "success",
        message: "Profile updated successfully",
      });
    } else {
      setIsLoading("");
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("picture");
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      uploadFile(
        profile?.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            // Mengirimkan permintaan POST ke server
            const result = await usersServices.updateProfile(
              data,
              session.data?.accessToken
            );

            // Mengecek status permintaan
            if (result.status === 200) {
              setIsLoading("");
              setProfile({ ...profile, image: newImageURL });
              setChangeImage({});
              form.reset();
              setToaster({
                variant: "success",
                message: "Profile picture updated successfully",
              });
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              variant: "danger",
              message: "Failed to update profile picture",
            });
          }
        }
      );
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement; // Mengakses form yang sedang di-submit
    const data = {
      password: form["new-password"].value, // Mengambil nilai password dari input new-password
      oldPassword: form["old-password"].value, // Mengambil nilai password lama dari input old-password
      encryptedPassword: profile.password, // Mengambil nilai password sebelumnya
    };
    try {
      // Mengirimkan permintaan POST ke server
      const result = await usersServices.updateProfile(
        data,
        session.data?.accessToken
      );

      // Mengecek status permintaan
      if (result.status === 200) {
        setIsLoading("");
        form.reset();
        setToaster({
          variant: "success",
          message: "Password updated successfully",
        });
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "Failed to update password",
      });
    }
  };
  return (
    <MemberLayout>
      <div className="mb-5">
        <h1 className="text-2xl text-white font-bold">My Profile</h1>
      </div>
      <div className="flex gap-5">
        <div className="w-3/12 flex flex-col justify-center items-center h-auto border bg-[#000000] shadow-lg border-[#333333] rounded-md p-5">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-36 h-36 overflow-hidden rounded-full">
                <Image
                  src={profile?.image ? profile?.image : "/images/profile.jpg"}
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          <form
            onSubmit={handleChangeProfilePicture}
            className="relative bg-[#161616] hover:bg-[#161616]/80 p-2 text-center text-xs mt-5 mb-10 cursor-pointer rounded-md transition duration-200 w-full"
          >
            <label htmlFor="upload-image" className="cursor-pointer">
              {changeImage.name ? (
                <p className="text-white/70 font-semibold">
                  {changeImage.name}
                </p>
              ) : (
                <>
                  <p className="text-white/70">
                    Upload a new avatar, Larger image will be resized
                    automatically.
                  </p>
                  <p className="text-white/70 font-semibold">
                    Maximum upload size is{" "}
                    <span className="text-blue-800 font-black">1 MB</span>
                  </p>
                </>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="upload-image"
              className="absolute opacity-0 z-[-1]"
              onChange={(e: any) => {
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
            />
            <div className="absolute left-0 right-0 bottom-[-45px]">
              <Button
                type="submit"
                variant="bg-[#ededed] text-[#0a0a0a] hover:bg-[#d0d0d0] py-1.5 px-5 rounded-md transition-all w-full"
              >
                {isLoading === "picture" ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Upload Profile Picture"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-3/6 h-auto border bg-[#000000] shadow-lg border-[#333333] rounded-md p-8">
          <h2 className="text-2xl text-white font-bold mb-3">Detail Profile</h2>
          <form onSubmit={handleChangeProfile} className="space-y-5">
            <Input
              label={<HiOutlineUser />}
              name="fullname"
              type="text"
              variant="bg-[#161616] text-white/70"
              defaultValue={profile?.fullname}
            />
            <Input
              label={<HiDevicePhoneMobile />}
              name="phone"
              type="number"
              variant="bg-[#161616] text-white/70"
              defaultValue={profile?.phone}
              placeholder="Phone Number"
            />
            <Input
              label={<HiOutlineMail />}
              name="email"
              type="email"
              variant="bg-[#161616] text-white/70"
              defaultValue={profile?.email}
              disabled
            />
            <Input
              label={<GrUserSettings />}
              name="role"
              type="text"
              variant="bg-[#161616] text-white/70"
              defaultValue={profile?.role}
              disabled
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="bg-[#ededed] text-[#0a0a0a] hover:bg-[#d0d0d0] py-1.5 px-5 min-w-full rounded-md transition-all"
              >
                {isLoading === "profile" ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-3/12 h-auto border bg-[#000000] shadow-lg border-[#333333] rounded-md p-8">
          <h2 className="text-2xl text-white font-bold mb-3">
            Change Password
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-5">
            <Input
              label={<HiOutlineKey />}
              name="old-password"
              type="password"
              placeholder="Old Password"
              disabled={profile.type === "google"}
              variant="bg-[#161616] text-white/70"
            />
            <Input
              label={<HiOutlineKey />}
              name="new-password"
              type="password"
              placeholder="New Password"
              disabled={profile.type === "google"}
              variant="bg-[#161616] text-white/70"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading === "password" || profile.type === "google"}
                variant="bg-[#ededed] text-[#0a0a0a] hover:bg-[#d0d0d0] min-w-full py-1.5 px-5 rounded-md transition-all disabled:cursor-not-allowed disabled:bg-[#d0d0d0]"
              >
                {isLoading === "password" ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
