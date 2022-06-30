import { createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "utils/model/adminModel";
import { BookRoomModel, HotelOrdersModel } from "utils/model/hotelModel";
import { BookTourModel, TourOrdersModel } from "utils/model/tourModel";

export interface UserState {
  value: {
    category: CategoryModel[];
    hotelOrders: BookRoomModel[];
    tourOrders: BookTourModel[];
    totalTourOrders: number;
    canceledTourOrders: TourOrdersModel[];
    canceledHotelOrders: HotelOrdersModel[];
    totalTourCanceledOrders: number;
    totalHotelCanceledOrders: number;
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
    canceledTourOrders: [],
    canceledHotelOrders: [],
    totalTourCanceledOrders: 0,
    totalHotelCanceledOrders: 0,
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
      if (action.payload.tourOrder[1] > 0) {
        state.value.canceledTourOrders =
          action.payload.tourOrder[0].length > 0
            ? [...action.payload.tourOrder[0]]
            : [...action.payload.tourOrder];
        state.value.totalTourCanceledOrders =
          action.payload.tourOrder[1] > 0
            ? action.payload.tourOrder[1]
            : state.value.totalTourCanceledOrders;
        state.value.loading = false;
      } else {
        state.value.totalTourCanceledOrders = 0;
        state.value.canceledTourOrders = [];
        state.value.loading = false;
      }
      if (action.payload.hotelOrder[1] > 0) {
        state.value.canceledHotelOrders =
          action.payload.hotelOrder[0].length > 0
            ? [...action.payload.hotelOrder[0]]
            : [...action.payload.hotelOrder];
        state.value.totalHotelCanceledOrders =
          action.payload.hotelOrder[1] > 0
            ? action.payload.hotelOrder[1]
            : state.value.totalHotelCanceledOrders;
        state.value.loading = false;
      } else {
        state.value.totalHotelCanceledOrders = 0;
        state.value.canceledHotelOrders = [];
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
