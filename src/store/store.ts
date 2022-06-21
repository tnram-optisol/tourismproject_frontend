import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import tourReducer from "./reducers/tourReducer";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import hotelReducer from "./reducers/hotelReducer";
import adminReducer from "./reducers/adminReducer";
import userReducer from "./reducers/userReducer";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
    hotel: hotelReducer,
    admin: adminReducer,
    user: userReducer,
  },
  middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(watcherSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
