import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const NewPasswordToken = () => {
  const {
    isAuthenticated,
    user,
    confirmingAccount,
    errors: confirmErrors,
    isConfirmed,
    validateTokenPassword,
  } = useAuth();
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    validateTokenPassword(values);
  });
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <h1
          className={`text-[#d6482b] text-xl font-bold mb-2 min-[480px]:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl text-center`}
        >
           Valida tu token
        </h1>
        <p className="text-center text-stone-500">Ingresa el codigo de 6 digitos recibido en email</p>



    
      {confirmErrors.map((error, i) => (
        <p className="bg-red-500" key={i}>
          {error}
        </p>
      ))}
      <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
        <input
          type="text"
          {...register("token", { required: true })}
          className="text-[16px] py-2 bg-transparent text-black px-4  rounded-md my-2 border "
          placeholder="codigo de 6 digitos" pattern="[0-9]+" maxLength={6}
        />
        <button type="submit" className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4">Enviar Codigo</button>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/forgot-password"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </div>
  );
};

export default NewPasswordToken;
