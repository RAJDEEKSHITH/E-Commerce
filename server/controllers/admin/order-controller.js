const Order = require("../../models/Order");
const getAllOrdersOfAllUsers = async (req,res) => {
    try {
        const orders = await Order.find({});
        if(!orders.length) {
            return res.status(404).json({
                success : false,
                message : "No orders found"
            })
        }
        res.status(200).json({
            success : true,
            data : orders
        })
    }
    catch (error) {
    res.status(500).json({
        success : false,
        message : "Some Error Occurred"
        })
    }
}

const getOrderDetailsForAdmin = async (req,res) => {
    try {
        const {id} = req.params;
        const order = await Order.findById(id);
        if(!order) {
            return res.status(404).json({
                success : false,
                message : "Order not found"
            })
        }
        res.status(200).json({
            success : true,
            data : order
        })
    }
    catch (error) {
    res.status(500).json({
        success : false,
        message : "Some Error Occurred"
        })
    }
}

const updateOrderStatus = async (req,res) => {
    try {
        const {id} = req.params;
        const {orderStatus} = req.body;
        const order = await Order.findById(id);
        if(!order) {
            return res.status(404).json({
                success : false,
                message : "Order not found"
            })
        }
        await Order.findByIdAndUpdate(id,{orderStatus});
        res.status(200).json({
            success : true,
            message : "Order Status is updated successfully."
        })
    }
     catch (error) {
    res.status(500).json({
        success : false,
        message : "Some Error Occurred"
        })
    }
}
module.exports = {getAllOrdersOfAllUsers,getOrderDetailsForAdmin,updateOrderStatus};