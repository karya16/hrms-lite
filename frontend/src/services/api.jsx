import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-backend-hmjc.onrender.com/api/",
});

export default API;

