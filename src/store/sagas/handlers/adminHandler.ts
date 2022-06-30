import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { adminNotification, adminPaginate } from "Services/api/adminAPI";
import {
  getAdminAllUserData,
  getAdminBannerData,
  getAdminCategoryData,
  getAdminHotelOrdersData,
  getAdminHotelRequestData,
  getAdminNotifications,
  getAdminTourOrdersData,
  getAdminTourRequestData,
  setAdminAllUserData,
  setAdminBannerData,
  setAdminCategoryData,
  setAdminHotelOrdersData,
  setAdminHotelRequestData,
  setAdminNotifications,
  setAdminTourOrdersData,
  setAdminTourRequestData,
} from "store/reducers/adminReducer";

export function* setAdminBannerHandler(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof adminPaginate;
}) {
  try {
    const response: SagaReturnType<typeof adminPaginate> = yield call(
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

export function* setAdminHotelRequestHandler(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof adminPaginate;
}) {
  try {
    const response: SagaReturnType<typeof adminPaginate> = yield call(
      adminPaginate,
      "/admin/request/hotel",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    console.log(data);
    yield put(setAdminHotelRequestData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminTourRequestHandler(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof adminPaginate;
}) {
  try {
    const response: SagaReturnType<typeof adminPaginate> = yield call(
      adminPaginate,
      "/admin/request/tour",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    console.log(data);
    yield put(setAdminTourRequestData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminHotelOrdersHandler(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof adminPaginate;
}) {
  try {
    const response: SagaReturnType<typeof adminPaginate> = yield call(
      adminPaginate,
      "/admin/hotel/orders",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    console.log(data);
    yield put(setAdminHotelOrdersData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminTourOrdersHandler(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof adminPaginate;
}) {
  try {
    const response: SagaReturnType<typeof adminPaginate> = yield call(
      adminPaginate,
      "/admin/tour/orders",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    console.log(data);
    yield put(setAdminTourOrdersData(data));
  } catch (err) {
    console.log(err);
  }
}
export function* setAdminCategoryHandler(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof adminPaginate;
}) {
  console.log(payload);
  try {
    const response: SagaReturnType<typeof adminPaginate> = yield call(
      adminPaginate,
      "/admin/category",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    console.log(data);
    yield put(setAdminCategoryData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* setAdminAllUsersHandler(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof adminPaginate;
}) {
  try {
    const response: SagaReturnType<typeof adminPaginate> = yield call(
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

export function* setAdminNotificationsHandler(payload: any) {
  try {
    const response: SagaReturnType<typeof adminNotification> = yield call(
      adminNotification
    );
    const { data } = response;
    console.log(data);
    yield put(setAdminNotifications(data));
  } catch (err) {
    console.log(err);
  }
}
export function* watchAdminSync() {
  yield takeLatest(getAdminBannerData.type, setAdminBannerHandler);
  yield takeLatest(getAdminCategoryData.type, setAdminCategoryHandler);
  yield takeLatest(getAdminTourRequestData.type, setAdminTourRequestHandler);
  yield takeLatest(getAdminHotelRequestData.type, setAdminHotelRequestHandler);
  yield takeLatest(getAdminTourOrdersData.type, setAdminTourOrdersHandler);
  yield takeLatest(getAdminHotelOrdersData.type, setAdminHotelOrdersHandler);
  yield takeLatest(getAdminAllUserData.type, setAdminAllUsersHandler);
  yield takeLatest(getAdminNotifications.type, setAdminNotificationsHandler);
}
