import ProfileMemberView from "@/components/views/member/Profile";
import usersServices from "@/services/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfileMemberPage = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await usersServices.getProfile(
        session.data?.accessToken
      );
      setProfile(data.data);
    };
    getAllUsers();
  }, [session]);

  return (
    <>
      <ProfileMemberView profile={profile} />
    </>
  );
};

export default ProfileMemberPage;
