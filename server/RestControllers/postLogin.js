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
      .query("SELECT * FROM [User] WHERE Email = @email");

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: "Incorrect credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect credentials." });
    }

    res.json({
      message: "Login successful.",
      user: {
        id: user.UserID,
        email: user.Email,
        role: user.Role,
        company: user.Company
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { postLogin };
