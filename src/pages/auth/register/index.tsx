import RegisterView from "@/components/views/auth/Register";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const RegisterPage = ({ setToaster }: PropTypes) => {
  return (
    <>
      <RegisterView setToaster={setToaster} />
    </>
  );
};

export default RegisterPage;
