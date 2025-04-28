const { sql, poolPromise } = require("../database/db");

exports.addDeal = async (req, res) => {
  try {
    const { DealValue, Comission, DeadLine, PaymentStatus, Description, ClientID } = req.body;
    const sellerId = req.user?.SellerID;
    const pool = await poolPromise;
    await pool.request()
      .input("DealValue", sql.Decimal(18, 2), DealValue)  
      .input("Comission", sql.Decimal(18, 2), Comission)  
      .input("DeadLine", sql.Date, DeadLine)
      .input("PaymentStatus", sql.VarChar, PaymentStatus)
      .input("Description", sql.VarChar, Description)
      .input("ClientID", sql.Int, ClientID) 
      .input("SellerID", sql.Int, sellerId)
      .execute("AddDeal");
    res.status(201).json({ message: "Deal added" });
  } catch (err) {
    console.error("AddDeal error:", err.message || err);
    return res.status(500).json({ error: "Failed to add deal" });
  }
};

exports.updateDeal = async (req, res) => {
  try {
    const { DealValue, Comission, DeadLine, PaymentStatus, Description, ClientID } = req.body; 
    const pool = await poolPromise;
    await pool.request()
      .input("DealID", sql.Int, req.params.id)
      .input("DealValue", sql.Decimal(18, 2), DealValue)
      .input("Comission", sql.Decimal(18, 2), Comission)
      .input("DeadLine", sql.Date, DeadLine)
      .input("PaymentStatus", sql.VarChar, PaymentStatus)
      .input("Description", sql.VarChar, Description)
      .input("ClientID", sql.Int, ClientID) 
      .execute("UpdateDeal");
    res.json({ message: "Deal updated" });
  } catch (err) {
    console.error("UpdateDeal error:", err.message || err);
    return res.status(500).json({ error: "Failed to update deal" });
  }
};

exports.deleteDeal = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("DealID", sql.Int, req.params.id)
      .execute("DeleteDeal");
    res.json({ message: "Deal deleted" });
  } catch (err) {
    console.error("DeleteDeal error:", err.message || err);
    return res.status(500).json({ error: "Failed to delete deal" });
  }
};
