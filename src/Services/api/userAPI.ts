import { createApi } from "Services/createApi";
import {
  ALL_CATEGORY,
  MAIL_TO_ADMIN,
  USER_FILTER_TOUR,
  USER_GET_HOTEL,
  USER_GET_RATING,
  USER_GET_REVIEW,
  USER_GET_ROOMS,
  USER_GET_TOUR,
  USER_POST_REVIEW,
  USER_SEARCH_TOUR,
  USER_VIEW_ROOMS,
  USER_VIEW_TOUR,
} from "Services/services.constants";
import axiosIntercept from "../axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getTour() {
  return createApi({
    method: "GET",
    url: `${USER_GET_TOUR}`,
  });
}

export function getAllCategory() {
  return createApi({
    method: "GET",
    url: `${ALL_CATEGORY}`,
  });
}

export function filterTourData(category: number) {
  return createApi({
    method: "GET",
    url: `${USER_FILTER_TOUR}/${category}`,
  });
}

export function searchTourData(query: string | null) {
  return createApi({
    method: "GET",
    url: `${USER_SEARCH_TOUR}/${query}`,
  });
}

export function getHotels() {
  return createApi({
    method: "GET",
    url: `${USER_GET_HOTEL}`,
  });
}

export function getRooms(hotel_id: number) {
  return createApi({
    method: "GET",
    url: `${USER_GET_ROOMS}/${hotel_id}`,
  });
}

export function viewRooms(room_id: number) {
  return createApi({
    method: "GET",
    url: `${USER_VIEW_ROOMS}/${room_id}`,
  });
}

export function viewTour(tour_id: number) {
  return createApi({
    method: "GET",
    url: `${USER_VIEW_TOUR}/${tour_id}`,
  });
}

export function getReview(tour_id: number) {
  return createApi({
    method: "GET",
    url: `${USER_GET_REVIEW}/${tour_id}`,
  });
}

export function getRating(tour_id: number) {
  return createApi({
    method: "GET",
    url: `${USER_GET_RATING}/${tour_id}`,
  });
}

export function postReview(values: {
  name: string;
  email: string;
  rating: number;
  comment: string;
}) {
  const user = values;
  console.log(values);
  return axiosIntercept.post(`${SERVER_URL}${USER_POST_REVIEW}`, user);
}

export function contactAdmin(values: {
  name: string;
  email: string;
  message: string;
}) {
  const user = values;
  console.log(values);
  return axiosIntercept.post(`${SERVER_URL}${MAIL_TO_ADMIN}`, user);
}
