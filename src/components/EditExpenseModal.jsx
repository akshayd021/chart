import React, { useContext, useState } from "react";
import axios from "axios";
import { ExpenseContext } from "../context/ExpenseContext";
import moment from "moment";

const EditExpenseModal = ({ expense, onClose }) => {
  const [formData, setFormData] = useState({ ...expense });
  const { setData } = useContext(ExpenseContext);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setData(true);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/expense/${expense?._id}`,
        formData
      );

      setFormData((prevExpenses) =>
        prevExpenses.map((exp) =>
          exp.id === expense.id ? { ...exp, ...formData } : exp
        )
      );
      setData(false);
      alert(response?.data?.message || "Update success");
      onClose();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  console.log(formData?.date, "dare");
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="block w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="date"
            value={moment(formData.date).format("YYYY-MM-DD") || ""} // Ensure it's not undefined
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="block w-full mb-2 p-2 border rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="block w-full mb-2 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
