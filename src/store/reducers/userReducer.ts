import { createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "store/model/adminModel";

export interface UserState {
  value: {
    category: CategoryModel[];
    loading: boolean;
  };
}

const initialState: UserState = {
  value: {
    category: [],
    loading: true,
  },
};

const adminSlicer = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: {
    getUserCategoryData: (state) => {
      state.value.loading = true;
    },
    setUserCategoryData: (state, action) => {
      state.value.category = [...action.payload];
      state.value.loading = false;
    },
  },
});

export const { getUserCategoryData, setUserCategoryData } = adminSlicer.actions;

export default adminSlicer.reducer;
