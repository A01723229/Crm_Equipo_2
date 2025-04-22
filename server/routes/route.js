const express = require("express");
const { getData } = require("../controllers/getData");
const { postLogin } = require("../controllers/postLogin");
const { postSignup } = require("../controllers/postSignup");
const { getMe } = require("../controllers/getMe");
const postGemini = require("../controllers/postGemini");
const authMiddleware = require("../handlers/auth");

const { addClient, updateClient, deleteClient } = require("../controllers/clientController");
const { addDeal, updateDeal, deleteDeal } = require("../controllers/dealController");
const { addTask, updateTask, deleteTask } = require("../controllers/taskController");
const { addProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

// Existing routes
router.get("/data", getData);
router.post("/login", postLogin);
router.post("/signup", postSignup);
router.get("/me", authMiddleware, getMe);
router.post("/gemini", postGemini);

// CRUD: Clients
router.post("/clients", addClient);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

// CRUD: Deals
router.post("/deals", addDeal);
router.put("/deals/:id", updateDeal);
router.delete("/deals/:id", deleteDeal);

// CRUD: Tasks
router.post("/tasks", addTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

// CRUD: Products
router.post("/products", addProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
