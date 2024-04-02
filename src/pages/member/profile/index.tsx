import ProfileMemberView from "@/components/views/member/Profile";
import usersServices from "@/services/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfileMemberPage = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await usersServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);

  return (
    <>
      <ProfileMemberView
        profile={profile}
        setProfile={setProfile}
        session={session}
      />
    </>
  );
};

export default ProfileMemberPage;
