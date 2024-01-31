import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  totalExpenses: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    setTotalExpenses(state, action) {
      state.totalExpenses = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
