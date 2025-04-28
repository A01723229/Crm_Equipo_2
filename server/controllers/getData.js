const sql = require("mssql");
const db = require("../database/db.js");
const procedures = require("../constants.js");

const getData = async (req, res) => {
  try {
    const pool = await db.poolPromise;

    // Execute all procedures
    const results = await Promise.all([
      pool.request().query(procedures.getTotalSales),
      pool.request().query(procedures.getTotalIncome),
      pool.request().query(procedures.getTotalCustomers),
      pool.request().query(procedures.getCompletionRate),
      pool.request().query(procedures.getTaskStats),
      pool.request().query(procedures.getCompletedTasks),
      pool.request().query(procedures.getOverdueTasks),
      pool.request().query(procedures.getTasksCloseToDeadline),
      pool.request().query(procedures.getPastDeals),
      pool.request().query(procedures.getTotalCommissions),
      pool.request().query(procedures.getCommissionRate),
      pool.request().query(procedures.getPendingPayments),
      pool.request().query(procedures.getTopCommissions),
      pool.request().query(procedures.getAllDeals),
      pool.request().query(procedures.getClientList),
      pool.request().query(procedures.getAllTasks),
      pool.request().query(procedures.getAllProducts)
    ]);

    // Extract data
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

    const rawClientList = results[14].recordset || [];
    const clientList = rawClientList.map(client => ({
      ClientID: client.ClientID,
      ClientName: client.ClientName, 
      Company: client.Organization, 
      Description: client.Description,
      Telephone: client.Telephone,
      Email: client.Email,
      SellerID: client.SellerID,
    }));

    const tasks = results[15].recordset || [];
    const products = results[16].recordset || [];

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
      clientList,
      tasks,
      products
    });
  } catch (err) {
    console.error("Data Query Error:", err.message || err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getData };
