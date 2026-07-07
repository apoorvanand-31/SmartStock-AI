const prisma = require("../config/prisma");
const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");

const getSalesReport = async (startDate, endDate) => {
  const where = {
    type: "STOCK_OUT",
  };

  if (startDate && endDate) {
    where.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  return await prisma.inventoryTransaction.findMany({
    where,
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          price: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getTopSellingProducts = async () => {
  const transactions = await prisma.inventoryTransaction.findMany({
    where: {
      type: "STOCK_OUT",
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          price: true,
        },
      },
    },
  });

  const productMap = {};

  transactions.forEach((transaction) => {
    const id = transaction.product.id;

    if (!productMap[id]) {
      productMap[id] = {
        productId: id,
        name: transaction.product.name,
        sku: transaction.product.sku,
        price: transaction.product.price,
        totalSold: 0,
      };
    }

    productMap[id].totalSold += transaction.quantity;
  });

  return Object.values(productMap).sort(
    (a, b) => b.totalSold - a.totalSold
  );
};

const exportSalesCSV = async () => {
  const sales = await prisma.inventoryTransaction.findMany({
    where: {
      type: "STOCK_OUT",
    },
    include: {
      product: {
        select: {
          name: true,
          sku: true,
          price: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  
  const formattedData = sales.map((sale) => ({
    Product: sale.product.name,
    SKU: sale.product.sku,
    Price: sale.product.price,
    Quantity: sale.quantity,
    Date: sale.createdAt.toISOString(),
  }));

  const parser = new Parser();
  return parser.parse(formattedData);
};

const exportSalesExcel = async () => {
  const sales = await prisma.inventoryTransaction.findMany({
    where: {
      type: "STOCK_OUT",
    },
    include: {
      product: {
        select: {
          name: true,
          sku: true,
          price: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sales Report");

  worksheet.columns = [
    { header: "Product", key: "product", width: 30 },
    { header: "SKU", key: "sku", width: 20 },
    { header: "Price", key: "price", width: 15 },
    { header: "Quantity", key: "quantity", width: 15 },
    { header: "Date", key: "date", width: 30 },
  ];

  sales.forEach((sale) => {
    worksheet.addRow({
      product: sale.product.name,
      sku: sale.product.sku,
      price: sale.product.price,
      quantity: sale.quantity,
      date: sale.createdAt.toISOString(),
    });
  });

  return workbook;
};

module.exports = {
  getSalesReport,
  getTopSellingProducts,
  exportSalesCSV,
  exportSalesExcel,
};