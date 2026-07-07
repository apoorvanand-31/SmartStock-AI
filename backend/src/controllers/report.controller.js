const reportService = require("../services/report.service");

const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const report = await reportService.getSalesReport(
      startDate,
      endDate
    );

    res.status(200).json({
      success: true,
      count: report.length,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sales report",
    });
  }
};

const getTopSellingProducts = async (req, res) => {
  try {
    const data = await reportService.getTopSellingProducts();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch top selling products",
    });
  }
};

const exportSalesCSV = async (req, res) => {
  try {
    const csv = await reportService.exportSalesCSV();

    res.header("Content-Type", "text/csv");
    res.attachment("sales_report.csv");

    return res.send(csv);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to export CSV",
    });
  }
};

const exportSalesExcel = async (req, res) => {
  try {
    const workbook = await reportService.exportSalesExcel();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=sales_report.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to export Excel",
    });
  }
};

module.exports = {
  getSalesReport,
  getTopSellingProducts,
  exportSalesCSV,
  exportSalesExcel,
};