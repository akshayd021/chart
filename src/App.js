import React, { useContext } from "react";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Analytics from "./components/Analytics";
import BudgetTracker from "./components/BudgetTracker";
import RecurringExpenses from "./components/RecurringExpenses";
import { ExpenseProvider } from "./context/ExpenseContext";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-sans">
          <header className="bg-blue-500 dark:bg-blue-700 text-white p-4 sticky top-0">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Expense Tracker</h1>
              <ThemeToggle />
            </div>
          </header>
          <main className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1">
                <AddExpenseForm />
              </div>
              <div className="col-span-2">
                <ExpenseList />
              </div>
            </div>
            <div>
              <Analytics />
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecurringExpenses />
              <BudgetTracker />
            </div>
          </main>
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
};

export default App;
