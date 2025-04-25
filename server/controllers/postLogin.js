const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db.js");

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    console.log("Login attempt for:", email);

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Seller WHERE Email = @email");

    console.log("DB query result:", result.recordset);

    const seller = result.recordset[0];
    if (!seller || !seller.Password) {
      console.warn("No user or missing password found in DB.");
      return res.status(401).json({ error: "Incorrect credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, seller.Password);
    if (!passwordMatch) {
      console.warn("Password mismatch.");
      return res.status(401).json({ error: "Incorrect credentials." });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign(
      {
        SellerID: seller.SellerID,   // ✅ Correct field
        SellerName: seller.SellerName,
        Email: seller.Email,
        Role: seller.Role,
        Company: seller.Company,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("Login successful for:", email);

    res.json({
      message: "Login successful.",
      seller: {
        SellerID: seller.SellerID,
        SellerName: seller.SellerName,
        Email: seller.Email,
        Role: seller.Role,
        Company: seller.Company,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message || error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { postLogin };
