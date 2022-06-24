import { createSlice } from "@reduxjs/toolkit";
import {
  HotelModel,
  HotelOrdersModel,
  RoomModel,
} from "utils/model/hotelModel";

export interface HotelState {
  value: {
    hotel: HotelModel[];
    room: RoomModel[];
    viewRoom: RoomModel[];
    hotelOrders: HotelOrdersModel[];
    totalHotelOrders: number;
    loading: boolean;
  };
}

const initialState: HotelState = {
  value: {
    hotel: [],
    room: [],
    viewRoom: [],
    hotelOrders: [],
    totalHotelOrders: 0,
    loading: true,
  },
};

const hotelSlicer = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: {
    getUserHotelData: () => {},
    setUserHotelData: (state, action) => {
      state.value.hotel = [...action.payload];
    },
    getUserRoomData: (state, action) => {},
    setUserRoomlData: (state, action) => {
      state.value.room = [...action.payload];
    },
    viewSingleRoomData: (state, action) => {
      state.value.loading = true;
    },
    setSingleRoomData: (state, action) => {
      state.value.loading = false;
      state.value.viewRoom = [action.payload];
    },
    getAdminHotelData: (state) => {
      state.value.loading = true;
    },
    setAdminHotelData: (state, action) => {
      state.value.loading = false;
      state.value.hotel = [...action.payload];
    },
    getAdminRoomData: (state, action) => {},
    setAdminRoomlData: (state, action) => {
      state.value.loading = false;
      state.value.room = [...action.payload];
    },
    getAdminHotelOrders: (state, action) => {
      state.value.loading = true;
    },
    setAdminHotelOrders: (state, action) => {
      state.value.loading = false;
      state.value.hotelOrders = [...action.payload[0]];
      state.value.totalHotelOrders = action.payload[1];
    },
  },
});

export const {
  getUserHotelData,
  setUserHotelData,
  getUserRoomData,
  setUserRoomlData,
  getAdminHotelData,
  setAdminHotelData,
  getAdminRoomData,
  setAdminRoomlData,
  viewSingleRoomData,
  setSingleRoomData,
  getAdminHotelOrders,
  setAdminHotelOrders,
} = hotelSlicer.actions;
export default hotelSlicer.reducer;
