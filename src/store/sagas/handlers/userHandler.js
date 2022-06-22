import { call, put, SagaReturnType, takeEvery, takeLatest } from "redux-saga/effects";
import { getActiveBookings } from "Services/api/bookingAPI";
import { getAllCategory } from "Services/api/userAPI";
import {
  getUserBookingData,
  getUserCategoryData,
  setUserBookingData,
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
      getActiveBookings,
      payload.payload
    );
    const { data } = response;
    console.log(data);
    yield put(setUserBookingData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchUserSync() {
  yield takeLatest(getUserCategoryData.type, handleSetUserCategory);
  yield takeEvery(getUserBookingData.type, handleSetUserAllOrders);
}
