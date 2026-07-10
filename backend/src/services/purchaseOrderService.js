const prisma = require("../config/prisma");
const reorderService = require("./reorder.service");
// Create Purchase Order
const createPurchaseOrder = async (productId, quantity) => {
  productId = Number(productId);

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      supplier: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const totalAmount = quantity * product.price;

  const purchaseOrder = await prisma.purchaseOrder.create({
    data: {
      supplierId: product.supplierId,
      totalAmount,

      items: {
        create: [
          {
            productId: product.id,
            quantity,
            unitPrice: product.price,
          },
        ],
      },
    },
    include: {
      supplier: true,
      items: true,
    },
  });

  return purchaseOrder;
};

// Get All
const getPurchaseOrders = async () => {
  return prisma.purchaseOrder.findMany({
    include: {
      supplier: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get By ID
const getPurchaseOrderById = async (id) => {
  return prisma.purchaseOrder.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      supplier: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

// Update Status
const updatePurchaseOrderStatus = async (id, status) => {
  return prisma.purchaseOrder.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });
};

const generatePurchaseOrders = async () => {

  const recommendations =
    await reorderService.getReorderRecommendations();

  const createdOrders = [];

  for (const recommendation of recommendations) {

    if (
      recommendation.priority !== "HIGH" &&
      recommendation.priority !== "CRITICAL"
    ) {
      continue;
    }

    const product = await prisma.product.findUnique({
      where: {
        id: recommendation.productId,
      },
      include: {
        supplier: true,
      },
    });

    if (!product) continue;

    const totalAmount =
      recommendation.recommendedReorderQty *
      product.price;

    const purchaseOrder =
      await prisma.purchaseOrder.create({
        data: {
          supplierId: product.supplierId,

          totalAmount,

          items: {
            create: [
              {
                productId: product.id,
                quantity:
                  recommendation.recommendedReorderQty,
                unitPrice: product.price,
              },
            ],
          },
        },
        include: {
          supplier: true,
          items: true,
        },
      });

    createdOrders.push(purchaseOrder);
  }

  return createdOrders;
};


module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrderStatus,
  generatePurchaseOrders,
};