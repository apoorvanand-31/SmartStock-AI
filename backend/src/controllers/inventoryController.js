const prisma = require("../config/prisma");

const stockIn = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Valid productId and quantity are required",
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update stock
    const updatedProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: product.quantity + Number(quantity),
      },
    });

    // Save transaction
    const transaction = await prisma.inventoryTransaction.create({
      data: {
        productId: product.id,
        quantity: Number(quantity),
        type: "STOCK_IN",
      },
    });

    res.status(201).json({
      message: "Stock added successfully",
      product: updatedProduct,
      transaction,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Valid productId and quantity are required",
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: product.quantity - Number(quantity),
      },
    });

    const transaction = await prisma.inventoryTransaction.create({
      data: {
        productId: product.id,
        quantity: Number(quantity),
        type: "STOCK_OUT",
      },
    });

    res.status(200).json({
      message: "Stock removed successfully",
      product: updatedProduct,
      transaction,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    const history = await prisma.inventoryTransaction.findMany({
      where: {
        productId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
          },
        },
      },
    });

    res.status(200).json(history);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  stockIn,
  stockOut,
  getTransactionHistory,
};