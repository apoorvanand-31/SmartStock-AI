const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
 } = require("../controllers/productController");

router.post("/", protect, createProduct);
router.get("/",protect,getProducts);
router.put("/:id",protect,updateProduct);
router.delete("/:id",protect,deleteProduct);
router.get("/low-stock", protect, getLowStockProducts);

module.exports = router;