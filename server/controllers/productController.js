const { sql, poolPromise } = require("../database/db");

exports.addProduct = async (req, res) => {
    try {
      const { Name, Description, Category, Price } = req.body;
      const pool = await poolPromise;
      await pool.request()
        .input("Name", sql.VarChar, Name)
        .input("Description", sql.Text, Description)
        .input("Category", sql.VarChar, Category)
        .input("Price", sql.Decimal, Price)
        .execute("AddProduct");
      res.status(201).json({ message: "Product added" });
    } catch (err) {
      console.error("AddProduct error:", err);
      res.status(500).json({ error: "Failed to add product" });
    }
  };
  
  exports.updateProduct = async (req, res) => {
    try {
      const { Name, Description, Category, Price } = req.body;
      const pool = await poolPromise;
      await pool.request()
        .input("ProductID", sql.Int, req.params.id)
        .input("Name", sql.VarChar, Name)
        .input("Description", sql.Text, Description)
        .input("Category", sql.VarChar, Category)
        .input("Price", sql.Decimal, Price)
        .execute("UpdateProduct");
      res.json({ message: "Product updated" });
    } catch (err) {
      console.error("UpdateProduct error:", err);
      res.status(500).json({ error: "Failed to update product" });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input("ProductID", sql.Int, req.params.id)
        .execute("DeleteProduct");
      res.json({ message: "Product deleted" });
    } catch (err) {
      console.error("DeleteProduct error:", err);
      res.status(500).json({ error: "Failed to delete product" });
    }
  };