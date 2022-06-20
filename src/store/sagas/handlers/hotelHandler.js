import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllHotelOrders,
  getAllHotels,
  getAllRooms,
} from "Services/api/hotelAPI";
import { getHotels, getRooms, viewRooms } from "Services/api/userAPI";
import {
  getAdminHotelData,
  getAdminHotelOrders,
  getAdminRoomData,
  getUserHotelData,
  getUserRoomData,
  setAdminHotelData,
  setAdminHotelOrders,
  setAdminRoomlData,
  setSingleRoomData,
  setUserHotelData,
  setUserRoomlData,
  viewSingleRoomData,
} from "store/reducers/hotelReducer";

export function* handleSetHotelData() {
  try {
    const response = yield call(getHotels);
    const { data } = response;
    console.log(data);
    yield put(setUserHotelData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleViewRoomData(payload) {
  console.log(payload);
  try {
    const response = yield call(viewRooms, payload.payload);
    const { data } = response;
    console.log(data);
    yield put(setSingleRoomData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetRoomData(payload) {
  console.log(payload);
  try {
    const response = yield call(getRooms, payload.payload);
    const { data } = response;
    console.log(data);
    yield put(setUserRoomlData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleAdminHotelData() {
  try {
    const response = yield call(getAllHotels);
    const { data } = response;
    console.log(data);
    yield put(setAdminHotelData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleAdminRoomData(payload) {
  console.log(payload);
  try {
    const response = yield call(getAllRooms, payload.payload);
    const { data } = response;
    console.log(data);
    yield put(setAdminRoomlData(data));
  } catch (err) {
    console.log(err);
  }
}
export function* handleSetAdminHotelOrders() {
  try {
    const response = yield call(getAllHotelOrders);
    const { data } = response;
    console.log(data);
    yield put(setAdminHotelOrders(data));
  } catch (err) {
    console.log(err);
  }
}
export function* watchHotelSync() {
  yield takeLatest(getUserHotelData.type, handleSetHotelData);
  yield takeLatest(getUserRoomData.type, handleSetRoomData);
  yield takeLatest(getAdminHotelData.type, handleAdminHotelData);
  yield takeLatest(getAdminRoomData.type, handleAdminRoomData);
  yield takeLatest(viewSingleRoomData.type, handleViewRoomData);
  yield takeLatest(getAdminHotelOrders.type, handleSetAdminHotelOrders);
}
