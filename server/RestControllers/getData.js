const sql = require("mssql");
const db = require("../database/db.js");

const getData = async (req, res) => {
  try {
    const pool = await db.poolPromise;

    // Execute all stored procedures in parallel
    const results = await Promise.all([
      pool.request().execute("GetTotalSales"),
      pool.request().execute("GetTotalIncome"),
      pool.request().execute("GetTotalClients"),
      pool.request().execute("GetCompletionRate"),
      pool.request().execute("GetTaskStats"),
      pool.request().execute("GetCompletedTasks"),
      pool.request().execute("GetOverdueTasks"),
      pool.request().execute("GetTasksCloseToDeadline"),
      pool.request().execute("GetPastDeals"),
      pool.request().execute("GetTotalCommissions"),
      pool.request().execute("GetCommissionRate"),
      pool.request().execute("GetPendingPayments"),
      pool.request().execute("GetTopCommissions"),
      pool.request().execute("GetAllDeals"),
      pool.request().execute("GetClientList")
    ]);

    // Extract data safely from SQL Server responses
    const totalSales = results[0].recordset[0]?.totalSales || 0;
    const totalIncome = results[1].recordset[0]?.totalIncome || 0;
    const totalClients = results[2].recordset[0]?.totalClients || 0;
    const completionRate = results[3].recordset[0]?.completionRate || 0;
    const taskStats = results[4].recordset || [];
    const completedTasks = results[5].recordset[0]?.completedTasks || 0;
    const overdueTasks = results[6].recordset[0]?.overdueTasks || 0;
    const tasksCloseToDeadline = results[7].recordset || [];
    const pastDeals = results[8].recordset || [];
    const totalCommissions = results[9].recordset[0]?.totalCommissions || 0;
    const commissionRate = results[10].recordset[0]?.commissionRate || 0;
    const pendingPayments = results[11].recordset || [];
    const topCommissions = results[12].recordset || [];
    const allDeals = results[13].recordset || [];
    const clientList = results[14].recordset || [];

    res.json({
      totalSales,
      totalIncome,
      totalClients,
      completionRate,
      taskStats,
      completedTasks,
      overdueTasks,
      tasksCloseToDeadline,
      pastDeals,
      totalCommissions,
      commissionRate,
      pendingPayments,
      topCommissions,
      allDeals,
      clientList
    });
  } catch (err) {
    console.error("Data Query Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getData };
