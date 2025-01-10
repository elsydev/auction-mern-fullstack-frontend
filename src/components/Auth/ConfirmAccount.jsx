import { useAuth } from "../../context/AuthContext.jsx";
import { useForm } from "react-hook-form";
import { useEffect,useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//import { PinInput, PinInputField } from "@chakra-ui/pin-input";

 
const ConfirmAccount = () => {
  const {
    isAuthenticated,
    user,
    confirmingAccount,
    errors: confirmErrors,
    isConfirmed,
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
  const handleChange = (token) => {
    setToken(token);
  };

  useEffect(() => {
    if (isConfirmed) {
      navigate("/login");
    }
  }, [isConfirmed]);


  const onSubmit = handleSubmit(async (values) => {
    confirmingAccount(values);
    reset();
  });
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
          <h1
            className={`text-[#d6482b] text-xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl text-center`}
          >
             Confirma tu Cuenta
          </h1>
          <p className="text-center text-stone-500">Ingresa el código que recibiste por email</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
        <input
        
          type="text"


          {...register("token", {
                required: {
                  value: true,
                  message: "The code is required",
                },
                pattern: {
                  value:
                    /^[0-9]+/,
                  message: "Code fromat not valid",
                },
              })} 
      
          className="text-[16px] py-2 bg-transparent text-black px-4  rounded-md my-2 border "
          placeholder="codigo de 6 digitos" pattern="[0-9]+" maxLength={6}
        />
       <button type="submit" className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4">Send Code</button>
      </form>
    </div>
    </section>
    </>
    
  )
}

export default ConfirmAccount
