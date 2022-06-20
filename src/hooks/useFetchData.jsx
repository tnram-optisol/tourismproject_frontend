import { useState, useEffect } from "react";
import axiosIntercept from "Services/axios";

const useFetchData = (endPoint) => {
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);
  const [serverError, setServerError] = useState(null);

  const fetchResult = async () => {
    setLoading(true)
    try {
      const res = await axiosIntercept.get(`${process.env.REACT_APP_SERVER_URL}${endPoint}`);
      const data = res.data;
      setResultData(data);
      setLoading(false);
    } catch (err) {
      setServerError(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => fetchResult, []);
  return {loading , serverError,resultData}
};

export default useFetchData;
