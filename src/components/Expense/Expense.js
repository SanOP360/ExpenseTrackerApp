// Expense.jsx

import React, { useRef, useState } from "react";
import "./Expense.css";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const PriceInputRef = useRef();
  const DescripInputRef = useRef();
  const categoriesInputRef = useRef();

  const submitExpenseHandler = () => {
    const enteredPrice = PriceInputRef.current.value;
    const enteredDesc = DescripInputRef.current.value;
    const enteredCategory = categoriesInputRef.current.value;

    if (!enteredPrice || !enteredDesc || !enteredCategory) {
      // Handle invalid input if needed
      return;
    }

    const newExpense = {
      id: Math.random().toString(),
      price: enteredPrice,
      description: enteredDesc,
      category: enteredCategory,
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    PriceInputRef.current.value = "";
    DescripInputRef.current.value = "";
    categoriesInputRef.current.value = "";
  };

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
