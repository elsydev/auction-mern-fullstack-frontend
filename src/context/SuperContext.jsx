import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import {
  deleteAuctionDashboard,
  getPaymentProofsRequest,
  getPaymentProofRequest,
  updatePaymentProofRequest,
  deletePaymentProofRequest,
  getAllUsersRequest,
  getMonthlyIncomeRequest,
} from "../api/superAdmin.js";

//import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, Navigate, useParams } from "react-router-dom";

const SuperContext = createContext();

export const useSuper = () => {
  const context = useContext(SuperContext);
  if (!context) throw new Error("useSuper must be used within SuperProvider");
  return context;
};

export const SuperProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalAuctioneers, setTotalAuctioneers] = useState([]);
  const [totalBidders, setTotalBidders] = useState([]);
  const [paymentProofs, setPaymentProofs] = useState([]);
  const [singlePaymentProof, setSinglePaymentProof] = useState([]);
  const [updatedProof, setUpdatedProof] = useState(null);
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getMonthlyRevenue = async () => {
    setMonthlyRevenue([]);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await getMonthlyIncomeRequest(token);
      console.log(res.data);
      setMonthlyRevenue(res.data.totalMonthlyRevenue);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
      setErrors(error.response.data);
      setLoading(false);
    }
    setLoading(false);
  };
  const getAllUsers = async () => {
    setLoading(true);
    setTotalAuctioneers([]);
    setTotalBidders([]);
    try {
      const token = localStorage.getItem("token");
      const res = await getAllUsersRequest(token);
      console.log(res.data);
      setTotalAuctioneers(res.data.auctioneersArray);
      setTotalBidders(res.data.biddersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
      setErrors(error.response.data);
      setLoading(false);
    }
  };
  const getPaymentProofs = async () => {
    setLoading(true);
    setPaymentProofs([]);
    try {
      const token = localStorage.getItem("token");
      const res = await getPaymentProofsRequest(token);
      console.log(res.data);
      setPaymentProofs(res.data.paymentProofs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
      setErrors(error.response.data);
      setLoading(false);
    }
  };
  const getPaymentProof = async (id) => {
    setLoading(true);
    setSinglePaymentProof([]);
    try {
      const token = localStorage.getItem("token");
      const res = await getPaymentProofRequest(token,id);
      console.log(res.data);
      setSinglePaymentProof(res.data.paymentProofDetail);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
      setErrors(error.response.data);
      setLoading(false);
    }
  };
  const updatePaymentProof = async (id, status, amount) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res=await axios.put(`http://localhost:5000/api/superadmin/paymentproof/status/update/${id}`, { status, amount },{
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
      //const res = await updatePaymentProofRequest({status, amount}, token, id);
      console.log(res.data);
      setUpdatedProof(res.data.proof);
      toast.success(res.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
      setErrors(error.response.data);
      setLoading(false);
    }
  };
  const deletePaymentProof = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await deletePaymentProofRequest(token, id);
      console.log(res.data);
      getPaymentProofs()
      toast.success(res.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
      setErrors(error.response.data);
      setLoading(false);
    }
  };
  const deleteAuction = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await deleteAuctionDashboard(token, id);
      console.log(res.data);
      toast.success(res.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
      setErrors(error.response.data);
      setLoading(false);
    }
  };
  const resetSuperContext = async () => {
    setLoading(false);
    setMonthlyRevenue(monthlyRevenue);
    setTotalAuctioneers(totalAuctioneers);
    setTotalBidders(totalBidders);
    setPaymentProofs(paymentProofs);
    setSinglePaymentProof(singlePaymentProof);
    setUpdatedProof(updatedProof);
  };
  return (
    <SuperContext.Provider
      value={{
        getMonthlyRevenue,
        getPaymentProofs,
        getAllUsers,
       
        deletePaymentProof,
        deleteAuction,
        loading,
        errors,
        monthlyRevenue,
        totalAuctioneers,
        totalBidders,
        paymentProofs,
        singlePaymentProof,
        updatedProof,
        getPaymentProof,
        updatePaymentProof,
        resetSuperContext
      }}
    >
      {children}
    </SuperContext.Provider>
  );
};
export default SuperContext;
