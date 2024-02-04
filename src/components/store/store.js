
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice"; 

const storedIdToken = localStorage.getItem("idToken");
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
    },
    theme: {
      isDarkTheme: storedTheme === "dark", 
    },
  },
});

export default store;
