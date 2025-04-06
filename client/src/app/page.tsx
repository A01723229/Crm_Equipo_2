'use client';
import { useUser } from './context/UserContext';
import { useData } from './context/DataContext';
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import LogInBox from './components/loginBox';

export default function Dashboard() {
  const { user, loading: userLoading } = useUser();
  const { data, loading: dataLoading, error } = useData();
  const isUser = user?.isLogin;

  if (userLoading) {
    return <div className="animate-pulse bg-gray-200 h-20 w-full rounded-md" />;
  }
  
  if (!isUser) {
    return <LogInBox />;
  }
  
  if (dataLoading) {
    return <div className="animate-pulse bg-gray-200 h-20 w-full rounded-md" />;
  }
  
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  
  if (!data) {
    return <div className="text-red-500">No data available</div>;
  }
  const {
    totalSales,
    totalIncome,
    totalClients,
    completionRate,
    completedTasks,
    overdueTasks,
    tasksCloseToDeadline,
    pastDeals,
  } = data;
  
  const taskStats: { Priority: string; count: number }[] = Array.isArray(data.taskStats) ? data.taskStats : [];
  
  console.log("tasksCloseToDeadline", tasksCloseToDeadline);
  
  const taskStatsPieData = Array.isArray(taskStats)
    ? taskStats.map((stat: any) => ({
        name: stat.Priority,
        value: stat.count,
        color:
          stat.Priority === "Critical" ? "#f87171" :
          stat.Priority === "High" ? "#facc15" :
          "#4ade80"
      }))
    : [];

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
          <p className="text-2xl text-black font-semibold">{totalClients.toLocaleString()}</p>
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
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
            Critical: {taskStats.find((t: any) => t.Priority === 'Critical')?.count || 0}
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            High: {taskStats.find((t: any) => t.Priority === 'High')?.count || 0}
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Low: {taskStats.find((t: any) => t.Priority === 'Low')?.count || 0}
          </span>
        </div>

        {/* Task Stats Pie Chart */}
        <div className="flex justify-center">
          {taskStatsPieData.length > 0 && taskStatsPieData.some(s => s.value > 0) ? (
            <PieChart width={300} height={300}>
              <Pie
                data={taskStatsPieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={3}
              >
                {taskStatsPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <p className="text-gray-500 mt-4">No data available for task priorities</p>
          )}
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
            tasksCloseToDeadline.map((task: any, index: number) => (
              <li key={index} className="py-2 flex justify-between">
                <span>{task.Title}</span>
                <span className="text-black">{new Date(task.DeadLine).toLocaleDateString()}</span>
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
              pastDeals.map((deal: any, index: number) => (
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
