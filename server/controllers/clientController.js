const { sql, poolPromise } = require("../database/db");

exports.addClient = async (req, res) => {
  try {
    const { ClientName, Company, Description, Telephone, Email } = req.body;
    const sellerId = req.user?.SellerID;
    const pool = await poolPromise;

    await pool.request()
      .input("ClientName", sql.VarChar, ClientName)
      .input("Company", sql.VarChar, Company)
      .input("Description", sql.VarChar, Description)
      .input("Telephone", sql.VarChar, Telephone)
      .input("Email", sql.VarChar, Email)
      .input("SellerID", sql.Int, sellerId)
      .execute("AddClient");

    res.status(201).json({ message: "Client added successfully" });
  } catch (err) {
    console.error("AddClient error:", err);
    res.status(500).json({ error: "Failed to add client" });
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
