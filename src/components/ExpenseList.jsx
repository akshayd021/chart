import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import EditExpenseModal from "./EditExpenseModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import Papa from "papaparse";
import moment from "moment";
import axios from "axios";

const ExpenseList = () => {
  const { expenses, deleteExpense, setExpenses, categories } =
    useContext(ExpenseContext);
  const { setData } = useContext(ExpenseContext);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [sortKey, setSortKey] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    date: "",
    description: "",
  });

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortKey === "date") return new Date(a.date) - new Date(b.date);
    if (sortKey === "amount") return b.amount - a.amount;
    if (sortKey === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter((expense) => {
    const matchesCategory =
      !filters.category ||
      expense.category[0] === filters.category.toLowerCase();
    const matchesDate =
      !filters.date ||
      moment(expense.date).format("YYYY-MM-DD") === filters.date;

    const matchesDescription =
      !filters.description ||
      expense.description
        .toLowerCase()
        .includes(filters.description.toLowerCase());

    return matchesCategory && matchesDate && matchesDescription;
  });

  const exportToCSV = (data) => {
    const csvRows = [
      ["Date", "Category", "Description", "Amount"],
      ...data.map((expense) => [
        expense.date,
        expense.category,
        expense.description,
        expense.amount,
      ]),
    ];

    const csvContent = `data:text/csv;charset=utf-8,${csvRows
      .map((row) => row.join(","))
      .join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const requiredFields = ["Date", "Category", "Description", "Amount"];
        const newExpenses = [];
        for (const row of result.data) {
          const isValidRow = requiredFields.every(
            (field) => row[field] !== undefined
          );
          if (!isValidRow) {
            alert(
              "Invalid CSV format. Please upload a file with the correct structure."
            );
            return;
          }

          // Add valid expense rows
          newExpenses.push({
            id: Date.now() + Math.random(), // Generate a unique ID
            date: row.Date.trim(),
            category: row.Category.trim(),
            description: row.Description.trim(),
            amount: parseFloat(row.Amount) || 0,
          });
        }

        if (newExpenses.length > 0) {
          setExpenses((prevExpenses) => [...prevExpenses, ...newExpenses]);
        } else {
          alert("The file contains no valid rows.");
        }
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        alert("Error processing the file. Please try again.");
      },
    });
  };

  const handleDeleteALl = async (e) => {
    try {
      setData(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/expense/delete/all`
      );
      setData(false);
      alert(response?.data?.message || "Update success");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="mt-4 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
        Expense List
      </h2>

      <div className="flex gap-4 mb-4 flex-row">
        <input
          type="text"
          placeholder="Search by Description"
          value={filters.description}
          onChange={(e) =>
            setFilters({ ...filters, description: e.target.value })
          }
          className="p-2 border rounded w-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        />
        <div className="flex gap-4 w-full">
          <select
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            value={filters.category}
            className="p-2 border w-full rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="">Filter by Category</option>
            {categories?.map((category) => (
              <option key={category} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="p-2 border rounded w-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Upload CSV:
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="p-2 border rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        {filteredExpenses.length ? (
          <table className="w-full border-collapse border border-gray-600 dark:border-gray-400">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="border border-gray-600 dark:border-gray-400 p-2">
                  Date
                </th>
                <th className="border border-gray-600 dark:border-gray-400 p-2">
                  Category
                </th>
                <th className="border border-gray-600 dark:border-gray-400 p-2">
                  Description
                </th>
                <th className="border border-gray-600 dark:border-gray-400 p-2">
                  Amount
                </th>
                <th className="border border-gray-600 dark:border-gray-400 p-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <td className="border border-gray-600 dark:border-gray-400 p-2">
                    {moment(exp.date).format("DD/MM/YYYY")}
                  </td>
                  <td className="border border-gray-600 dark:border-gray-400 p-2">
                    {exp.category}
                  </td>
                  <td className="border border-gray-600 dark:border-gray-400 p-2">
                    {exp.description}
                  </td>
                  <td className="border border-gray-600 dark:border-gray-400 p-2">
                    ₹{exp.amount}
                  </td>
                  <td className="border border-gray-600 dark:border-gray-400 p-2 text-center">
                    <button
                      onClick={() => setSelectedExpense(exp)}
                      className="text-blue-400 hover:text-blue-500 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteExpense(exp._id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No expenses found.</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => handleDeleteALl()}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
        >
          Reset All
        </button>
        <button
          disabled={filteredExpenses?.length === 0}
          onClick={() => exportToCSV(filteredExpenses)}
          className="bg-blue-500 disabled:bg-blue-400 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Export as CSV
        </button>
      </div>

      {selectedExpense && (
        <EditExpenseModal
          expense={selectedExpense}
          onClose={() => setSelectedExpense(null)}
        />
      )}
    </div>
  );
};

export default ExpenseList;
