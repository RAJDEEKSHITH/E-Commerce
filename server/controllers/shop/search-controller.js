const Product = require("../../models/Product");



const searchProducts = async (req,res) => {
    try {
        const {keyword} = req.params;
        if(!keyword ||typeof keyword !== "string") {
            return res.status(400).json({
                success : false,
                message : "Keyword is required and must be in string format"
            })
        }
        const regEX = new RegExp(keyword,'i');
        const createSearchQuery = {
            $or : [
                {title : regEX},
                {description : regEX},
                {category : regEX},
                {brand : regEX}
            ]
        }
        const searchResults = await Product.find(createSearchQuery);
        return res.status(200).json({
            success : true,
            data : searchResults
        })
    }catch(error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
} 

module.exports = {searchProducts};