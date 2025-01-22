import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Bar, Pie, Line, Doughnut, Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import moment from "moment";

const Analytics = () => {
  const { expenses } = useContext(ExpenseContext);

  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] =
      (totals[expense.category] || 0) + parseFloat(expense.amount);
    return totals;
  }, {});

  const dayWiseTotals = expenses.reduce((totals, expense) => {
    const day = moment(expense.date).format("YYYY-MM-DD");
    totals[day] = (totals[day] || 0) + parseFloat(expense.amount);
    return totals;
  }, {});

  const categoryChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Spending by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4caf50",
          "#ff9800",
          "#2196f3",
          "#f44336",
          "#9c27b0",
        ],
      },
    ],
  };

  const dayWiseChartData = {
    labels: Object.keys(dayWiseTotals),
    datasets: [
      {
        label: "Day-wise Spending",
        data: Object.values(dayWiseTotals),
        borderColor: "#4caf50",
        fill: true,
        backgroundColor: [
          "#4caf50",
          "#ff9800",
          "#2196f3",
          "#f44336",
          "#9c27b0",
        ],
      },
    ],
  };

  const chartStyles = "w-full  p-4";

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Analytics
      </h2>
      {expenses.length ? (
        <div className="grid grid-cols-3 gap-6">
          <div className={chartStyles}>
            <Bar data={categoryChartData} />
            <h4 className="text-center mt-5  ">Bar Chart</h4>
          </div>
          <div className={chartStyles}>
            <Doughnut data={categoryChartData} />
            <h4 className="text-center mt-5 ">Doughnut Chart</h4>
          </div>

          <div className={chartStyles}>
            <Pie data={categoryChartData} />
            <h4 className="text-center mt-5 ">Pie Chart</h4>
          </div>

          <div className={chartStyles}>
            <Line data={dayWiseChartData} />
            <h4 className="text-center mt-5 ">Line Chart</h4>
          </div>

          <div className={chartStyles}>
            <Radar data={categoryChartData} />
            <h4 className="text-center mt-5 ">Radar Chart</h4>
          </div>

          <div className={chartStyles}>
            <Bar data={dayWiseChartData} />
            <h4 className="text-center mt-5 ">Bar Chart</h4>
          </div>
          {/* 
          <div className={chartStyles}>
            <Pie data={paymentMethodChartData} />
          </div> */}

          <div className={chartStyles}>
            <Doughnut data={dayWiseChartData} />
            <h4 className="text-center mt-5 ">Doughnut Chart</h4>
          </div>

          <div className={chartStyles}>
            <Line data={dayWiseChartData} />
            <h4 className="text-center mt-5 ">Line Chart</h4>
          </div>

          <div className={chartStyles}>
            <Bar
              data={{
                labels: Object.keys(categoryTotals),
                datasets: [
                  {
                    type: "line",
                    label: "Category Spending (Line)",
                    data: Object.values(categoryTotals),
                    borderColor: "#f44336",
                    backgroundColor: "rgba(244, 67, 54, 0.2)",
                  },
                  {
                    type: "bar",
                    label: "Category Spending (Bar)",
                    data: Object.values(categoryTotals),
                    backgroundColor: "#2196f3",
                  },
                ],
              }}
            />
            <h4 className="text-center mt-5 ">Bar Chart</h4>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 dark:text-gray-100">No data to display</p>
      )}
    </div>
  );
};

export default Analytics;
