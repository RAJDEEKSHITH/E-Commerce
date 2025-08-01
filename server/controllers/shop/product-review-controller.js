const Order = require("../../models/Order");
const Product = require("../../models/Product");
const productReview = require("../../models/Review");


const addProductReview = async (req,res) => {
    try {
        const { productId,userId,userName,reviewMessage,reviewValue } = req.body;
        const order =await Order.findOne({
            userId,
            "cartItems.productId" : productId,
             orderStatus : "confirmed"
        })
        if(!order) {
            return res.status(403).json({
                success : false,
                message : "You need to purchase product to review it."
            })
        }
        const checkExistingReview = await productReview.findOne({productId,userId});
        if(checkExistingReview) {
            return res.status(400).json({
                success : false,
                message : "You already reviewed Product"
            })
        }
        const newReview =new productReview({
             productId,userId,userName,reviewMessage,reviewValue
        });
        await newReview.save();
        const reviews = await productReview.find({productId});
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum,reviewItem) => sum + reviewItem.reviewValue,0)/totalReviewsLength;
        await Product.findByIdAndUpdate(productId,{averageReview});
        res.status(201).json({
            success : true,
            data : newReview
        })
    } catch(error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

const getProductReviews = async (req,res) => {
    try {
         const {productId} = req.params;
         const reviews = await productReview.find({productId});
            res.status(200).json({
            success : true,
            data : reviews
        })
    }catch(error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

module.exports = {addProductReview, getProductReviews};