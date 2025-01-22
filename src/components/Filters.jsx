import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const Filters = () => {
  const { categories, filterExpenses } = useContext(ExpenseContext);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = () => {
    filterExpenses(filters);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Filter Expenses</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-bold">Start Date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold">End Date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="block w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        onClick={handleFilterChange}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
