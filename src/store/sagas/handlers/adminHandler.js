import { call, put, takeLatest } from "redux-saga/effects";
import {
  adminGetOrders,
  adminGetUsers,
  adminPaginate,
  getUserRequest,
} from "Services/api/adminAPI";
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

export function* setAdminBannerHandler(payload) {
  try {
    const response = yield call(
      adminPaginate,
      "/admin/banner",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
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

export function* setAdminCategoryHandler(payload) {
  console.log(payload);
  try {
    const response = yield call(
      adminPaginate,
      "/admin/category",
      payload.payload.page,
      payload.payload.limit
    );
    const { data } = response;
    console.log(data);
    yield put(setAdminCategoryData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminAllUsersHandler(payload) {
  try {
    const response = yield call(
      adminPaginate,
      "/admin/all/users",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    console.log(data);
    yield put(setAdminAllUserData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminAllOrdersHandler(payload) {
  try {
    const response = yield call(
      adminPaginate,
      "/admin/all/orders",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
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
