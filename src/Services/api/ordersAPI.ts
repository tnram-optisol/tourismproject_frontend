import { CANCEL_ORDERS, GET_ORDERS, REFUND_ORDERS } from "Services/services.constants";
import axiosIntercept from "../axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getOrders(id:number) {
  return axiosIntercept.get(`${SERVER_URL}${GET_ORDERS}/${id}`);
}

export function getCanceledOrders() {
  return axiosIntercept.get(`${SERVER_URL}${CANCEL_ORDERS}`);
}

export function refundOrders(data: { bookId: any; }) {
  return axiosIntercept.post(`${SERVER_URL}${REFUND_ORDERS}`, data);
}
