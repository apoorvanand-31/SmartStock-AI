const prisma = require("../config/prisma");

// Create Supplier
const createSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Supplier name is required",
      });
    }

    // If email is provided, check for duplicates
    if (email) {
      const existingSupplier = await prisma.supplier.findUnique({
        where: { email },
      });

      if (existingSupplier) {
        return res.status(400).json({
          message: "Supplier email already exists",
        });
      }
    }

    const supplier = await prisma.supplier.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.status(201).json({
      message: "Supplier created successfully",
      supplier,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json(suppliers);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Supplier By ID
const getSupplierById = async (req, res) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        products: true,
        purchaseOrders: true,
      },
    });

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Update Supplier
const updateSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const supplier = await prisma.supplier.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    const updatedSupplier = await prisma.supplier.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.status(200).json({
      message: "Supplier updated successfully",
      supplier: updatedSupplier,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Delete Supplier
const deleteSupplier = async (req, res) => {
  try {
    const supplierId = Number(req.params.id);

    const supplier = await prisma.supplier.findUnique({
      where: {
        id: supplierId,
      },
      include: {
        products: true,
      },
    });

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    if (supplier.products.length > 0) {
      return res.status(400).json({
        message:
          "Cannot delete supplier because products are linked to it.",
      });
    }

    await prisma.supplier.delete({
      where: {
        id: supplierId,
      },
    });

    res.status(200).json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};