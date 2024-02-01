// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./ExpenseSlice";
import themeReducer from "./themeSlice"; // Import the new themeReducer

// Retrieve idToken and theme from localStorage
const storedIdToken = localStorage.getItem("idToken");
const storedTheme = localStorage.getItem("theme");

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    theme: themeReducer, // Add the theme reducer to the store
  },
  preloadedState: {
    auth: {
      idToken: storedIdToken || null,
      isAuthenticated: !!storedIdToken,
    },
    theme: {
      isDarkTheme: storedTheme === "dark", // Set the initial theme based on stored value
    },
  },
});

export default store;
