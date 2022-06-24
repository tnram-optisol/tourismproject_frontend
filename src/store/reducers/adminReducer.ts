import { createSlice } from "@reduxjs/toolkit";
import {
  BannerModel,
  CategoryModel,
  OrdersModel,
  RequestModel,
} from "utils/model/adminModel";
import { HotelOrdersModel } from "utils/model/hotelModel";
import { TourOrdersModel } from "utils/model/tourModel";
import { UserModel } from "utils/model/userModel";

export interface AdminState {
  value: {
    requests: RequestModel[];
    banner: BannerModel[];
    users: UserModel[];
    category: CategoryModel[];
    tourOrders: TourOrdersModel[];
    hotelOrders: HotelOrdersModel[];
    totalTourOrders: number;
    totalHotelOrders: number;
    usersCount: number;
    categoryCount: number;
    bannerCount: number;
    loading: boolean;
  };
}

const initialState: AdminState = {
  value: {
    requests: [],
    banner: [],
    category: [],
    users: [],
    tourOrders: [],
    hotelOrders: [],
    totalTourOrders: 0,
    totalHotelOrders: 0,
    usersCount: 0,
    categoryCount: 0,
    bannerCount: 0,
    loading: true,
  },
};

const adminSlicer = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: {
    getAdminRequestData: (state) => {
      state.value.loading = true;
    },
    setAdminRequestData: (state, action) => {
      console.log(action.payload);
      state.value.requests = [...action.payload.hotel, ...action.payload.tour];
      state.value.loading = false;
    },
    getAdminCategoryData: (state, action) => {
      state.value.loading = true;
    },
    setAdminCategoryData: (state, action) => {
      state.value.categoryCount =
        action.payload[1] > 0 ? action.payload[1] : state.value.categoryCount;
      state.value.category =
        action.payload[0].length > 0
          ? [...action.payload[0]]
          : [...action.payload];
      state.value.loading = false;
    },
    getAdminBannerData: (state, action) => {
      state.value.loading = true;
    },
    setAdminBannerData: (state, action) => {
      state.value.bannerCount =
        action.payload[1] > 0 ? action.payload[1] : state.value.bannerCount;
      state.value.banner =
        action.payload[0].length > 0
          ? [...action.payload[0]]
          : [...action.payload];
      state.value.loading = false;
    },
    getAdminAllUserData: (state, action) => {
      state.value.loading = true;
    },
    setAdminAllUserData: (state, action) => {
      state.value.usersCount =
        action.payload[1] > 0 ? action.payload[1] : state.value.usersCount;
      state.value.users =
        action.payload[0].length > 0
          ? [...action.payload[0]]
          : [...action.payload];
      state.value.loading = false;
    },
    getAdminOrdersData: (state, action) => {
      state.value.loading = true;
    },
    setAdminOrdersData: (state, action) => {
      state.value.loading = false;
      state.value.totalTourOrders = action.payload.tourOrder[1];
      state.value.tourOrders = [...action.payload.tourOrder[0]];
      state.value.totalHotelOrders = action.payload.hotelOrder[1];
      state.value.hotelOrders = [...action.payload.hotelOrder[0]];
    },
  },
});

export const {
  getAdminBannerData,
  getAdminRequestData,
  getAdminCategoryData,
  getAdminAllUserData,
  getAdminOrdersData,
  setAdminBannerData,
  setAdminCategoryData,
  setAdminRequestData,
  setAdminAllUserData,
  setAdminOrdersData,
} = adminSlicer.actions;

export default adminSlicer.reducer;
