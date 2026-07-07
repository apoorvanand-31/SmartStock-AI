const express = require("express");
const router = express.Router();

const reportController = require("../controllers/report.controller");

router.get("/sales", reportController.getSalesReport);
router.get("/top-products", reportController.getTopSellingProducts);
router.get("/export/csv", reportController.exportSalesCSV);
router.get("/export/excel", reportController.exportSalesExcel);

module.exports = router;