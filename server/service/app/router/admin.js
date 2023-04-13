"use strict";

const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const authentification = require("../midleware/authen");

const admin = require("express").Router();

admin.get("/products" ,productController.getProduct);
admin.delete("/products/:id",productController.destroyProduct);
admin.post("/products",productController.createProduct);
admin.put("/products/:id",productController.editProduct);
admin.get("/categories",categoryController.getCategory)
admin.post("/categories",categoryController.createCategory);
admin.delete("/categories/:id",categoryController.destroyCategory)
admin.put("/categories/:id",categoryController.updateCategory)


module.exports =admin;