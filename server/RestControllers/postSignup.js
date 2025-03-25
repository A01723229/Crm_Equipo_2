const sql = require("mssql");
const bcrypt = require("bcrypt");
const db = require("../database/db.js");

const postSignup = async (req, res) => {
  const { email, password, role, company } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const pool = await db.poolPromise;
    const userExists = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM [User] WHERE Email = @email");

    if (userExists.recordset.length > 0) {
      return res.status(409).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .input("role", sql.VarChar, role)
      .input("company", sql.VarChar, company)
      .query("INSERT INTO [User] (Email, [Password], [Role], Company) VALUES (@email, @password, @role, @company)");

    res.status(201).json({ message: "User was created succesfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { postSignup };