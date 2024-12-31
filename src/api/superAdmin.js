import axios from "./axios.js";

export const deleteAuctionDashboard = async (token,id) =>
  axios.delete(`/superadmin/auctionitem/delete/${id}`,{
    headers: {
       
        Authorization: `Bearer ${token}`
    }
});

export const getPaymentProofsRequest = async (token) => axios.get("/superadmin/paymentproofs/all",{
    headers: {
       
        Authorization: `Bearer ${token}`
    }
});

export const getPaymentProofRequest = async (token,id) => axios.get(`/superadmin/paymentproof/${id}`,{
    headers: {
       
        Authorization: `Bearer ${token}`
    }
});

export const updatePaymentProofRequest = async (status, amount,token,id) =>
    axios.put(`/superadmin/paymentproof/status/update/${id}`, { status, amount },{
    headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    }
});

export const deletePaymentProofRequest = async (token,id) =>
  axios.delete(`/superadmin/paymentproof/delete/${id}`,{
    headers: {
       
        Authorization: `Bearer ${token}`
    }
});

export const getAllUsersRequest = async (token) => axios.get("/superadmin/users/getall",{
    headers: {
       
        Authorization: `Bearer ${token}`
    }
});

export const getMonthlyIncomeRequest = async (token) => axios.get("/superadmin//monthlyincome",{
    headers: {
       
        Authorization: `Bearer ${token}`
    }
});