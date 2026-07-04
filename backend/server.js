const express =require("express");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/",(req,res)=>{
    res.send("SmartStock API Running");
});

const PORT=process.env.PORT|| 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});