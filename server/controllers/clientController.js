const { sql, poolPromise } = require("../database/db");

exports.addDeal = async (req, res) => {
  try {
    const { DealValue, Comission, DeadLine, PaymentStatus, Description, ClientId } = req.body;
    const sellerId = req.user?.SellerID; 

    if (!sellerId) {
      console.error("SellerID not found in user token");
      return res.status(400).json({ error: "SellerID not found in user token" });
    }

    const pool = await poolPromise;
    await pool.request()
      .input("DealValue", sql.Decimal(18, 2), DealValue)  
      .input("Comission", sql.Decimal(18, 2), Comission)  
      .input("DeadLine", sql.Date, DeadLine)
      .input("PaymentStatus", sql.VarChar, PaymentStatus)
      .input("Description", sql.VarChar, Description)
      .input("ClientID", sql.Int, ClientId) 
      .input("SellerID", sql.Int, sellerId)
      .execute("AddDeal");

    res.status(201).json({ message: "Deal added" });
  } catch (err) {
    console.error("AddDeal error:", err.message || err);
    return res.status(500).json({ error: "Failed to add deal" });
  }
};


exports.updateClient = async (req, res) => {
  try {
    const { ClientId, ClientName, Company, Description, Telephone, Email } = req.body;

    const pool = await poolPromise;
    await pool.request()
      .input("ClientId", sql.Int, ClientId)
      .input("ClientName", sql.VarChar, ClientName)
      .input("Company", sql.VarChar, Company)
      .input("Description", sql.VarChar, Description)
      .input("Telephone", sql.VarChar, Telephone)
      .input("Email", sql.VarChar, Email)
      .execute("UpdateClient");
      
    res.json({ message: "Client updated" });
  } catch (err) {
    console.error("UpdateClient error:", err);
    res.status(500).json({ error: "Failed to update client" });
  }
};


exports.deleteClient = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("ClientID", sql.Int, req.params.id)
      .execute("DeleteClient");
    res.json({ message: "Client deleted" });
  } catch (err) {
    console.error("DeleteClient error:", err);
    res.status(500).json({ error: "Failed to delete client" });
  }
};
