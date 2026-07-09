const express =require("express");
const dotenv=require("dotenv");
const cors=require("cors");


dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const supplierRoutes = require("./src/routes/supplierRoutes");
const productRoutes = require("./src/routes/productRoutes");
const inventoryRoutes = require("./src/routes/inventoryRoutes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const reportRoutes = require("./src/routes/report.routes");
const forecastRoutes=require("./src/routes/forecast.routes");
const reorderRoutes = require("./src/routes/reorder.routes");


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/forecast", forecastRoutes);
app.use("/api/reorder", reorderRoutes);

app.get("/",(req,res)=>{
    res.send("SmartStock API Running");
});

const PORT=process.env.PORT|| 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});