import React, { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

const BudgetTracker = () => {
  const { expenses } = useContext(ExpenseContext);
  const [budgets, setBudgets] = useState({});
  const [newBudget, setNewBudget] = useState({ category: "", amount: "" });

  useEffect(() => {
    const storedBudgets = getFromLocalStorage("budgets");
    if (storedBudgets) {
      setBudgets(storedBudgets);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("budgets", budgets);
  }, [budgets]);

  const categoryExpenses = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const handleSetBudget = () => {
    if (newBudget.category && newBudget.amount) {
      setBudgets({
        ...budgets,
        [newBudget.category]: parseFloat(newBudget.amount),
      });
      setNewBudget({ category: "", amount: "" });
    }
  };

  const handleResetBudgets = () => {
    setBudgets({});
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Category Budget Tracker
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-gray-100">
          Set Budget for Category
        </label>
        <div className="flex gap-2">
          <select
            value={newBudget.category}
            onChange={(e) =>
              setNewBudget({ ...newBudget, category: e.target.value })
            }
            className="p-2 border rounded w-full bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-800 dark:border-gray-600"
          >
            <option value="">Select Category</option>
            {[...new Set(expenses.map((expense) => expense.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
          <input
            type="number"
            placeholder="Enter budget amount"
            value={newBudget.amount}
            onChange={(e) =>
              setNewBudget({ ...newBudget, amount: e.target.value })
            }
            className="p-2 border rounded w-full bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-800 dark:border-gray-600"
          />
          <button
            onClick={handleSetBudget}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Set
          </button>
        </div>
      </div>
      {console.log(budgets, "bud")}
      {Object.keys(budgets).length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleResetBudgets}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Reset Budgets
          </button>
        </div>
      )}

      {Object.keys(budgets).length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
            Budget Overview
          </h3>
          <div className="space-y-4">
            {Object.entries(budgets).map(([category, budget]) => {
              const totalSpent = categoryExpenses[category] || 0;
              const remainingBudget = budget - totalSpent;
              const warningThreshold = 0.8 * budget;

              return (
                <div
                  key={category}
                  className="p-4 bg-white dark:bg-gray-700 border rounded shadow dark:border-gray-600"
                >
                  <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {category}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    Total Spent: ₹{totalSpent.toFixed(2)}
                  </p>
                  <p
                    className={`${
                      remainingBudget < 0
                        ? "text-red-500"
                        : remainingBudget < warningThreshold
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    Remaining Budget: ₹{remainingBudget.toFixed(2)}
                  </p>
                  {remainingBudget < 0 && (
                    <p className="text-red-500 dark:text-red-400">
                      Budget exceeded for {category}!
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTracker;
