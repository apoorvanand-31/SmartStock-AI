const purchaseOrderService = require("../services/purchaseOrderService");

// Create
const createPurchaseOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const purchaseOrder =
      await purchaseOrderService.createPurchaseOrder(
        productId,
        quantity
      );

    res.status(201).json({
      success: true,
      data: purchaseOrder,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getPurchaseOrders = async (req, res) => {
  try {
    const orders =
      await purchaseOrderService.getPurchaseOrders();

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get One
const getPurchaseOrderById = async (req, res) => {
  try {
    const order =
      await purchaseOrderService.getPurchaseOrderById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Purchase order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Status
const updatePurchaseOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order =
      await purchaseOrderService.updatePurchaseOrderStatus(
        req.params.id,
        status
      );

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generatePurchaseOrders = async (req, res) => {
  try {
    const orders =
      await purchaseOrderService.generatePurchaseOrders();

    res.status(201).json({
      success: true,
      message: "Purchase orders generated successfully.",
      data: orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrderStatus,
  generatePurchaseOrders,
};