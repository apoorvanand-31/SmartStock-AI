const prisma = require("../config/prisma");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {

    const categories = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json(categories);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
};