const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  stockIn,
  stockOut,
  getTransactionHistory,
} = require("../controllers/inventoryController");

router.post("/stock-in", protect, stockIn);
router.post("/stock-out", protect, stockOut);
router.get("/history/:productId", protect, getTransactionHistory);

module.exports = router;