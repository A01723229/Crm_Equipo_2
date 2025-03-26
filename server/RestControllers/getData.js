const sql = require("mssql");
const db = require("../database/db.js");

const getData = async (req, res) => {
  try {
    const pool = await db.poolPromise; 

    // Execute updated stored procedures
    const results = await Promise.all([
      pool.request().execute("GetTotalSales"),
      pool.request().execute("GetTotalIncome"),
      pool.request().execute("GetTotalClients"),
      pool.request().execute("GetCompletionRate"),
      pool.request().execute("GetTaskStats"),
      pool.request().execute("GetCompletedTasks"),
      pool.request().execute("GetOverdueTasks"),
      pool.request().execute("GetTasksCloseToDeadline"),
      pool.request().execute("GetPastDeals")
    ]);

    // Extract data from SQL Server responses safely
    const totalSales = results[0].recordset[0]?.totalSales || 0;
    const totalIncome = results[1].recordset[0]?.totalIncome || 0;
    const totalClients = results[2].recordset[0]?.totalClients || 0;
    const completionRate = results[3].recordset[0]?.completionRate || 0;
    const taskStats = results[4].recordset || [];
    const completedTasks = results[5].recordset[0]?.completedTasks || 0;
    const overdueTasks = results[6].recordset[0]?.overdueTasks || 0;
    const tasksCloseToDeadline = results[7].recordset || [];
    const pastDeals = results[8].recordset || [];

    res.json({
      totalSales,
      totalIncome,
      totalClients,
      completionRate,
      taskStats,
      completedTasks,
      overdueTasks,
      tasksCloseToDeadline,
      pastDeals
    });
  } catch (err) {
    console.error("Data Query Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getData };
