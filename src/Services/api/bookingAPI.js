import {
  ACTIVE_BOOKINGS,
  BOOK_TOUR,
  CANCEL_ROOM_BOOKING,
} from "Services/services.constants";
import axiosIntercept from "../axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getActiveBookings(id) {
  return axiosIntercept.get(`${SERVER_URL}${ACTIVE_BOOKINGS}/${id}`);
}

export function cancelRoomBookings(id) {
  return axiosIntercept.patch(`${SERVER_URL}${CANCEL_ROOM_BOOKING}`, {
    bookId: id,
  });
}

export function tourBooking(values) {
  const userData = values;
  return axiosIntercept.patch(`${SERVER_URL}${BOOK_TOUR}`, {
    userData,
  });
}

export function roomBooking(values) {
  const bookHotel = values;
  return axiosIntercept.patch(`${SERVER_URL}${BOOK_TOUR}`, {
    bookHotel,
  });
}
