import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import NewPasswordToken from "../components/NewPasswordToken.jsx";
import NewPasswordForm from "../components/NewPasswordForm.jsx";

const NewPassword = () => {
  const {
    isAuthenticated,
    user,
    confirmingAccount,
    isConfirmed,
    isValidToken,
    toUpdatePassword,
    passwordChanged,
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isValidToken) {
      console.log("token Válido");
    }
  }, [isValidToken]);
  useEffect(() => {
    if (passwordChanged) navigate("/login");
  }, [passwordChanged]);
  console.log();
  return (
    <>
       <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col 
        gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
          {!isValidToken ? <NewPasswordToken /> : <NewPasswordForm />}
        </div>
        </section>
    </>

  );
};

export default NewPassword;
