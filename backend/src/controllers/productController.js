const prisma = require("../config/prisma");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      barcode,
      quantity,
      price,
      reorderLevel,
      categoryId,
      supplierId,
    } = req.body;

    // Basic validation
    if (
      !name ||
      !sku ||
      price == null ||
      categoryId == null ||
      supplierId == null
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check duplicate SKU
    const existingProduct = await prisma.product.findUnique({
      where: {
        sku,
      },
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "SKU already exists",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        barcode,
        quantity: quantity || 0,
        price,
        reorderLevel: reorderLevel || 10,

        categoryId,
        supplierId,

        createdById: req.user.id,
      },

      include: {
        category: true,
        supplier: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        supplier: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      quantity,
      price,
      reorderLevel,
      categoryId,
      supplierId,
    } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Validate Category
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: {
          id: Number(categoryId),
        },
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
    }

    // Validate Supplier
    if (supplierId) {
      const supplier = await prisma.supplier.findUnique({
        where: {
          id: Number(supplierId),
        },
      });

      if (!supplier) {
        return res.status(404).json({
          message: "Supplier not found",
        });
      }
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },

      data: {
        name,
        quantity,
        price,
        reorderLevel,
        categoryId,
        supplierId,
      },

      include: {
        category: true,
        supplier: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
  
};
const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    const lowStock = products.filter(
      (product) => product.quantity <= product.reorderLevel
    );

    res.status(200).json(lowStock);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
};