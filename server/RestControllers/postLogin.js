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

    const token = jwt.sign(
      {
        id: seller.SellerID,
        email: seller.Email,
        role: seller.Role,
        name: seller.SellerName,
        company: seller.Company
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

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
