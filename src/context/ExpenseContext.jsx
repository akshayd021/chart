import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category`
        );
        setCategories(response?.data?.data || []);
        console.log(response?.data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/expense`
        );
        setExpenses(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching Expense:", error);
      }
    };

    fetchExpense();
  }, [data]);

  const deleteExpense = async (id) => {
    try {
      setData(true);
      await axios.delete(`${process.env.REACT_APP_API_URL}/expense/${id}`);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      setData(false);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const addExpense = async (expense) => {
    try {
      setData(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/expense/create`,
        expense
      );
      setExpenses([...expenses, response.data?.data]);
      setData(false);
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        categories,
        addExpense,
        setExpenses,
        deleteExpense,
        setData
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
