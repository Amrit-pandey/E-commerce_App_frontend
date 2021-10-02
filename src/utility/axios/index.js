import axios from "axios";
import { BASE_URL } from "../apis";

export default axios.create({
   baseURL: BASE_URL,
});
