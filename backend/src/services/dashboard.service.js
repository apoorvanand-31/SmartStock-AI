const prisma = require("../config/prisma");

const getDashboardStats = async () => {
  // Total number of products
  const totalProducts = await prisma.product.count();

  // All products
  const products = await prisma.product.findMany({
    select: {
      quantity: true,
      price: true,
      reorderLevel: true,
    },
  });

  // Total inventory quantity
  const totalInventory = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  // Total inventory value
  const inventoryValue = products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );

  // Low stock products
  const lowStockCount = products.filter(
    (product) => product.quantity <= product.reorderLevel
  ).length;

  return {
    totalProducts,
    totalInventory,
    inventoryValue,
    lowStockCount,
  };
};

const getSalesAnalytics = async () => {
  const transactions = await prisma.inventoryTransaction.findMany({
    where: {
      type: "STOCK_OUT",
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      quantity: true,
      createdAt: true,
    },
  });

  const salesMap = {};

  transactions.forEach((transaction) => {
    const date = transaction.createdAt.toISOString().split("T")[0];

    if (!salesMap[date]) {
      salesMap[date] = 0;
    }

    salesMap[date] += transaction.quantity;
  });

  return Object.entries(salesMap).map(([date, totalSold]) => ({
    date,
    totalSold,
  }));
};

const getLowStockProducts = async () => {
  return await prisma.product.findMany({
    where: {
      quantity: {
        lte: prisma.product.fields.reorderLevel,
      },
    },
    select: {
      id: true,
      name: true,
      sku: true,
      quantity: true,
      reorderLevel: true,
      price: true,
    },
  });
};

const getDemandForecast = async () => {
  const transactions = await prisma.inventoryTransaction.findMany({
    where: {
      type: "STOCK_OUT",
    },
    select: {
      quantity: true,
    },
  });

  if (transactions.length === 0) {
    return {
      predictedDemand: 0,
      basedOnTransactions: 0,
    };
  }

  const totalSold = transactions.reduce(
    (sum, transaction) => sum + transaction.quantity,
    0
  );

  const averageDemand = totalSold / transactions.length;

  return {
    predictedDemand: Math.round(averageDemand),
    basedOnTransactions: transactions.length,
  };
};

module.exports = {
  getDashboardStats,
  getSalesAnalytics,
  getLowStockProducts,
  getDemandForecast,
};
