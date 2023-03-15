import * as postApi from "./index";
const afterReceiveAuth = (user_id, token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user_id", user_id);
  postApi.axiosInstance.defaults.headers[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
};

const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  postApi.axiosInstance.defaults.headers["Authorization"] = "";
};
export { afterReceiveAuth, clearAuth };
