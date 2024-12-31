import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import {
  proofOfCommissionRequest
} from "../api/commission.js";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const CommissionContext = createContext();
const navigate = useNavigate;
export const useCommission = () => {
  const context = useContext(CommissionContext);
  if (!context) throw new Error("useCommission must be used within a AuthCommission");
  return context;
};

export const CommissionProvider = ({ children }) => {
  const [proof, setProof] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [proofIsRegistered, setProofIsRegistered] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [toUpdatePassword, setToUpdatePassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [isTokenSent, setIsTokenSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

/*   useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      console.log("buscando cookies", cookies.token);
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []); */

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const postCommissionProof = async (values) => {
    
    /**Con Image File */
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      console.log('desde post commission proof en commission context',token)
      if(!token) return
      const res = await proofOfCommissionRequest(values,token);

      console.log(res.data);
      setProof(res.data);
      //setIsAuthenticated(true)
      setProofIsRegistered(true);
      toast.success(res.data.message);
      setLoading(false)
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message)
    }
  };

  return (
    <CommissionContext.Provider
      value={{
        postCommissionProof,
        loading,
        errors,
        
        message,
  
      }}
    >
      {children}
    </CommissionContext.Provider>
  );
};
export default CommissionContext;
