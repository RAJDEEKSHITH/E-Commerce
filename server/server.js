require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authRouter = require("./routes/auth/authRoutes");
const adminProductsRouter = require("./routes/admin/productsRoutes");
const shopProductsRouter = require("./routes/shop/shop-products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");



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
        origin : process.env.CLIENT_BASE_URL,
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
app.use("/api/admin/orders",adminOrderRouter);
app.use("/api/shop/products",shopProductsRouter);
app.use("/api/shop/cart",shopCartRouter);
app.use("/api/shop/address",shopAddressRouter);
app.use("/api/shop/order",shopOrderRouter);
app.use("/api/shop/search",shopSearchRouter);
app.use("/api/shop/review",shopReviewRouter);
app.use("/api/common/feature",commonFeatureRouter);



app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));
