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

module.exports = {
  createSupplier,
  getSuppliers,
};