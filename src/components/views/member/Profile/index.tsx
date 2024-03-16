import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import { HiOutlineKey, HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";

const ProfileMemberView = ({ profile }: any) => {
  return (
    <MemberLayout>
      <div className="mb-5">
        <h1 className="text-2xl text-white font-bold">My Profile</h1>
      </div>
      <div className="flex gap-5">
        <div className="w-3/12 flex flex-col justify-center items-center h-auto border bg-[#000000] shadow-lg border-[#333333] rounded-md p-5">
          <Image
            src={profile?.image}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full w-24 h-24"
          />
          <label
            htmlFor="upload-image"
            className="bg-[#161616] hover:bg-[#161616]/80 p-2 text-center text-xs mt-5 space-y-3 cursor-pointer rounded-md transition duration-200"
          >
            <p className="text-white/70">
              Upload a new avatar, Larger image will be resized automatically.
            </p>
            <p className="text-white/70 font-semibold">
              Maximum upload size is{" "}
              <span className="text-blue-800 font-black">1 MB</span>
            </p>
          </label>
          <input
            type="file"
            name="image"
            id="upload-image"
            className="absolute opacity-0 z-[-1]"
          />
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
