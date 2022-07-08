import { createSlice } from "@reduxjs/toolkit";
import {
  BannerModel,
  CategoryModel,
  CouponModel,
  NotificationModel,
} from "utils/model/adminModel";
import { HotelModel, HotelOrdersModel } from "utils/model/hotelModel";
import { TourModel, TourOrdersModel } from "utils/model/tourModel";
import { UserModel } from "utils/model/userModel";

export interface AdminState {
  value: {
    hotelRequests: HotelModel[];
    tourRequests: TourModel[];
    hotelRequestsCount: number;
    tourRequestsCount: number;
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
    totalNotifications: number;
    notifications: NotificationModel[];
    coupons: CouponModel[];
    totalCoupon: number;
    loading: boolean;
  };
}

const initialState: AdminState = {
  value: {
    hotelRequests: [],
    tourRequests: [],
    hotelRequestsCount: 0,
    tourRequestsCount: 0,
    banner: [],
    category: [],
    users: [],
    tourOrders: [],
    hotelOrders: [],
    notifications: [],
    coupons: [],
    totalCoupon: 0,
    totalNotifications: 0,
    totalTourOrders: 0,
    totalHotelOrders: 0,
    usersCount: 0,
    categoryCount: 0,
    bannerCount: 0,
    loading: true,
  },
};

const adminSlicer = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    getAdminHotelRequestData: (state, action) => {
      state.value.loading = true;
    },
    setAdminHotelRequestData: (state, action) => {
      if (action.payload.hotel) {
        state.value.hotelRequestsCount =
          action.payload.hotel[1] > 0
            ? action.payload.hotel[1]
            : state.value.hotelRequestsCount;
        state.value.hotelRequests =
          action.payload.hotel[0].length > 0
            ? [...action.payload.hotel[0]]
            : [...action.payload.hotel];
      } else {
        state.value.hotelRequestsCount = 0;
        state.value.hotelRequests = [];
      }
      state.value.loading = false;
    },
    getAdminTourRequestData: (state, action) => {
      state.value.loading = true;
    },
    setAdminTourRequestData: (state, action) => {
      if (action.payload.tour) {
        state.value.tourRequestsCount =
          action.payload.tour[1] > 0
            ? action.payload.tour[1]
            : state.value.tourRequestsCount;
        state.value.tourRequests =
          action.payload.tour[0].length > 0
            ? [...action.payload.tour[0]]
            : [...action.payload.tour];
      } else {
        state.value.tourRequests = [];
        state.value.tourRequestsCount = 0;
      }
      state.value.loading = false;
    },
    getAdminCategoryData: (state, action) => {
      state.value.loading = true;
    },
    setAdminCategoryData: (state, action) => {
      state.value.categoryCount =
        action.payload[1] > 0 ? action.payload[1] : state.value.categoryCount;
      if (action.payload.length > 0) {
        state.value.category =
          action.payload[0].length > 0
            ? [...action.payload[0]]
            : [...action.payload];
      } else {
        state.value.category = [];
        state.value.categoryCount = 0;
      }
      state.value.loading = false;
    },
    getAdminBannerData: (state, action) => {
      state.value.loading = true;
    },
    setAdminBannerData: (state, action) => {
      state.value.bannerCount =
        action.payload[1] > 0 ? action.payload[1] : state.value.bannerCount;
      if (action.payload.length > 0) {
        state.value.banner =
          action.payload[0].length > 0
            ? [...action.payload[0]]
            : [...action.payload];
      } else {
        state.value.banner = [];
        state.value.bannerCount = 0;
      }
      state.value.loading = false;
    },
    getAdminAllUserData: (state, action) => {
      state.value.loading = true;
    },
    setAdminAllUserData: (state, action) => {
      state.value.usersCount =
        action.payload[1] > 0 ? action.payload[1] : state.value.usersCount;
      if (action.payload.length > 0) {
        state.value.users =
          action.payload[0].length > 0
            ? [...action.payload[0]]
            : [...action.payload];
      } else {
        state.value.users = [];
        state.value.usersCount = 0;
      }
      state.value.loading = false;
    },
    getAdminTourOrdersData: (state, action) => {
      state.value.loading = true;
    },
    setAdminTourOrdersData: (state, action) => {
      if (action.payload) {
        state.value.tourOrders =
          action.payload.tourOrder[0].length > 0
            ? [...action.payload.tourOrder[0]]
            : [...action.payload.tourOrder];
        state.value.totalTourOrders =
          action.payload.tourOrder[1] > 0
            ? action.payload.tourOrder[1]
            : state.value.totalTourOrders;
      } else {
        state.value.tourOrders = [];
        state.value.totalTourOrders = 0;
      }
      state.value.loading = false;
    },
    getAdminHotelOrdersData: (state, action) => {
      state.value.loading = true;
    },
    setAdminHotelOrdersData: (state, action) => {
      if (action.payload) {
        state.value.hotelOrders =
          action.payload.hotelOrder[0].length > 0
            ? [...action.payload.hotelOrder[0]]
            : [...action.payload.hotelOrder];
        state.value.totalHotelOrders =
          action.payload.hotelOrder[1] > 0
            ? action.payload.hotelOrder[1]
            : state.value.totalHotelOrders;
      } else {
        state.value.hotelOrders = [];
        state.value.totalHotelOrders = 0;
      }
      state.value.loading = false;
    },
    getAdminNotifications: (state) => {
      state.value.loading = true;
    },
    setAdminNotifications: (state, action) => {
      state.value.notifications = action.payload.notification
        ? [...action.payload.notification]
        : [];
      state.value.totalNotifications = action.payload.notification
        ? action.payload.notification.length
        : state.value.totalNotifications;
      state.value.loading = false;
    },
    getAdminCoupon: (state, action) => {
      state.value.loading = true;
    },
    setAdminCoupon: (state, action) => {
      if (action.payload.coupons) {
        state.value.coupons = action.payload.coupons
          ? [...action.payload.coupons[0]]
          : [...action.payload.coupons];
        state.value.totalCoupon =
          action.payload.coupons[1] > 0
            ? action.payload.coupons[1]
            : state.value.totalCoupon;
      } else {
        state.value.coupons = [];
        state.value.totalCoupon = 0;
      }
      state.value.loading = false;
    },
  },
});

export const {
  getAdminBannerData,
  getAdminTourRequestData,
  getAdminHotelRequestData,
  getAdminCategoryData,
  getAdminAllUserData,
  getAdminTourOrdersData,
  getAdminHotelOrdersData,
  getAdminNotifications,
  getAdminCoupon,
  setAdminBannerData,
  setAdminHotelRequestData,
  setAdminTourRequestData,
  setAdminCategoryData,
  setAdminAllUserData,
  setAdminHotelOrdersData,
  setAdminTourOrdersData,
  setAdminNotifications,
  setAdminCoupon,
} = adminSlicer.actions;

export default adminSlicer.reducer;
