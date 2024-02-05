
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice"; 

const storedIdToken = localStorage.getItem("idToken");
const storedEmail=localStorage.getItem("email");
const storedTheme = localStorage.getItem("theme");

const store = configureStore({
  reducer: {
    auth: authReducer,    
    theme: themeReducer, 
  },
  preloadedState: {
    auth: {
      idToken: storedIdToken || null,
      isAuthenticated: !!storedIdToken,
      email:storedEmail || null,
    },
    theme: {
      isDarkTheme: storedTheme === "dark", 
    },
  },
});

export default store;
