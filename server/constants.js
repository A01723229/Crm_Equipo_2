const dbHost = "your-db-host";
const dbPort = "your-db-port";
const dbUser = "your-db-user";
const dbPass = "your-db-password";
const dbName = "CRM_DB";

const serverPort = 3000;
const api = "/api";

// Procedures
const getTotalSales = "EXEC GetTotalSales";
const getTotalIncome = "EXEC GetTotalIncome";
const getTotalCustomers = "EXEC GetTotalCustomers";
const getCompletionRate = "EXEC GetCompletionRate";
const getTaskStats = "EXEC GetTaskStats";
const getCompletedTasks = "EXEC GetCompletedTasks";
const getOverdueTasks = "EXEC GetOverdueTasks";
const getTasksCloseToDeadline = "EXEC GetTasksCloseToDeadline";
const getPastDeals = "EXEC GetPastDeals";

module.exports = {
   dbHost, dbPort, dbUser, dbPass, dbName, serverPort, api,
   getTotalSales, getTotalIncome, getTotalCustomers, getCompletionRate,
   getTaskStats, getCompletedTasks, getOverdueTasks, getTasksCloseToDeadline, getPastDeals
};