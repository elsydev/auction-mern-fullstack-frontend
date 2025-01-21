import axios from "axios";

const instance = axios.create({
  baseURL: "https://auction-mern-fullstack-backend.onrender.com/api",
  //withCredentials: true,
});

export default instance;
