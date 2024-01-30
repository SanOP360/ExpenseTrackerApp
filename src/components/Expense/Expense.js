import React, { useEffect, useRef, useState } from "react";
import "./Expense.css";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const PriceInputRef = useRef();
  const DescripInputRef = useRef();
  const categoriesInputRef = useRef();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://expensetrackerauthentication-default-rtdb.firebaseio.com/Expenses.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      const expensesArray = Object.values(data);
      setExpenses(expensesArray);
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
      const response = await fetch(
        "https://expensetrackerauthentication-default-rtdb.firebaseio.com/Expenses.json",
        {
          method: "POST",
          body: JSON.stringify({
            price: enteredPrice,
            description: enteredDesc,
            category: enteredCategory,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Failed to post");
      }

      console.log("Successfully posted expense");

      // Trigger a refetch of the data after posting
      fetchData();
    } catch (error) {
      console.error("Error posting expense:", error);
    }

    // Clear input fields
    PriceInputRef.current.value = "";
    DescripInputRef.current.value = "";
    categoriesInputRef.current.value = "";
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
          Add Expense
        </button>
      </form>

      <div className="expense-list">
        <ul className="expenses">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <span className="expense-item-desc">{expense.description}</span>
              <span className="expense-item-price">{expense.price}</span>
              <span className="expense-item-category">{expense.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Expense;
