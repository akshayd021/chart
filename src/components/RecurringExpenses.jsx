import React, { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const RecurringExpenses = () => {
  const { addExpense, categories } = useContext(ExpenseContext);
  const [recurring, setRecurring] = useState([]);
  const [newRecurring, setNewRecurring] = useState({
    description: "",
    amount: "",
    category: "",
    frequency: "monthly",
  });

  const handleAddRecurring = () => {
    setRecurring([...recurring, newRecurring]);
    setNewRecurring({
      description: "",
      amount: "",
      category: "",
      frequency: "monthly",
    });
  };

  const applyRecurringExpenses = () => {
    recurring.forEach((expense) => {
      addExpense({ ...expense, date: new Date().toISOString().split("T")[0] });
    });
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Recurring Expenses
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Description"
          value={newRecurring.description}
          onChange={(e) =>
            setNewRecurring({ ...newRecurring, description: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-800 dark:border-gray-600"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newRecurring.amount}
          onChange={(e) =>
            setNewRecurring({ ...newRecurring, amount: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-800 dark:border-gray-600"
        />
        <select
          value={newRecurring.category}
          onChange={(e) =>
            setNewRecurring({ ...newRecurring, category: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-800 dark:border-gray-600"
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={newRecurring.frequency}
          onChange={(e) =>
            setNewRecurring({ ...newRecurring, frequency: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-800 dark:border-gray-600"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button
          onClick={handleAddRecurring}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Add Recurring
        </button>
      </div>
      <button
        onClick={applyRecurringExpenses}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
      >
        Apply Recurring Expenses
      </button>
    </div>
  );
};

export default RecurringExpenses;
