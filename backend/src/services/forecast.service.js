const prisma = require("../config/prisma");

const getForecast = async (productId) => {
  productId = Number(productId);

  // Check product
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // Fetch all STOCK_OUT transactions
  const transactions = await prisma.inventoryTransaction.findMany({
    where: {
      productId,
      type: "STOCK_OUT",
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (transactions.length === 0) {
    return {
      productId,
      product: product.name,
      currentStock: product.quantity,
      message: "No sales history available for forecasting.",
    };
  }

  // Group sales by day
  const dailySales = {};

  transactions.forEach((transaction) => {
    const date = transaction.createdAt.toISOString().split("T")[0];

    if (!dailySales[date]) {
      dailySales[date] = 0;
    }

    dailySales[date] += transaction.quantity;
  });

  // Convert grouped data into array
    const salesPerDay = Object.values(dailySales);

    const daysOfData = salesPerDay.length;

// Last 7 days (or fewer if less data exists)
    const recentSales = salesPerDay.slice(-7);

    const totalRecentSales = recentSales.reduce(
        (sum, qty) => sum + qty,
        0
    );

    const averageDailySales =
    recentSales.length > 0
        ? totalRecentSales / recentSales.length
        : 0;

  // Predict next 7 days
    const predictedNext7Days = Array(7).fill(
        Math.round(averageDailySales)
    );

  const expectedDemand = Math.round(averageDailySales * 7);

  const daysUntilOutOfStock =
    averageDailySales === 0
      ? null
      : Math.floor(product.quantity / averageDailySales);
    const warning =
    daysOfData < 7
    ? `Forecast is based on only ${daysOfData} day(s) of historical sales.`
    : null;

  return {
    productId: product.id,
    product: product.name,
    daysOfData,
    averageDailySales: Number(averageDailySales.toFixed(2)),
    predictedNext7Days,
    expectedDemand,
    currentStock: product.quantity,
    daysUntilOutOfStock,
    warning
  };
};

module.exports = {
  getForecast,
};