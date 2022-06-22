import { createSlice } from "@reduxjs/toolkit";
import { BannerModel, CategoryModel, OrdersModel, RequestModel } from "utils/model/adminModel";
import { UserModel } from "utils/model/userModel";

export interface AdminState{
  value: {
    requests: RequestModel[];
    banner: BannerModel[];
    users: UserModel[];
    category: CategoryModel[];
    orders: OrdersModel[];
    loading: boolean;
  }
}

const initialState:AdminState = {
  value: {
    requests: [],
    banner: [],
    category: [],
    users: [],
    orders:[],
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
    getAdminCategoryData: (state) => {
      state.value.loading = true;
    },
    setAdminCategoryData: (state, action) => {
      state.value.category = [...action.payload];
      state.value.loading = false;
    },
    getAdminBannerData: (state) => {
      state.value.loading = true;
    },
    setAdminBannerData: (state, action) => {
      state.value.loading = false;
      state.value.banner = [...action.payload];
    },
    getAdminAllUserData: (state) => {
      state.value.loading = true;
    },
    setAdminAllUserData: (state, action) => {
      state.value.users = [...action.payload[0]];
    },
    getAdminOrdersData: (state) => {
      state.value.loading = true;
    },
    setAdminOrdersData: (state, action) => {
      state.value.loading = false;
      state.value.orders = [...action.payload];
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
  setAdminOrdersData
} = adminSlicer.actions;

export default adminSlicer.reducer;
