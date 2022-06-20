import { call, put, takeLatest } from "redux-saga/effects";
import { adminGetOrders, adminGetUsers, getBanner, getCategory, getUserRequest } from "Services/api/adminAPI";
import {
  getAdminAllUserData,
  getAdminBannerData,
  getAdminCategoryData,
  getAdminOrdersData,
  getAdminRequestData,
  setAdminAllUserData,
  setAdminBannerData,
  setAdminCategoryData,
  setAdminOrdersData,
  setAdminRequestData,
} from "store/reducers/adminReducer";

export function* setAdminBannerHandler() {
  try {
    const response = yield call(getBanner);
    const { data } = response;
    console.log(data);
    yield put(setAdminBannerData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminRequestHandler() {
  try {
    const response = yield call(getUserRequest);
    const { data } = response;
    console.log(data);
    yield put(setAdminRequestData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminCategoryHandler() {
  try {
    const response = yield call(getCategory);
    const { data } = response;
    console.log(data);
    yield put(setAdminCategoryData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminAllUsersHandler() {
  try {
    const response = yield call(adminGetUsers);
    const { data } = response;
    console.log(data);
    yield put(setAdminAllUserData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminAllOrdersHandler() {
  try {
    const response = yield call(adminGetOrders);
    const { data } = response;
    console.log(data);
    yield put(setAdminOrdersData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchAdminSync() {
  yield takeLatest(getAdminBannerData.type, setAdminBannerHandler);
  yield takeLatest(getAdminCategoryData.type, setAdminCategoryHandler);
  yield takeLatest(getAdminRequestData.type, setAdminRequestHandler);
  yield takeLatest(getAdminAllUserData.type, setAdminAllUsersHandler);
  yield takeLatest(getAdminOrdersData.type, setAdminAllOrdersHandler);
}
