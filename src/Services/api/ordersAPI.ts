import { createApi } from "Services/createApi";
import {
  CANCEL_ORDERS,
  GET_ORDERS,
  REFUND_HOTEL_ORDERS,
  REFUND_TOUR_ORDERS,
} from "Services/services.constants";
import axiosIntercept from "../axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getOrders(id: number) {
  return createApi({
    method: "GET",
    url: `${GET_ORDERS}/${id}`,
  });
}

export function getCanceledOrders() {
  return createApi({
    method: "GET",
    url: `${CANCEL_ORDERS}`,
  });
}

export function refundTourOrders(data: { bookId: any }) {
  return axiosIntercept.post(`${SERVER_URL}${REFUND_TOUR_ORDERS}`, {
    bookId: data.bookId,
  });
}

export function refundHotelOrders(data: { bookId: any }) {
  return axiosIntercept.post(`${SERVER_URL}${REFUND_HOTEL_ORDERS}`, {
    bookId: data.bookId,
  });
}

export function ordersPaginate(
  endpoint: string,
  page: number,
  limit: number,
  searchQuery?: string
) {
  return createApi({
    method: "GET",
    url: `${endpoint}?page=${page}&limit=${limit}&search=${searchQuery}`,
  });
}
