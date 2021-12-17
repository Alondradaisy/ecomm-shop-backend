const express = require("express");
const ProductService = require("./services/ProductServices");
const UserService = require("./services/userService");
const UserController = require("./controller/UserController");
//const PermissionsService = require("./services/PermissionsService");

console.log("ProductService: ", ProductService);

const router = express.Router();

// Product route(s)
router.get("/product-data", ProductService.fetchAllProducts);

// inserting products.
router.post("/upload-product", ProductService.uploadProduct);

// User routes \\

router.post("/register-user", UserService.registerUser);

router.post("/login", UserService.login);

router.get("/logout", UserService.logout);

module.exports = router;

// --- CRUD requests --- \\
//Create - post
//Read/Retrieve - get
//Update - put
//Delete - delete

//put hardcoded data in the backend/database
//have the frontend fetch + display the data
