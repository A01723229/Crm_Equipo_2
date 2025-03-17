'use client';
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface TaskStat {
  value: number;
  color: string;
}

interface PastDeal {
  ClientName: string;
  DealValue: number;
  Comission: number;
  DeadLine: string;
  PaymentStatus: string;
}

interface DashboardData {
  totalSales: number;
  totalIncome: number;
  totalCustomers: number;
  completionRate: number;
  taskStats: Record<string, TaskStat[]>;
  completedTasks: number;
  overdueTasks: number;
  tasksCloseToDeadline: { title: string; deadline: string }[];
  pastDeals: PastDeal[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch data");
        const jsonData: DashboardData = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load data");
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div className="animate-pulse bg-gray-200 h-20 w-full rounded-md"></div>;

  const {
    totalSales = 0,
    totalIncome = 0,
    totalCustomers = 0,
    completionRate = 0,
    taskStats = {},
    completedTasks = 0,
    overdueTasks = 0,
    tasksCloseToDeadline = [],
    pastDeals = [],
  } = data;

  return (
    <div className="p-20 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-100 h-full w-full">
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg shadow bg-white">
          <h2 className="text-gray-700 text-lg font-bold">Total Sales</h2>
          <p className="text-2xl text-black font-bold">${totalSales.toLocaleString()}</p>
        </div>
        <div className="border p-4 rounded-lg shadow bg-white">
          <h2 className="text-gray-700 text-lg font-bold">Total Income</h2>
          <p className="text-2xl text-black font-bold">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="border p-4 rounded-lg shadow bg-white">
          <h2 className="text-gray-700 text-lg font-bold">Total Customers</h2>
          <p className="text-2xl text-black font-bold">{totalCustomers.toLocaleString()}</p>
        </div>
        <div className="border p-4 rounded-lg shadow bg-white">
          <h2 className="text-gray-700 text-lg font-bold">Completion Rate</h2>
          <p className="text-2xl text-black font-bold">{completionRate.toFixed(2)}%</p>
        </div>
      </div>

      <div className="lg:col-span-1 border p-4 rounded-lg shadow bg-white">
        <h3 className="text-gray-700 text-lg font-bold">Task Overview</h3>
        <div className="flex justify-between mt-2">
          <div>
            <p className="text-gray-500">Completed</p>
            <p className="text-xl text-black font-bold">{completedTasks}</p>
          </div>
          <div>
            <p className="text-gray-500">Overdue</p>
            <p className="text-xl text-black font-bold">{overdueTasks}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 border p-4 rounded-lg shadow bg-white">
        <h3 className="text-gray-700 text-lg font-bold">Tasks Close to Deadline</h3>
        <ul>
          {tasksCloseToDeadline.length > 0 ? (
            tasksCloseToDeadline.map((task, index) => (
              <li key={index} className="text-gray-600">{task.title} - {new Date(task.deadline).toLocaleDateString()}</li>
            ))
          ) : (
            <p className="text-gray-500">No upcoming deadlines</p>
          )}
        </ul>
      </div>

      <div className="lg:col-span-3 border p-4 rounded-lg shadow bg-white">
        <h3 className="text-gray-700 text-lg font-bold">Past Deals</h3>
        <table className="w-full text-black border-collapse border mt-2">
          <thead>
            <tr>
              <th className="border p-2">Client</th>
              <th className="border p-2">Deal</th>
              <th className="border p-2">Commission</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pastDeals.length > 0 ? (
              pastDeals.map((deal, index) => (
                <tr key={index}>
                  <td className="border p-2">{deal.ClientName}</td>
                  <td className="border p-2">${deal.DealValue.toLocaleString()}</td>
                  <td className="border p-2">${deal.Comission.toLocaleString()}</td>
                  <td className="border p-2">{new Date(deal.DeadLine).toLocaleDateString()}</td>
                  <td className="border p-2">{deal.PaymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-2 text-gray-500">No past deals</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
