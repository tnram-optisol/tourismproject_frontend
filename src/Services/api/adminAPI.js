import {
  ADMIN_APPROVAL,
  ADMIN_DELETE_CATEGORY,
  ADMIN_GET_BANNER,
  ADMIN_GET_CATEGORY,
  ADMIN_POST_CATEGORY,
  ADMIN_REQUEST,
  ADMIN_SEQUENCE,
  ADMIN_UPDATE_TOUR,
  ADMIN_VIEW_TOUR,
  ALL_ORDERS,
  ALL_USERS,
} from "Services/services.constants";
import axiosIntercept from "../axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getUserRequest() {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_REQUEST}`);
}

export function adminApproval() {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_APPROVAL}`);
}

export function adminApproveRequest(data) {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_APPROVAL}`, {
    user: data.user,
    role: data.user.role.id,
    status: true,
    sequence: data.sequence,
    property:data.property
  });
}

export function adminRejectRequest(data) {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_APPROVAL}`, {
    user: data.user,
    role: data.user.role.id,
    status: false,
    sequence: data.sequence,
  });
}

export function getEmail(endPoint) {
  return axiosIntercept.get(`${SERVER_URL}${endPoint}`);
}

export function getBanner() {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_GET_BANNER}`);
}

export function getCategory() {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_GET_CATEGORY}`);
}

export function adminSequence(values) {
  return axiosIntercept.patch(`${SERVER_URL}${ADMIN_SEQUENCE}`, values);
}

export function adminPostCategory(values) {
  return axiosIntercept.post(`${SERVER_URL}${ADMIN_POST_CATEGORY}`, values);
}

export function adminPostTourUpdate(values) {
  const tour = values;
  return axiosIntercept.post(`${SERVER_URL}${ADMIN_UPDATE_TOUR}`, { tour });
}

export function adminRemoveCategory(id) {
  return axiosIntercept.delete(`${SERVER_URL}${ADMIN_DELETE_CATEGORY}/${id}`);
}

export function adminGetTour(id) {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_VIEW_TOUR}/${id}`);
}

export function adminGetUsers() {
  return axiosIntercept.get(`${SERVER_URL}${ALL_USERS}`);
}

export function adminGetOrders() {
  return axiosIntercept.get(`${SERVER_URL}${ALL_ORDERS}`);
}
