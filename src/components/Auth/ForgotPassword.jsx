import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useEffect,useState } from "react";
const ForgotPassword = () => {
    const {
      isAuthenticated,
      user,
      requirePasswordChange,
      errors: passwordErrors,
      isConfirmed,
      isTokenSent,
      setIsTokenSent,
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
    useEffect(() => {
        if (isTokenSent) {
          navigate("/");
        }
      }, [isTokenSent]);
    
      const onSubmit = handleSubmit(async (values) => {
        console.log(values);
        requirePasswordChange(values);
        reset();
      });
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
          <h3
            className={`text-[#d6482b] text-xl font-bold mb-2 min-[480px]:text-4xl md:text-4xl xl:text-2xl 2xl:text-3xl text-center`}
          >
            ¿Olvidaste tu password?
          </h3>
          <p className="text-center text-stone-500">Ingresa tu email registrado</p>
        

<form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">

 <input type="email" placeholder="Email" className="border p-2 mb-4 w-full" name="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "El campo email es requerido",
                },
                pattern: {
                  value:
                    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
                  message: "Correo no válido",
                },
              })} />
              {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
<button type="submit" className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4">Solicitar Reset</button>
                
            </form>
    </div>
      </section>
    </>
    
  );
  };
  
  export default ForgotPassword;