const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db.js");

const postSignup = async (req, res) => {
  const { email, password, role, company, sellerName } = req.body;

  if (!email || !password || !role || !sellerName || !company) {
    return res.status(400).json({ error: "All fields are required: sellerName, email, password, role, company." });
  }

  try {
    const pool = await db.poolPromise;

    const sellerExists = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Seller WHERE Email = @email");

    if (sellerExists.recordset.length > 0) {
      return res.status(409).json({ error: "Seller already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Seller WHERE Email = @email");

    const newSeller = result.recordset[0];

    const token = jwt.sign(
      {
        id: newSeller.SellerID,
        email: newSeller.Email,
        role: newSeller.Role,
        name: newSeller.SellerName,
        company: newSeller.Company,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Signup successful.",
      seller: {
        name: newSeller.SellerName,
        email: newSeller.Email,
        role: newSeller.Role,
        company: newSeller.Company,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { postSignup };
