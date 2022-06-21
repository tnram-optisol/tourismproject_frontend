import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { getAllCategory } from "Services/api/userAPI";
import { getUserCategoryData, setUserCategoryData } from "store/reducers/userReducer";

type Response = SagaReturnType<typeof getAllCategory>;

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

export function* watchUserSync() {
  yield takeLatest(getUserCategoryData.type, handleSetUserCategory);
}
