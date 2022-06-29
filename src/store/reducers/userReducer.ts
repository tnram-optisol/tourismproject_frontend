import { createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "utils/model/adminModel";
import { BookRoomModel } from "utils/model/hotelModel";
import { BookTourModel } from "utils/model/tourModel";
import { OrdersModel } from "utils/model/userModel";

export interface UserState {
  value: {
    category: CategoryModel[];
    hotelOrders: BookRoomModel[];
    tourOrders: BookTourModel[];
    totalTourOrders: number;
    canceledOrders: OrdersModel[];
    totalCanceledOrders: number;
    totalHotelOrders: number;
    loading: boolean;
  };
}

const initialState: UserState = {
  value: {
    category: [],
    loading: true,
    hotelOrders: [],
    tourOrders: [],
    canceledOrders: [],
    totalCanceledOrders: 0,
    totalTourOrders: 0,
    totalHotelOrders: 0,
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
      if (action.payload.roomBooking[1] > 0) {
        state.value.hotelOrders =
          action.payload.roomBooking[0].length > 0
            ? [...action.payload.roomBooking[0]]
            : [...action.payload.roomBooking];
        state.value.totalHotelOrders =
          action.payload.roomBooking[1] > 0
            ? action.payload.roomBooking[1]
            : state.value.totalHotelOrders;
      } else if (action.payload.tourBooking[1] > 0) {
        state.value.tourOrders =
          action.payload.tourBooking[0].length > 0
            ? [...action.payload.tourBooking[0]]
            : [...action.payload.tourBooking];
        state.value.totalTourOrders =
          action.payload.tourBooking[1] > 0
            ? action.payload.tourBooking[1]
            : state.value.totalTourOrders;
      } else {
        state.value.totalTourOrders = 0;
        state.value.totalHotelOrders = 0;
        state.value.tourOrders = [];
        state.value.hotelOrders = [];
      }
      state.value.loading = false;
    },
    getUserCanceledOrders: (state, payload) => {
      state.value.loading = true;
    },
    setUserCanceledOrders: (state, action) => {
      if (action.payload[1] > 0 || action.payload[0].length > 0) {
        state.value.canceledOrders =
          action.payload[0].length > 0
            ? [...action.payload[0]]
            : [...action.payload];
        state.value.totalCanceledOrders =
          action.payload[1] > 0
            ? action.payload[1]
            : state.value.totalCanceledOrders;
        state.value.loading = false;
      } else {
        state.value.canceledOrders = [];
        state.value.totalCanceledOrders = 0;
        state.value.loading = false;
      }
    },
  },
});

export const {
  getUserCategoryData,
  setUserCategoryData,
  getUserBookingData,
  setUserBookingData,
  setUserCanceledOrders,
  getUserCanceledOrders,
} = userSlicer.actions;

export default userSlicer.reducer;
