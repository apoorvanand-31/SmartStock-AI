const prisma = require("../config/prisma");

const getReorderRecommendations = async () => {
  // Fetch all products
  const products = await prisma.product.findMany();

  const recommendations = [];

  for (const product of products) {
    // Fetch all STOCK_OUT transactions
    const transactions = await prisma.inventoryTransaction.findMany({
      where: {
        productId: product.id,
        type: "STOCK_OUT",
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Skip products with no sales
    if (transactions.length === 0) {
      continue;
    }

    // Group sales by date
    const dailySales = {};

    transactions.forEach((transaction) => {
      const date = transaction.createdAt.toISOString().split("T")[0];

      if (!dailySales[date]) {
        dailySales[date] = 0;
      }

      dailySales[date] += transaction.quantity;
    });

    // Calculate 7-day moving average
    const salesPerDay = Object.values(dailySales);

    const recentSales = salesPerDay.slice(-7);

    const totalRecentSales = recentSales.reduce(
      (sum, qty) => sum + qty,
      0
    );

    const averageDailySales =
      recentSales.length > 0
        ? totalRecentSales / recentSales.length
        : 0;

    // Skip if no average sales
    if (averageDailySales === 0) {
      continue;
    }

    // Estimate stock-out
    const daysUntilOutOfStock = Math.floor(
      product.quantity / averageDailySales
    );
    const estimatedStockOutDate = new Date();
    estimatedStockOutDate.setDate(
        estimatedStockOutDate.getDate() + daysUntilOutOfStock
    );

    // Determine priority
    let priority;
    let reason;

    if (daysUntilOutOfStock <= 3) {
      priority = "CRITICAL";
      reason = `Inventory expected to run out in ${daysUntilOutOfStock} day(s).`;
    } else if (daysUntilOutOfStock <= 7) {
      priority = "HIGH";
      reason = `Inventory expected to run out within one week.`;
    } else if (daysUntilOutOfStock <= 14) {
      priority = "MEDIUM";
      reason = `Inventory should be replenished within two weeks.`;
    } else {
      priority = "LOW";
      reason = `Inventory level is currently sufficient.`;
    }

    // Recommend reorder quantity (10 days of stock)
    const recommendedReorderQty = Math.ceil(
      averageDailySales * 10
    );

    let reorderStatus;

    switch (priority) {
      case "CRITICAL":
        reorderStatus = "Order Immediately";
        break;

      case "HIGH":
        reorderStatus = "Order This Week";
        break;

      case "MEDIUM":
        reorderStatus = "Plan Reorder";
        break;

      default:
        reorderStatus = "Stock Healthy";
    }

    

    recommendations.push({
      productId: product.id,
      product: product.name,
      sku: product.sku,
      currentStock: product.quantity,
      averageDailySales: Number(
        averageDailySales.toFixed(2)
      ),
      daysUntilOutOfStock,
      estimatedStockOutDate: estimatedStockOutDate.toISOString().split("T")[0],
      recommendedReorderQty,
      priority,
      reorderStatus,
      reason,
    });
  }

  // Priority order
  const priorityRank = {
    CRITICAL: 1,
    HIGH: 2,
    MEDIUM: 3,
    LOW: 4,
  };

  recommendations.sort((a, b) => {
    return priorityRank[a.priority] - priorityRank[b.priority];
  });

  return recommendations;
};

module.exports = {
  getReorderRecommendations,
};