import axios from "./axios.js";

const API = "http://localhost:5000/api";

export const registerRequest = async (user) =>
  axios.post(`/user/register`, user);

export const loginRequest = async (user) => axios.post(`/user/login`, user);
export const confirmRequest = async (tok) =>
  axios.post("/user/confirm-account", tok);
//token con cookies
export const verifyTokenRequest = async () => axios.get("/user/verify");
//token con local storage
export const perfilRequest = async (token) => axios.get("/user/perfil",{
  headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
  }
});
export const registerWithFile = async (dataUser) =>
  axios.post(`/user/register`, dataUser, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const requirePasswordRequest = async (value) =>
  axios.post("/user/forgot-password", value);
export const validatePasswordToken = async (token) =>
  axios.post("/user/validate-token", token);
export const updatePasswordRequest = async (newPassword, token) => {
  console.log("En updatePasswordRequest", newPassword);
  console.log("En updatePasswordRequest", token);
  return axios.post(`/user/update-password/${token}`, { newPassword });
};
export const getProfileRequest = async (token) => axios.get("/user/profile",{
  headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
  }
});
export const getLeaderBoardRequest=async (token)=>axios.get("/user/leaderboard" ,{
  headers: {
     
      Authorization: `Bearer ${token}`
  }
})