const express = require("express");

const {searchProducts} = require("../../controllers/shop/search-controller");

const router = express.Router();

router.get("/get/:keyword",searchProducts);

module.exports = router;