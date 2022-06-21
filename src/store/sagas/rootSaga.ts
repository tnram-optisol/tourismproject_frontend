import { all } from "redux-saga/effects";
import { watchAdminSync } from "./handlers/adminHandler";
import { watchHotelSync } from "./handlers/hotelHandler";
import { watchTourSync } from "./handlers/tourHandler";
import { watchUserSync } from "./handlers/userHandler";

export function* watcherSaga() {
  yield all([
    watchTourSync(),
    watchHotelSync(),
    watchAdminSync(),
    watchUserSync(),
  ]);
}
