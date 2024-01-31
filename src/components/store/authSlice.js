import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  idToken: localStorage.getItem("idToken") || null,
  isAuthenticated: !!localStorage.getItem("idToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.idToken = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("idToken", action.payload);
    },
    logout(state) {
      state.idToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("idToken");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
