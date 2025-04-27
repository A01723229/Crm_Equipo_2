const { sql, poolPromise } = require("../database/db");

exports.addTask = async (req, res) => {
    try {
      const { Title, Status, Priority, Description, DeadLine, Stage, DealID } = req.body;
      const SellerID = req.user?.SellerID;
  
      if (!SellerID) {
        return res.status(403).json({ error: "Unauthorized: SellerID not found in token." });
      }
  
      const pool = await poolPromise;
      await pool.request()
        .input("Title", sql.VarChar, Title)
        .input("Status", sql.VarChar, Status)
        .input("Priority", sql.VarChar, Priority)
        .input("Description", sql.VarChar, Description)
        .input("DeadLine", sql.Date, DeadLine)
        .input("Stage", sql.VarChar, Stage)
        .input("DealID", sql.Int, DealID)
        .input("SellerID", sql.Int, SellerID)
        .execute("AddTask");
  
      res.status(201).json({ message: "Task added" });
    } catch (err) {
      console.error("AddTask error:", err);
      res.status(500).json({ error: "Failed to add task" });
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const { Title, Status, Priority, Description, DeadLine, Stage } = req.body;
      const SellerID = req.user?.SellerID;
  
      if (!SellerID) {
        return res.status(403).json({ error: "Unauthorized: SellerID not found in token." });
      }
  
      const pool = await poolPromise;
      await pool.request()
        .input("TaskID", sql.Int, req.params.id)
        .input("Title", sql.VarChar, Title)
        .input("Status", sql.VarChar, Status)
        .input("Priority", sql.VarChar, Priority)
        .input("Description", sql.VarChar, Description)
        .input("DeadLine", sql.Date, DeadLine)
        .input("Stage", sql.VarChar, Stage)
        .input("SellerID", sql.Int, SellerID)
        .execute("UpdateTask");
  
      res.json({ message: "Task updated" });
    } catch (err) {
      console.error("UpdateTask error:", err);
      res.status(500).json({ error: "Failed to update task" });
    }
  };  
  
  exports.deleteTask = async (req, res) => {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input("TaskID", sql.Int, req.params.id)
        .execute("DeleteTask");
  
      res.json({ message: "Task deleted" });
    } catch (err) {
      console.error("DeleteTask error:", err);
      res.status(500).json({ error: "Failed to delete task" });
    }
  };
  