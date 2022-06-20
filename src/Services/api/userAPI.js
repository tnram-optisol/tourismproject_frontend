import {
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
    return axiosIntercept.get(`${SERVER_URL}${USER_GET_TOUR}`);
}

export function filterTourData(category) {
    return axiosIntercept.get(`${SERVER_URL}${USER_FILTER_TOUR}/${category}`);
}

export function searchTourData(query) {
    return axiosIntercept.get(`${SERVER_URL}${USER_SEARCH_TOUR}/${query}`);
}

export function getHotels(endPoint) {
    return axiosIntercept.get(`${SERVER_URL}${USER_GET_HOTEL}`);
}

export function getRooms(hotel_id) {
    return axiosIntercept.get(`${SERVER_URL}${USER_GET_ROOMS}/${hotel_id}`);
}

export function viewRooms(room_id) {
    return axiosIntercept.get(`${SERVER_URL}${USER_VIEW_ROOMS}/${room_id}`);
}

export function viewTour(tour_id) {
    return axiosIntercept.get(`${SERVER_URL}${USER_VIEW_TOUR}/${tour_id}`);
}

export function getReview(tour_id) {
    return axiosIntercept.get(`${SERVER_URL}${USER_GET_REVIEW}/${tour_id}`);
}

export function getRating(tour_id) {
    return axiosIntercept.get(`${SERVER_URL}${USER_GET_RATING}/${tour_id}`);
}

export function postReview(values) {
    const user = values;
    console.log(values);
    return axiosIntercept.post(`${SERVER_URL}${USER_POST_REVIEW}`, user);
}

export function contactAdmin(values) {
    const user = values;
    console.log(values);
    return axiosIntercept.post(`${SERVER_URL}${MAIL_TO_ADMIN}`, user);
}
