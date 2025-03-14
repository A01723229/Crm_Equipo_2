const db = require("../database/db.js");
const {
  getTotalSales, getTotalIncome,
  getTotalCustomers, getCompletionRate,
  getTaskStats, getCompletedTasks,
  getOverdueTasks, getTasksCloseToDeadline,
  getPastDeals
} = require("./constants");

const getDashboard = async (req, res) => {
  try {
    const [[totalSales], [totalIncome], [totalCustomers], [completionRate], [taskStats], 
    [completedTasks], [overdueTasks], tasksCloseToDeadline, pastDeals] = await Promise.all([
      db.query(getTotalSales), db.query(getTotalIncome),
      db.query(getTotalCustomers), db.query(getCompletionRate),
      db.query(getTaskStats), db.query(getCompletedTasks),
      db.query(getOverdueTasks), db.query(getTasksCloseToDeadline),
      db.query(getPastDeals)
    ]);

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

