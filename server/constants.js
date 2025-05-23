const dbHost = "ec2-3-144-96-35.us-east-2.compute.amazonaws.com";
const dbPort = "1433";
const dbUser = "sa";
const dbPass = "Tec123";
const dbName = "CRM_DB";

const serverPort = 3001;
const api = "/api";

// Procedures
const getTotalSales = "EXEC GetTotalSales";
const getTotalIncome = "EXEC GetTotalIncome";
const getTotalCustomers = "EXEC GetTotalClients";
const getCompletionRate = "EXEC GetCompletionRate";
const getTaskStats = "EXEC GetTaskStats";
const getCompletedTasks = "EXEC GetCompletedTasks";
const getOverdueTasks = "EXEC GetOverdueTasks";
const getTasksCloseToDeadline = "EXEC GetTasksCloseToDeadline";
const getPastDeals = "EXEC GetPastDeals";
const getTotalCommissions = "EXEC GetTotalCommissions";
const getCommissionRate = "EXEC GetCommissionRate";
const getPendingPayments = "EXEC GetPendingPayments";
const getTopCommissions = "EXEC GetTopCommissions";
const getAllDeals = "EXEC GetAllDeals";
const getClientList = "EXEC GetClientList";
const getSelectedClient = "EXEC GetSelectedClient @ClientID";
const getAllTasks = "EXEC GetAllTasks";
const getAllProducts = "EXEC GetAllProducts";


module.exports = {
   dbHost, dbPort, dbUser, dbPass, dbName, serverPort, api,
   getTotalSales, getTotalIncome, getTotalCustomers, getCompletionRate,
   getTaskStats, getCompletedTasks, getOverdueTasks, getTasksCloseToDeadline, getPastDeals, 
   getTotalCommissions, getCommissionRate, getPendingPayments, getTopCommissions, 
   getAllDeals, getClientList, getSelectedClient, getAllTasks, getAllProducts
};