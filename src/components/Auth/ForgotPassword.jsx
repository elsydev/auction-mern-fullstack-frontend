import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="flex justify-center items-center h-screen">

<form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-xs">
 <h2 className="text-lg mb-4">Solicitar Reset de Password</h2>
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
<button type="submit" className="bg-blue-500 text-white p-2 w-full">Solicitar Reset</button>
                
            </form>
    </div>
  );
  };
  
  export default ForgotPassword;