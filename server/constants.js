const dbHost = "your-db-host";
const dbPort = "your-db-port";
const dbUser = "your-db-user";
const dbPass = "your-db-password";
const dbName = "CRM_DB";

const serverPort = 3000;
const api = "/api";

// Queries
const getTotalSales = "SELECT COUNT(*) AS totalSales FROM Deal";
const getTotalIncome = "SELECT SUM(DealValue) AS totalIncome FROM Deal";
const getTotalCustomers = "SELECT COUNT(*) AS totalCustomers FROM Customer";
const getCompletionRate = "SELECT (COUNT(CASE WHEN Status = 'Completed' THEN 1 END) / COUNT(*)) * 100 AS completionRate FROM Task";
const getTaskStats = "SELECT Priority, COUNT(*) AS count FROM Task GROUP BY Priority";
const getCompletedTasks = "SELECT COUNT(*) AS completedTasks FROM Task WHERE Status = 'Completed'";
const getOverdueTasks = "SELECT COUNT(*) AS overdueTasks FROM Task WHERE DeadLine < CURDATE() AND Status != 'Completed'";
const getTasksCloseToDeadline = "SELECT Title, DeadLine FROM Task WHERE DeadLine BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)";
const getPastDeals = "SELECT c.ClientName, d.DealValue, d.Comission, d.DeadLine, d.PaymentStatus FROM Deal d INNER JOIN Customer c ON d.CustomerID = c.CustomerID ORDER BY d.DeadLine DESC LIMIT 5";

module.exports = {
   dbHost, dbPort, dbUser, dbPass, dbName, serverPort, api,
   getTotalSales, getTotalIncome, getTotalCustomers, getCompletionRate,
   getTaskStats, getCompletedTasks, getOverdueTasks, getTasksCloseToDeadline, getPastDeals
};