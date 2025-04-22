const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db.js");

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
        id: seller.SellerID,
        email: seller.Email,
        role: seller.Role,
        name: seller.SellerName,
        company: seller.Company,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Login successful for:", email);

    res.json({
      message: "Login successful.",
      seller: {
        name: seller.SellerName,
        email: seller.Email,
        role: seller.Role,
        company: seller.Company,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message || error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { postLogin };
