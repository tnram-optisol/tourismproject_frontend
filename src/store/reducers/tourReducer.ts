import { createSlice } from "@reduxjs/toolkit";
import {
  TourModel,
  TourOrdersModel,
  UserTourModel,
} from "utils/model/tourModel";

export interface TourState {
  value: {
    tour: UserTourModel[];
    adminTour: TourModel[];
    viewTour: TourModel[];
    tourOrders: TourOrdersModel[];
    tourOrdersCount: number;
    loading: boolean;
  };
}

const initialState: TourState = {
  value: {
    tour: [],
    adminTour: [],
    viewTour: [],
    tourOrders: [],
    tourOrdersCount: 0,
    loading: true,
  },
};

const tourSlicer = createSlice({
  name: "tour",
  initialState: initialState,
  reducers: {
    getUserTourData: () => {},
    setUserTourData: (state, action) => {
      state.value.tour = [...action.payload];
    },
    viewSingleTourData: (state, action) => {},
    setSingleTourData: (state, action) => {
      state.value.loading = false;
      state.value.viewTour = [action.payload];
    },
    getAdminTourData: () => {},
    setAdminTourData: (state, action) => {
      state.value.loading = false;
      state.value.adminTour = [...action.payload];
    },
    getAdminTourOrders: (state, payload) => {
      state.value.loading = true;
    },
    setAdminTourOrders: (state, action) => {
      state.value.loading = false;
      state.value.tourOrders = [...action.payload[0]];
      state.value.tourOrdersCount = action.payload[1];
    },
  },
});

export const {
  getUserTourData,
  setUserTourData,
  setAdminTourData,
  getAdminTourData,
  viewSingleTourData,
  setSingleTourData,
  getAdminTourOrders,
  setAdminTourOrders,
} = tourSlicer.actions;
export default tourSlicer.reducer;
