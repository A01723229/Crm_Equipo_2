const sql = require("mssql");
const bcrypt = require("bcrypt");
const db = require("../database/db.js");

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Seller WHERE Email = @email");

    const seller = result.recordset[0];

    if (!seller) {
      return res.status(401).json({ error: "Incorrect credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, seller.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect credentials." });
    }

    res.json({
      message: "Login successful.",
      seller: {
        name: seller.SellerName,
        email: seller.Email,
        role: seller.Role,
        company: seller.Company
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { postLogin };
