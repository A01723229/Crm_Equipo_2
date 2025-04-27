const { sql, poolPromise } = require("../database/db");

exports.addClient = async (req, res) => {
  try {
    const { ClientName, Company, Description, Telephone, Email } = req.body;
    const sellerId = req.user?.SellerID;

    console.log("Decoded user:", req.user);
    console.log("Adding client:", { ClientName, Company, Telephone, Email, SellerID: sellerId });

    if (!sellerId) {
      console.error("SellerID not found on req.user");
      return res.status(400).json({ error: "SellerID not found in user token" });
    }

    const pool = await poolPromise;
    await pool.request()
      .input("ClientName", sql.VarChar, ClientName)
      .input("Company", sql.VarChar, Company)
      .input("Description", sql.VarChar, Description)
      .input("Telephone", sql.VarChar, Telephone)
      .input("Email", sql.VarChar, Email)
      .input("SellerID", sql.Int, sellerId)
      .execute("AddClient");

    console.log("Client added successfully!");

    res.status(201).json({ message: "Client added" });
  } catch (err) {
    console.error("AddClient error:", err);
    res.status(500).json({ error: "Failed to add client" });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { ClientName, Company, Description, Telephone, Email } = req.body;

    console.log("UPDATE CLIENT REQUEST BODY:", { ClientName, Company, Description, Telephone, Email });

    const pool = await poolPromise;
    await pool.request()
      .input("ClientID", sql.Int, req.params.id)
      .input("ClientName", sql.VarChar, ClientName)
      .input("Organization", sql.VarChar, Company) 
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
