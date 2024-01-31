import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./ExpenseSlice";

// Retrieve idToken from localStorage
const storedIdToken = localStorage.getItem("idToken");

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
  },
  preloadedState: {
    auth: {
      idToken: storedIdToken || null,
      isAuthenticated: !!storedIdToken,
    },
  },
});

export default store;
