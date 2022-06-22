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
import { UserModel } from "utils/model/userModel";
import axiosIntercept from "../axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getUserRequest() {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_REQUEST}`);
}

export function adminApproval() {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_APPROVAL}`);
}

export function adminApproveRequest(data: {
  user: UserModel;
  role?: any;
  status?: boolean;
  property: number;
  sequence: number;
}) {
  return axiosIntercept.patch(`${SERVER_URL}${ADMIN_APPROVAL}`, {
    user: data.user,
    role: data.user.role.id,
    status: true,
    sequence: data.sequence,
    property: data.property,
  });
}

export function adminRejectRequest(data: {
  user: any;
  role?: any;
  status?: boolean;
  sequence: any;
  property: number;
}) {
  return axiosIntercept.patch(`${SERVER_URL}${ADMIN_APPROVAL}`, {
    user: data.user,
    role: data.user.role.id,
    status: false,
    sequence: data.sequence,
    property: data.property,
  });
}

export function getEmail(endPoint: any) {
  return axiosIntercept.get(`${SERVER_URL}${endPoint}`);
}

export function getBanner() {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_GET_BANNER}`);
}

export function getCategory() {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_GET_CATEGORY}`);
}

export function adminSequence(values: any) {
  return axiosIntercept.patch(`${SERVER_URL}${ADMIN_SEQUENCE}`, values);
}

export function adminPostCategory(values: any) {
  return axiosIntercept.post(`${SERVER_URL}${ADMIN_POST_CATEGORY}`, values);
}

export function adminPostTourUpdate(values: any) {
  const tour = values;
  return axiosIntercept.post(`${SERVER_URL}${ADMIN_UPDATE_TOUR}`, { tour });
}

export function adminRemoveCategory(id: number) {
  return axiosIntercept.delete(`${SERVER_URL}${ADMIN_DELETE_CATEGORY}/${id}`);
}

export function adminGetTour(id: number) {
  return axiosIntercept.get(`${SERVER_URL}${ADMIN_VIEW_TOUR}/${id}`);
}

export function adminGetUsers() {
  return axiosIntercept.get(`${SERVER_URL}${ALL_USERS}`);
}

export function adminGetOrders() {
  return axiosIntercept.get(`${SERVER_URL}${ALL_ORDERS}`);
}
