import axios from "axios";

const token = localStorage.getItem("token");
const user = token !== "" ? JSON.parse(atob(token!.split(".")[1])) : "";

const axiosIntercept = axios.create({
  baseURL: "http://localhost:8080",
});

axiosIntercept.interceptors.request.use(
  (config) => {
    if (user !== "") {
      if (config.headers !== undefined) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["Role"] = `${user.role}`;
        config.headers["User"] = `${user.id}`;
        return config;
      }
    } else {
      if (config.headers !== undefined) {
        config.headers["Authorization"] = `Bearer `;
        config.headers["Role"] = 0;
        config.headers["User"] = 0;
        return config;
      }
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosIntercept.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (
      err.response.status === 401 ||
      err.response.status === 403 ||
      err.response.status === 400
    ) {
      return err.response;
    }
  }
);

export default axiosIntercept;
