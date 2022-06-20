import { call, put, takeLatest } from "redux-saga/effects";
import { adminTour, getAllTourOrders } from "Services/api/toursAPI";
import { getTour, viewTour } from "Services/api/userAPI";
import {
  setUserTourData,
  setAdminTourData,
  setSingleTourData,
  getUserTourData,
  viewSingleTourData,
  getAdminTourData,
  setAdminTourOrders,
  getAdminTourOrders,
} from "store/reducers/tourReducer";

export function* handleSetTourData() {
  try {
    const response = yield call(getTour);
    const { data } = response;
    console.log(data);
    yield put(setUserTourData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleViewTourData(payload) {
  try {
    const response = yield call(viewTour, payload.payload);
    const { data } = response;
    console.log(data);
    yield put(setSingleTourData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetAdminTourData() {
  try {
    const response = yield call(adminTour);
    const { data } = response;
    console.log(data);
    yield put(setAdminTourData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetAdminOrdersData() {
  try {
    const response = yield call(getAllTourOrders);
    const { data } = response;
    console.log(data);
    yield put(setAdminTourOrders(data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchTourSync(){
  yield takeLatest(getUserTourData.type, handleSetTourData);
  yield takeLatest(viewSingleTourData.type,handleViewTourData);
  yield takeLatest(getAdminTourData.type, handleSetAdminTourData);
  yield takeLatest(getAdminTourOrders.type,handleSetAdminOrdersData)
}