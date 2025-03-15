const db = require("../database/db.js");
const {
  getTotalSales, getTotalIncome,
  getTotalCustomers, getCompletionRate,
  getTaskStats, getCompletedTasks,
  getOverdueTasks, getTasksCloseToDeadline,
  getPastDeals
} = require("../constants");

const getDashboard = async (req, res) => {
  try {
    const results = await Promise.all([
      db.query(getTotalSales),
      db.query(getTotalIncome),
      db.query(getTotalCustomers),
      db.query(getCompletionRate),
      db.query(getTaskStats),
      db.query(getCompletedTasks),
      db.query(getOverdueTasks),
      db.query(getTasksCloseToDeadline),
      db.query(getPastDeals)
    ]);

    // Extract data from stored procedure results
    const [[totalSales]] = results[0];
    const [[totalIncome]] = results[1];
    const [[totalCustomers]] = results[2];
    const [[completionRate]] = results[3];
    const taskStats = results[4];
    const [[completedTasks]] = results[5];
    const [[overdueTasks]] = results[6];
    const tasksCloseToDeadline = results[7];
    const pastDeals = results[8];

    res.json({
      totalSales: totalSales.totalSales,
      totalIncome: totalIncome.totalIncome,
      totalCustomers: totalCustomers.totalCustomers,
      completionRate: completionRate.completionRate,
      taskStats,
      completedTasks: completedTasks.completedTasks,
      overdueTasks: overdueTasks.overdueTasks,
      tasksCloseToDeadline,
      pastDeals
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboard };