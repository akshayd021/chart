import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const AddExpenseForm = () => {
  const { addExpense, categories, addCategory } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ ...formData, id: Date.now() });
    setFormData({ amount: "", category: "", date: "", description: "" });
  };

  const handleAddCategory = () => {
    if (newCategory) {
      addCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Add Expense
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 text-gray-800"
          required
        />
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 text-gray-800"
          required
        >
          <option value="">Select Category</option>
          {[...new Set(categories)].map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 text-gray-800"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Add New Category
        </h3>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 text-gray-800"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
