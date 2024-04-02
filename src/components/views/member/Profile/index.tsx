import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { uploadFile } from "@/lib/firebase/service";
import usersServices from "@/services/users";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineKey, HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";

const ProfileMemberView = ({ profile, setProfile, session }: any) => {
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const file = e.target[0]?.files[0];
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
              profile.id,
              data,
              session.data?.accessToken
            );

            // Mengecek status permintaan
            if (result.status === 200) {
              setIsLoading(false);
              setProfile({ ...profile, image: newImageURL });
              setChangeImage({});
              e.target[0].value = "";
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            setChangeImage({});
          }
        }
      );
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
                {isLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Upload Profile Picture"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-3/4 h-auto border bg-[#000000] shadow-lg border-[#333333] rounded-md p-8">
          <form action="" className="space-y-5">
            <Input
              label={<HiOutlineUser />}
              name="fullname"
              type="text"
              variant="bg-[#161616] text-white/70"
              defaultValue={profile?.fullname}
            />
            <Input
              label={<HiOutlineMail />}
              name="email"
              type="email"
              variant="bg-[#161616] text-white/70"
              defaultValue={profile?.email}
            />
            <Input
              label={<HiDevicePhoneMobile />}
              name="phone"
              type="number"
              variant="bg-[#161616] text-white/70"
              defaultValue={profile?.phone}
            />
            {/* <Input
            label={<HiOutlineKey />}
            name="password"
            type="password"
            variant="bg-[#161616] text-white/70"
          /> */}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="bg-[#ededed] text-[#0a0a0a] hover:bg-[#d0d0d0] py-1.5 px-5 rounded-md transition-all"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
