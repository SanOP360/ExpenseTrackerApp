import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  idToken: localStorage.getItem("idToken") || null,
  isAuthenticated: !!localStorage.getItem("idToken"),
  email: localStorage.getItem("email") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.idToken = action.payload;
      state.isAuthenticated = true;
      state.email=action.payload;
      localStorage.setItem("email",action.payload)
      localStorage.setItem("idToken", action.payload);
    },
    
    logout(state) {
      state.idToken = null;
      state.isAuthenticated = false;
      state.email=null;
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
      
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
