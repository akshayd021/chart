import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const EditExpenseModal = ({ expense, onClose }) => {
  const { updateExpense } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({ ...expense });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExpense(expense.id, formData);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="block w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="block w-full mb-2 p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="block w-full mb-2 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
          <button onClick={onClose} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
