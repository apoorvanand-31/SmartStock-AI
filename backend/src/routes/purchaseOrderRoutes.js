const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrderStatus,
  generatePurchaseOrders
} = require("../controllers/purchaseOrderController");

router.post("/", protect, createPurchaseOrder);

router.get("/", protect, getPurchaseOrders);

router.get("/:id", protect, getPurchaseOrderById);

router.patch("/:id/status", protect, updatePurchaseOrderStatus);

router.post(
  "/generate",
  protect,
  generatePurchaseOrders
);

module.exports = router;