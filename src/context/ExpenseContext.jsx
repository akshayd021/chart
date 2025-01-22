import React, { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setExpenses(storedExpenses);
    setCategories([...categories, ...storedCategories]);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [expenses, categories]);

  const addExpense = (expense) => setExpenses([...expenses, expense]);
  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map((exp) => (exp.id === id ? updatedExpense : exp)));
  };
  const deleteExpense = (id) =>
    setExpenses(expenses.filter((exp) => exp.id !== id));
  const clearExpenses = () => setExpenses([]);
  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };
  

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        categories,
        addExpense,
        updateExpense,
        deleteExpense,
        clearExpenses,
        addCategory,
        setExpenses
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
