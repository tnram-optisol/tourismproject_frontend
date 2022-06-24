import axiosIntercept from "Services/axios";
import { createApi } from "Services/createApi";
import {
    TOUR_ADMIN_ADD_TOUR,
    TOUR_ADMIN_ALL_ORDERS,
    TOUR_ADMIN_GET_TOUR,
    TOUR_ADMIN_PAGE_TOUR,
    TOUR_ADMIN_UPDATE_TOUR,
    TOUR_ADMIN_VIEW_TOUR,
} from "Services/services.constants";
import { TourModel } from "utils/model/tourModel";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function postTour(values:TourModel) {
    return axiosIntercept.post(`${SERVER_URL}${TOUR_ADMIN_ADD_TOUR}`, values);
}

export function adminTour() {
  return createApi({
    method: "GET",
    url: `${TOUR_ADMIN_GET_TOUR}`,
  });
}

export function viewAdminTour(tour_id: number) {
  return createApi({
    method: "GET",
    url: `${TOUR_ADMIN_VIEW_TOUR}/${tour_id}`,
  });
}

export function paginateTour(page: number) {
   return createApi({
     method: "GET",
     url: `${TOUR_ADMIN_PAGE_TOUR}/${page}`,
   });
}

export function updateTour(values: TourModel) {
  return axiosIntercept.patch(`${SERVER_URL}${TOUR_ADMIN_UPDATE_TOUR}`, values);
}

export function getAllTourOrders() {
  return createApi({
    method: "GET",
    url: `${TOUR_ADMIN_ALL_ORDERS}`,
  });
}
