import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link, Navigate } from "react-router-dom";

const NewPasswordForm = () => {
  const {
    isAuthenticated,
    user,
    confirmingAccount,
    errors: newPasswordErrors,
    isConfirmed,
    isValidToken,
    toUpdatePassword,
    updatingPassword,
    passwordChanged,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const password = useRef(null);
  password.current = watch("password", "");

  const onSubmit = handleSubmit(async (values) => {
    setValue("token", toUpdatePassword);
    console.log(values.password, toUpdatePassword);
    updatingPassword(values.password, toUpdatePassword);
    reset();
  });
  useEffect(() => {
    if (passwordChanged) navigate("/login");
  }, [passwordChanged]);
  return (
    
    <div className="flex flex-col justify-center items-center h-screen">
      <h1
            className={`text-[#d6482b] text-xl font-bold mb-2 min-[480px]:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl text-center`}
          >
             Ingresa tus datos
          </h1>
          <p className="text-center text-stone-500">Ingresa tu nueva contraseña</p>
      {newPasswordErrors.map((error, i) => (
        <p className="bg-red-500" key={i}>
          {error}
        </p>
      ))}

      {/***************** Con React Hook Form**********************/}
      <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
        <input
          type="password"
          name="password"
          {...register("password", {
            required: {
              value: true,
              message: "Confirmar password es requerido",
            },
            minLength: {
              value: 8,
              message: "El password debe tenr minimo 8 caracteres",
            },
          })}
          className="text-[16px] py-2 bg-transparent text-black px-4  rounded-md my-2 border "
          placeholder="Escriba su Contraseña"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          type="password"
          name="confirmarPassword"
          {...register("confirmarPassword", {
            required: {
              value: true,
              message: "Confirmar password es requerido",
            },
            minLength: {
              value: 8,
              message: "El password debe tenr minimo 8 caracteres",
            },
            validate: (value) =>
              value === password.current || "Las contraseñas no coinciden",
          })}
          className="text-[16px] py-2 bg-transparent text-black px-4  rounded-md my-2 border "
          placeholder="Repita su Contraseña"
        />
        {errors.confirmarPassword && (
          <p className="text-red-500">{errors.confirmarPassword.message}</p>
        )}
        <button type="submit" className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default NewPasswordForm;
