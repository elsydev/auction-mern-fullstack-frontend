import { useAuth } from "../../context/AuthContext.jsx";
import { useForm } from "react-hook-form";
import { useEffect,useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  //const[loading,setLoading]=useState(false)
  const navigate=useNavigate();

    const {
        signIn,
        user,
        isAuthenticated,
        errors: signInErrors,
        isLogged,loading
      } = useAuth();

      const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
      } = useForm();
      useEffect(() => {
        if (isAuthenticated) {
          navigate("/");
        }
      }, [isAuthenticated]);
      const onSubmit = handleSubmit(async (values) => {
        //setLoading(true)
        signIn(values);
        //reset()
      });

    return (
        <>
              <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
             {loading ? "Logging In..." : "Login"}
          </h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Email</label>
                <input type="email" placeholder="Email" className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
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
            </div>
            <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Password</label>
            <input type="password" name="password" placeholder="Contraseña" 
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                  {...register("password", { required: true })}/>
                            {errors.password && (
              <p className="text-red-500">El password requerido</p>
            )}
            </div>
                
                <button type="submit" className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4">  {loading ? "Logging In..." : "Login"}</button>
               
            </form> 
            <div className="flex flex-col sm:flex-row justify-between p-1 gap-5">
                  <p className="mt-2">
                    <Link to="/forgot-password" className="text-blue-500">¿Olvidaste tu contraseña?</Link>
                  </p>
                  <p className="mt-2">
                    <Link to="/register" className="text-blue-500">¿No tienes cuenta aún? Registrate</Link>
                  </p>
                </div>

            </div>
            </section>
        </>
    );
};

export default Login;