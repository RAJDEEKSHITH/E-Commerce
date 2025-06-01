const { ImageUploadUtil } = require("../../helpers/Cloudinary");
const Product = require("../../models/Product");

const handleImageUpload  = async (req,res) => {
    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:"+ req.file.mimetype + ";base64," + b64;
        const result = await ImageUploadUtil(url);
        res.json({
            success : true,
            result
        })
    }catch(error){
       console.error("Image upload error:", error);
        res.status(500).json({
            success: false,
            message: "Error Occurred"
        });
    }
};

// add a new product
const addProduct = async (req,res) => {
    try{
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;
        const newlyCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        });
        await newlyCreatedProduct.save();
        res.status(201).json({
            success : true,
            data : newlyCreatedProduct
        })

    }catch(error) {
        console.error("Error : ", error)
        res.status(500).json({
            success : false,
            message : "Failed to add product. Please try again later."
        })
    }
}

// fetch all products

const fetchAllProducts = async (req,res) => {
    try{
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success : true,
            data : listOfProducts
        })

    }catch(error) {
        console.error("Error : ", error)
        res.status(500).json({
            success : false,
            message : "Failed to fetch products. Please try again later."
        })
    }
}


// edit a product
const editProduct = async (req,res) => {
    try{
    const {id} = req.params;
    const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;
    
    const findProduct = await Product.findById(id);

    if(!findProduct) return res.status(404).json({
        success : false,
        message : 'Product not found'
    });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;


    await findProduct.save();
    return res.status(200).json({
        success : true,
        data : findProduct
    })

    }catch(error) {
        console.error("Error : ", error)
        res.status(500).json({
            success : false,
            message : "Failed to update product. Please try again later."
        })
    }
}

// delete a product
const deleteProduct = async (req,res) => {
    try{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
     if(!product) return res.status(404).json({
        success : false,
        message : 'Product not found'
    });  
    
    res.status(200).json({
        success : true,
        message : "Product deleted successfully"
    })
    } catch(error) {
        console.error("Error : ", error)
        res.status(500).json({
            success : false,
            message : "Failed to delete product. Please try again later."
        })
    }
}

module.exports = {handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct}