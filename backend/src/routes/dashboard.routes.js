const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");

router.get("/", dashboardController.getDashboard);
router.get("/sales", dashboardController.getSalesAnalytics);
router.get("/low-stock", dashboardController.getLowStockProducts);
router.get("/forecast", dashboardController.getDemandForecast);

module.exports = router;