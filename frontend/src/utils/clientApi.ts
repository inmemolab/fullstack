// import axios
import axios, { AxiosInstance } from "axios";
// create the instance
const clientApi: AxiosInstance = axios.create({
  // assign the url
  baseURL: import.meta.env.VITE_APP_PORT_SERVER,
  // headers
  headers: {
    "Content-Type": "application/json"
  }
});
// export
export default clientApi;
