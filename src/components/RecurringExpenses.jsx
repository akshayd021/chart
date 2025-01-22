import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
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
  const [selectedExpense, setSelectedExpense] = useState(null); // Track the selected recurring expense

  // Fetch recurring expenses from the API when the component mounts
  useEffect(() => {
    const fetchRecurringExpenses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/recurring`
        );
        setRecurring(response.data?.data);
      } catch (error) {
        console.error("Error fetching recurring expenses:", error);
      }
    };

    fetchRecurringExpenses();
  }, []);

  // Add a new recurring expense to the API
  const handleAddRecurring = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/recurring/create`,
        newRecurring
      );
      setRecurring([...recurring, response.data]);
      setNewRecurring({
        description: "",
        amount: "",
        category: "",
        frequency: "monthly",
      });
    } catch (error) {
      console.error("Error adding recurring expense:", error);
    }
  };

  // Apply selected recurring expense (add to general expenses)
  const applyRecurringExpense = () => {
    if (selectedExpense) {
      addExpense({
        ...selectedExpense,
        date: new Date().toISOString().split("T")[0],
      });
    } else {
      alert("Plese Select rurring data what you want to apply in expense");
    }
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
            <option key={idx} value={cat?.name}>
              {cat?.name}
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

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Current Recurring Expenses
        </h3>
        <ul className="list-disc pl-6 mt-2">
          {recurring?.map((expense, idx) => (
            <li
              key={idx}
              className="text-gray-800 dark:text-gray-200"
              onClick={() => setSelectedExpense(expense)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedExpense?.description === expense.description
                    ? "#e2e8f0" // Highlight the selected expense
                    : "transparent",
              }}
            >
              {expense.description} - ₹{expense.amount} ({expense.frequency})
              for -({expense?.category})
            </li>
          ))}
        </ul>
        <button
          onClick={applyRecurringExpense}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
        >
          Apply Selected Recurring Expense
        </button>
      </div>
    </div>
  );
};

export default RecurringExpenses;
