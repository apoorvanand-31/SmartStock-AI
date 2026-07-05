const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSupplier,
  getSuppliers,
} = require("../controllers/supplierController");

router.post("/", protect, createSupplier);
router.get("/", protect, getSuppliers);

module.exports = router;