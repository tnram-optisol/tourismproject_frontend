import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { adminTour, paginateOrders } from "Services/api/toursAPI";
import { getTour, viewTour } from "Services/api/userAPI";
import {
  setUserTourData,
  setAdminTourData,
  setSingleTourData,
  getUserTourData,
  viewSingleTourData,
  getAdminTourData,
  getAdminTourOrders,
  setAdminTourOrders,
} from "store/reducers/tourReducer";

export function* handleSetTourData() {
  try {
    const response: SagaReturnType<typeof getTour> = yield call(getTour);
    const { data } = response;
    yield put(setUserTourData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleViewTourData(payload: {
  payload: number;
  type: typeof viewSingleTourData;
}) {
  try {
    const response: SagaReturnType<typeof viewTour> = yield call(
      viewTour,
      payload.payload
    );
    const { data } = response;
    yield put(setSingleTourData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetAdminTourData() {
  try {
    const response: SagaReturnType<typeof adminTour> = yield call(adminTour);
    const { data } = response;
    yield put(setAdminTourData(data));
  } catch (err) {
    console.log(err);
  }
}

export function* handleSetAdminOrdersData(payload: {
  payload: { page: number; limit: number; searchQuery: string | undefined };
  type: typeof getAdminTourOrders;
}) {
  try {
    const response: SagaReturnType<typeof paginateOrders> = yield call(
      paginateOrders,
      "/tour/all/orders",
      payload.payload.page,
      payload.payload.limit,
      payload.payload.searchQuery
    );
    const { data } = response;
    yield put(setAdminTourOrders(data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchTourSync() {
  yield takeLatest(getUserTourData.type, handleSetTourData);
  yield takeLatest(viewSingleTourData.type, handleViewTourData);
  yield takeLatest(getAdminTourData.type, handleSetAdminTourData);
  yield takeLatest(getAdminTourOrders.type, handleSetAdminOrdersData);
}
