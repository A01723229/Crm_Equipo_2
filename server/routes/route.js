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

console.log("postLogin controller is:", postLogin);

router.post("/login", postLogin);
router.post("/signup", postSignup);
router.get("/me", authMiddleware, getMe);
router.post("/gemini", postGemini);

// CRUD: Clients
router.post("/clients", authMiddleware, addClient);
router.put("/clients/:id", authMiddleware, updateClient);
router.delete("/clients/:id", authMiddleware, deleteClient);

// CRUD: Deals
router.post("/deals", authMiddleware, addDeal);
router.put("/deals/:id", authMiddleware, updateDeal);
router.delete("/deals/:id", authMiddleware, deleteDeal);

// CRUD: Tasks
router.post("/tasks", authMiddleware, addTask);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

// CRUD: Products
router.post("/products", authMiddleware, addProduct);
router.put("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

module.exports = router;
