const forecastService = require("../services/forecast.service");

const getForecast = async (req, res) => {
  try {
    const { productId } = req.params;

    const forecast = await forecastService.getForecast(productId);

    res.status(200).json({
      success: true,
      data: forecast,
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
  getForecast,
};