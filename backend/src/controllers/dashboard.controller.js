const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardStats();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

const getSalesAnalytics = async (req, res) => {
  try {
    const data = await dashboardService.getSalesAnalytics();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sales analytics",
    });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const data = await dashboardService.getLowStockProducts();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch low stock products",
    });
  }
};

const getDemandForecast = async (req, res) => {
  try {
    const data = await dashboardService.getDemandForecast();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate demand forecast",
    });
  }
};

module.exports = {
  getDashboard,
  getSalesAnalytics,
  getLowStockProducts,
  getDemandForecast
};
