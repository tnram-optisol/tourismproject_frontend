import {
  ACTIVE_BOOKINGS,
  BOOK_TOUR,
  CANCEL_ROOM_BOOKING,
  CANCEL_TOUR_BOOKING,
} from "Services/services.constants";
import { BookRoomModel } from "utils/model/hotelModel";
import { BookTourModel } from "utils/model/tourModel";
import axiosIntercept from "../axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getActiveBookings(id:number) {
  return axiosIntercept.get(`${SERVER_URL}${ACTIVE_BOOKINGS}/${id}`);
}

export function cancelRoomBookings(id:number) {
  return axiosIntercept.patch(`${SERVER_URL}${CANCEL_ROOM_BOOKING}`, {
    bookId: id,
  });
}

export function cancelTourBookings(id: number) {
  return axiosIntercept.patch(`${SERVER_URL}${CANCEL_TOUR_BOOKING}`, {
    bookId: id,
  });
}

export function tourBooking(values:BookTourModel) {
  const userData = values;
  return axiosIntercept.post(`${SERVER_URL}${BOOK_TOUR}`, {
    userData,
  });
}

export function roomBooking(values:BookRoomModel) {
  const bookHotel = values;
  return axiosIntercept.post(`${SERVER_URL}${BOOK_TOUR}`, {
    bookHotel,
  });
}
