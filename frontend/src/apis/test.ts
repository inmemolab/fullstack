import axios from "axios";

export function getList() {
  return axios.post("http://localhost:8080/api/test");
}
