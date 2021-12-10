const express = require("express");
const ProductService = require("./services/ProductServices");

console.log("ProductService: ", ProductService);

const router = express.Router();

// Product route(s) - Retrieve product data for items \\
router.get("product-data", ProductService.fetchAllProducts);

// User routes \\
// login
// logout
// register user
// upload an item to shop

router.post("add-to-bag");

router.delete("remove-from-bag");

module.exports = router;

// --- CRUD requests --- \\
//Create - post
//Read/Retrieve - get
//Update - put
//Delete - delete

//put hardcoded data in the backend/database
//have the frontend fetch + display the data
