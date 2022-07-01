import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { ordersPaginate } from "Services/api/ordersAPI";
import { getAllCategory, viewProfile } from "Services/api/userAPI";
import {
  getUserBookingData,
  getUserCanceledOrders,
  getUserCategoryData,
  getUserProfileData,
  setUserBookingData,
  setUserCanceledOrders,
  setUserCategoryData,
  setUserProfileData,
} from "store/reducers/userReducer";

type Response = SagaReturnType<typeof getAllCategory>;
type PaginateResponse = SagaReturnType<typeof ordersPaginate>;

export function* handleSetUserProfile() {
  try {
    const response: SagaReturnType<typeof viewProfile> = yield call(
      viewProfile
    );
    const { data } = response;
    console.log(data);
    yield put(setUserProfileData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetUserCategory() {
  try {
    const response: Response = yield call(getAllCategory);
    const { data } = response;
    console.log(data);
    yield put(setUserCategoryData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetUserAllOrders(payload: {
  payload: {
    id: any;
    page: number;
    limit: number;
    searchQuery: string | undefined;
  };
  type: typeof getUserBookingData;
}) {
  try {
    const response: PaginateResponse = yield call(
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

export function* handleSetUserCanceledOrders(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof getUserCanceledOrders;
}) {
  try {
    const response: PaginateResponse = yield call(
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
  yield takeLatest(getUserProfileData.type, handleSetUserProfile);
  yield takeLatest(getUserCategoryData.type, handleSetUserCategory);
  yield takeLatest(getUserBookingData.type, handleSetUserAllOrders);
  yield takeLatest(getUserCanceledOrders.type, handleSetUserCanceledOrders);
}
