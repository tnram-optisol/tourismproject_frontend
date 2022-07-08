import axios from "axios";
export function signIn(values: { email: string; password: string }) {
  console.log("login");
  const { email, password } = values;
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/signin`, {
    email: email,
    password: password,
  });
}

export function signUp(values: {
  email: string;
  password: string;
  name: string;
  contact: number;
  role: number;
  place: string;
  external?: boolean;
}) {
  const user = values;
  console.log(values);
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, { user });
}

export function sendOtp(values: { email: string }) {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/get-otp`, {
    email: values.email,
  });
}

export function resetPass(values: {
  email: string;
  otp: number;
  password: string;
  cnf_password: string;
}) {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/reset-pass`, {
    email: values.email,
    otp: values.otp,
    password: values.password,
    cnf_password: values.cnf_password,
  });
}
