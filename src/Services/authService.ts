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
}) {
  const user = values;
  console.log(values);
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, { user });
}
