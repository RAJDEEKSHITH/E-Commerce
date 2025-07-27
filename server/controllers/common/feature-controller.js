const Feature = require("../../models/Feature");

const addFeatureImage = async(req,res) => {
    try {
        const {image} = req.body;
        if (!image || image.trim() === "") { 
      return res.status(400).json({
            success: false,
            message: "Image URL is required",
          });
        }

        const FeatureImages = new Feature({image});
        await FeatureImages.save();
        res.status(201).json({
            success : true,
            data : FeatureImages
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    } 
}

const getFeatureImages = async(req,res) => {
    try {
        const images= await Feature.find({});
        res.status(201).json({
            success : true,
            data : images
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    } 
}

module.exports = {addFeatureImage, getFeatureImages};