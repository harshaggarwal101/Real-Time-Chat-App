import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData:null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, value) => {
      state.userData = value.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
