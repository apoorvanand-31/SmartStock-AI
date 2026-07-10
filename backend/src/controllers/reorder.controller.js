const reorderService = require("../services/reorder.service");

const getReorderRecommendations = async (req, res) => {
  try {
    const recommendations =
      await reorderService.getReorderRecommendations();

    res.status(200).json({
      success: true,
      data: recommendations,
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
  getReorderRecommendations,
};