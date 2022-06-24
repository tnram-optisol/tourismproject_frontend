import axiosIntercept from "./axios";

export const createApi = (props: {
  method: string;
  url: string;
  data?: any;
}) => {
  return axiosIntercept({
    method: props.method,
    url: props.url,
    data: props.data,
  });
};
