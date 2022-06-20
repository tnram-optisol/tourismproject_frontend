import { createSlice } from "@reduxjs/toolkit";
import { TourModel, TourOrdersModel, UserTourModel } from "store/model/tourModel";

export interface TourState {
  value: {
    tour: UserTourModel[];
    adminTour: TourModel[];
    viewTour: TourModel[];
    tourOrders: TourOrdersModel[];
    loading: boolean;
  };
}

const initialState: TourState = {
  value: {
    tour: [],
    adminTour: [],
    viewTour: [],
    tourOrders: [],
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
    viewSingleTourData: (state,action) => {},
    setSingleTourData: (state, action) => {
      state.value.loading = false;
      state.value.viewTour = [action.payload];
    },
    getAdminTourData: () => {},
    setAdminTourData: (state, action) => {
      state.value.loading = false;
      state.value.adminTour = [...action.payload];
    },
    getAdminTourOrders: () => {},
    setAdminTourOrders: (state, action) => {
      state.value.loading = false;
      state.value.tourOrders = [...action.payload];
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
