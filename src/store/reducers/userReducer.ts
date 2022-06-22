import { createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "utils/model/adminModel";
import { BookRoomModel } from "utils/model/hotelModel";
import { BookTourModel } from "utils/model/tourModel";

export interface UserState {
  value: {
    category: CategoryModel[];
    hotelOrders: BookRoomModel[];
    tourOrders: BookTourModel[];
    loading: boolean;
  };
}

const initialState: UserState = {
  value: {
    category: [],
    loading: true,
    hotelOrders: [],
    tourOrders: [],
  },
};

const userSlicer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserCategoryData: (state) => {
      state.value.loading = true;
    },
    setUserCategoryData: (state, action) => {
      state.value.category = [...action.payload];
      state.value.loading = false;
    },
    getUserBookingData: (state, action) => {
      state.value.loading = true;
    },
    setUserBookingData: (state, action) => {
      state.value.hotelOrders = [...action.payload.roomBooking];
      state.value.tourOrders = [...action.payload.tourBooking];
      state.value.loading = false;
    },
    getUserCanceledOrders: (state, action) => {
      state.value.loading = true;
    },
    setUserCanceledOrders: (state, action) => {
      state.value.loading = false;
    },
  },
});

export const {
  getUserCategoryData,
  setUserCategoryData,
  getUserBookingData,
  setUserBookingData,
} = userSlicer.actions;

export default userSlicer.reducer;
