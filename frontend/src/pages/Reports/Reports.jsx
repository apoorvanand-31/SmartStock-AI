import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import api from "../../services/api";

function Reports() {

  const token = localStorage.getItem("token");

  const downloadCSV = async () => {
    try {
      const response = await api.get("/reports/export/csv", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;
      link.download = "sales_report.csv";

      link.click();

    } catch (error) {
      console.log(error);
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await api.get("/reports/export/excel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;
      link.download = "sales_report.xlsx";

      link.click();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>

      <div className="bg-white rounded-xl shadow p-6">

        <PageHeader title="Reports" />

        <div className="flex gap-4">

          <Button onClick={downloadCSV}>
            Download CSV
          </Button>

          <Button
            variant="success"
            onClick={downloadExcel}
          >
            Download Excel
          </Button>

        </div>

      </div>

    </Layout>
  );
}

export default Reports;