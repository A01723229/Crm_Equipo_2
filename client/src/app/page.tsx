'use client';
import { useUser } from './context/UserContext';
import { useData } from './context/DataContext';
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import LogInBox from './components/loginBox';

export default function Dashboard() {
  const { user } = useUser();
  const { data, loading, error } = useData();
  const isUser = user?.isLogin;

  if (!isUser) return <LogInBox />;

  if (loading) return <div className="animate-pulse bg-gray-200 h-20 w-full rounded-md"></div>;

  if (error) return <div className="text-red-500">{error}</div>;

  if (!data) return <div className="text-red-500">No data available</div>;

  const {
    totalSales,
    totalIncome,
    totalCustomers,
    completionRate,
    taskStats,
    completedTasks,
    overdueTasks,
    tasksCloseToDeadline,
    pastDeals,
  } = data;

  return (
    <div className="p-8 pt-20 bg-gray-100 min-h-screen space-y-6 pl-20">
      {/* TOP KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-gray-700 font-bold">Total Sales</h3>
          <p className="text-2xl text-black font-semibold">{totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-gray-700 font-bold">Total Income</h3>
          <p className="text-2xl text-black font-semibold">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-gray-700 font-bold">Total Customers</h3>
          <p className="text-2xl text-black font-semibold">{totalCustomers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-gray-700 font-bold">Completion Rate</h3>
          <p className="text-2xl text-black font-semibold">{completionRate.toFixed(2)}%</p>
        </div>
      </div>

      {/* KEY PERFORMANCE */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-gray-700 font-bold text-lg">Key Performance Indicators</h3>
        <div className="flex gap-2 text-sm">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Critical: {taskStats?.Critical?.length || 0}</span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">High: {taskStats?.High?.length || 0}</span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Low: {taskStats?.Low?.length || 0}</span>
        </div>

        {/* Task Stats Pie */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(taskStats).map(([stage, stats], index) => (
            <div key={index} className="text-center">
              <h4 className="font-semibold">{stage}</h4>
              <PieChart width={180} height={180}>
                <Pie
                  data={Array.isArray(stats) ? stats : []}
                  dataKey="value"
                  outerRadius={70}
                  innerRadius={35}
                  paddingAngle={3}
                >
                  {Array.isArray(stats) && stats.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded shadow">
            <h4 className="text-gray-700 font-bold">Completed Tasks This Month</h4>
            <p className="text-2xl text-black font-semibold">{completedTasks}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h4 className="text-gray-700 font-bold">Overdue Tasks Count</h4>
            <p className="text-2xl text-black font-semibold">{overdueTasks}</p>
          </div>
        </div>
      </div>

      {/* TASKS CLOSE TO DEADLINE */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-700 font-bold text-lg">Tasks Close to Deadline</h3>
        <ul className="divide-y mt-4 text-black">
          {tasksCloseToDeadline.length > 0 ? (
            tasksCloseToDeadline.map((task, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span>{task.title}</span>
                <span className="text-black">{new Date(task.deadline).toLocaleDateString()}</span>
              </li>
            ))
          ) : (
            <li className="py-2 text-black">No upcoming deadlines</li>
          )}
        </ul>
      </div>

      {/* PAST DEALS */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-700 font-bold text-lg">Past Deals</h3>
        <table className="w-full mt-4 text-left border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Deal</th>
              <th className="p-2 border">Commission</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {pastDeals.length > 0 ? (
              pastDeals.map((deal, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{deal.ClientName}</td>
                  <td className="p-2 border">${deal.DealValue.toLocaleString()}</td>
                  <td className="p-2 border">${deal.Comission.toLocaleString()}</td>
                  <td className="p-2 border">{new Date(deal.DeadLine).toLocaleDateString()}</td>
                  <td className="p-2 border">{deal.PaymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-black">No past deals</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
