import { call, put, takeLatest } from "redux-saga/effects";
import { ordersPaginate } from "Services/api/ordersAPI";
import { getAllCategory } from "Services/api/userAPI";
import {
  getUserBookingData,
  getUserCanceledOrders,
  getUserCategoryData,
  setUserBookingData,
  setUserCanceledOrders,
  setUserCategoryData,
} from "store/reducers/userReducer";

export function* handleSetUserCategory() {
  try {
    const response = yield call(getAllCategory);
    const { data } = response;
    console.log(data);
    yield put(setUserCategoryData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetUserAllOrders(payload) {
  try {
    const response = yield call(
      ordersPaginate,
      `/bookings/${payload.payload.id}`,
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    console.log(data);
    yield put(setUserBookingData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetUserCanceledOrders(payload) {
  try {
    const response = yield call(
      ordersPaginate,
      "/cancel/orders",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    console.log(data);
    yield put(setUserCanceledOrders(data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchUserSync() {
  yield takeLatest(getUserCategoryData.type, handleSetUserCategory);
  yield takeLatest(getUserBookingData.type, handleSetUserAllOrders);
  yield takeLatest(getUserCanceledOrders.type, handleSetUserCanceledOrders);
}
