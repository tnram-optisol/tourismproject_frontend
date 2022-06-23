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
    canceledOrders: OrdersModel[];
    loading: boolean;
  };
}

const initialState: UserState = {
  value: {
    category: [],
    loading: true,
    hotelOrders: [],
    tourOrders: [],
    canceledOrders:[]
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
    getUserCanceledOrders: (state) => {
      state.value.loading = true;
    },
    setUserCanceledOrders: (state, action) => {
      state.value.canceledOrders =[...action.payload]
      state.value.loading = false;
    },
  },
});

export const {
  getUserCategoryData,
  setUserCategoryData,
  getUserBookingData,
  setUserBookingData,
  setUserCanceledOrders,
  getUserCanceledOrders
} = userSlicer.actions;

export default userSlicer.reducer;
