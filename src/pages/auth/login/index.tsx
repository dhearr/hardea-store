import LoginView from "@/components/views/auth/Login";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const LoginPage = ({ setToaster }: PropTypes) => {
  return (
    <>
      <LoginView setToaster={setToaster} />
    </>
  );
};

export default LoginPage;
