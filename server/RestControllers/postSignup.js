const sql = require("mssql");
const bcrypt = require("bcrypt");
const db = require("../database/db.js");

const postSignup = async (req, res) => {
  const { email, password, role, company, sellerName } = req.body;

  if (!email || !password || !role || !sellerName || !company) {
    return res.status(400).json({ error: "All fields are required: sellerName, email, password, role, company." });
  }

  try {
    const pool = await db.poolPromise;

    // Check if seller (email) already exists
    const sellerExists = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Seller WHERE Email = @email");

    if (sellerExists.recordset.length > 0) {
      return res.status(409).json({ error: "Seller already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new seller
    await pool
      .request()
      .input("sellerName", sql.VarChar, sellerName)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .input("role", sql.VarChar, role)
      .input("company", sql.VarChar, company)
      .query(`
        INSERT INTO Seller (SellerName, Email, [Password], [Role], Company)
        VALUES (@sellerName, @email, @password, @role, @company)
      `);

    res.status(201).json({ message: "Seller account created successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { postSignup };
