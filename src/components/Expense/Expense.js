import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store/authSlice";
import { expenseActions } from "../store/ExpenseSlice";
import "./Expense.css";



const Expense = () => {
  const [editingItemId, setEditingItemId] = useState(null);
  const PriceInputRef = useRef();
  const DescripInputRef = useRef();
  const categoriesInputRef = useRef();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const totalExpenses = useSelector((state) => state.expense.totalExpenses);
  const expenses = useSelector((state) => state.expense.expenses);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://expensetrackerauthentication-default-rtdb.firebaseio.com/Expenses.json"
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch expenses");
      }

      const data = response.data;
      const expensesArray = Object.entries(data).map(([id, expense]) => ({
        id,
        ...expense,
      }));
      dispatch(expenseActions.setExpenses(expensesArray));
      dispatch(authActions.updateTotalExpenses());
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const submitExpenseHandler = async () => {
    const enteredPrice = PriceInputRef.current.value;
    const enteredDesc = DescripInputRef.current.value;
    const enteredCategory = categoriesInputRef.current.value;

    if (!enteredPrice || !enteredDesc || !enteredCategory) {
      return;
    }

    try {
      if (editingItemId) {
        await axios.patch(
          `https://expensetrackerauthentication-default-rtdb.firebaseio.com/Expenses/${editingItemId}.json`,
          {
            price: enteredPrice,
            description: enteredDesc,
            category: enteredCategory,
          }
        );

        console.log("Successfully edited expense");
      } else {
        await axios.post(
          "https://expensetrackerauthentication-default-rtdb.firebaseio.com/Expenses.json",
          {
            price: enteredPrice,
            description: enteredDesc,
            category: enteredCategory,
          }
        );

        console.log("Successfully posted expense");
      }

      fetchData();

      PriceInputRef.current.value = "";
      DescripInputRef.current.value = "";
      categoriesInputRef.current.value = "";

      if (editingItemId) {
        await deleteBtnHandler(editingItemId);
        setEditingItemId(null);
      }

      dispatch(authActions.updateTotalExpenses());
    } catch (error) {
      console.error("Error posting/editing expense:", error);
    }
  };

  const deleteBtnHandler = async (expense) => {
    try {
      console.log("Deleting expense with ID:", expense.id);

      await axios.delete(
        `https://expensetrackerauthentication-default-rtdb.firebaseio.com/Expenses/${expense.id}.json`
      );

      console.log("Successfully deleted expense");
      fetchData();
    } catch (error) {
      console.log("Error deleting an item", error);
    }
  };

  const editBtnHandler = (id, description, price, category) => {
    setEditingItemId(id);
    DescripInputRef.current.value = description;
    PriceInputRef.current.value = price;
    categoriesInputRef.current.value = category;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form className="expense-form">
        <div className="form-control">
          <label htmlFor="Price" className="form-label">
            Price
          </label>
          <input type="number" className="form-input" ref={PriceInputRef} />
        </div>

        <div className="form-control">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-input" ref={DescripInputRef} />
        </div>

        <div className="form-control">
          <label htmlFor="Category" className="form-label">
            Category
          </label>
          <select
            name="category"
            id=""
            className="form-input"
            ref={categoriesInputRef}
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Rent">Rent</option>
            <option value="Bills">Bills</option>
          </select>
        </div>

        <button
          type="button"
          className="form-button"
          onClick={submitExpenseHandler}
        >
          {editingItemId ? "Edit Expense" : "Add Expense"}
        </button>
      </form>

      <div className="expense-list">
        <ul className="expenses">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <span className="expense-item-desc">{expense.description}</span>
              <span className="expense-item-price">{expense.price}</span>
              <span className="expense-item-category">{expense.category}</span>

              <button
                className="delBtn"
                onClick={() => deleteBtnHandler(expense)}
              >
                Delete
              </button>
              <button
                className="editBtn"
                onClick={() =>
                  editBtnHandler(
                    expense.id,
                    expense.description,
                    expense.price,
                    expense.category
                  )
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {totalExpenses > 10000 && isAuthenticated && (
        <div className="premium-button">
          <button>Activate Premium</button>
        </div>
      )}
    </>
  );
};

export default Expense;
