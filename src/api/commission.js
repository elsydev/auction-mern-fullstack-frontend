import axios from "./axios.js";

const API = "http://localhost:5000/api";

export const proofOfCommissionRequest = async (proof,token) =>
  axios.post(`/commission/proof`, proof, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    },
  });


