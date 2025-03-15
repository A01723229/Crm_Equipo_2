
'use client';
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface TaskStat {
  value: number;
  color: string;
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
  pastDeals: { client: string; deal: string; commission: number; date: string; status: string }[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data: DashboardData) => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  const { totalSales, totalIncome, totalCustomers, completionRate, taskStats, completedTasks, overdueTasks, tasksCloseToDeadline, pastDeals } = data;

  const renderPieChart = (stats: TaskStat[]) => (
    <PieChart width={120} height={120}>
      <Pie data={stats} dataKey="value" outerRadius={50} fill="#8884d8">
        {stats.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <div className="border p-4 rounded-lg shadow">
        <h2>Total Sales</h2>
        <p>{totalSales}</p>
      </div>
      <div className="border p-4 rounded-lg shadow">
        <h2>Total Income</h2>
        <p>${totalIncome}</p>
      </div>
      <div className="border p-4 rounded-lg shadow">
        <h2>Total Customers</h2>
        <p>{totalCustomers}</p>
      </div>
      <div className="border p-4 rounded-lg shadow">
        <h2>Completion Rate</h2>
        <p>{completionRate}%</p>
      </div>

      <div className="col-span-4 grid grid-cols-2 gap-4">
        {Object.keys(taskStats).map((status) => (
          <div key={status} className="border p-4 rounded-lg shadow">
            <h3>{status}</h3>
            {renderPieChart(taskStats[status])}
          </div>
        ))}
      </div>

      <div className="border p-4 rounded-lg shadow">
        <h3>Completed Tasks</h3>
        <p>{completedTasks}</p>
      </div>
      <div className="border p-4 rounded-lg shadow">
        <h3>Overdue Tasks</h3>
        <p>{overdueTasks}</p>
      </div>

      <div className="col-span-2">
        <h3>Tasks Close to Deadline</h3>
        <ul>
          {tasksCloseToDeadline.map((task, index) => (
            <li key={index}>{task.title} - {task.deadline}</li>
          ))}
        </ul>
      </div>

      <div className="col-span-2">
        <h3>Past Deals</h3>
        <table className="w-full border">
          <thead>
            <tr>
              <th>Client</th>
              <th>Deal</th>
              <th>Commission</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pastDeals.map((deal, index) => (
              <tr key={index}>
                <td>{deal.client}</td>
                <td>{deal.deal}</td>
                <td>{deal.commission}</td>
                <td>{deal.date}</td>
                <td>{deal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
