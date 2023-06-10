import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://balasha-backend-production.up.railway.app/",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default customFetch;
