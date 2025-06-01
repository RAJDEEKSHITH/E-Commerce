const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authRouter = require("./routes/auth/authRoutes.js");
const adminProductsRouter = require("./routes/admin/productsRoutes.js")
const shopProductsRouter = require("./routes/shop/shop-products-routes.js")
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to Database:", error);
  }
}

connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : "http://localhost:5173",
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/admin/products",adminProductsRouter);
app.use("/api/shop/products",shopProductsRouter);



app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));
