"use strict";

const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");

const customer = require("express").Router();

customer.get("/products" ,productController.getProduct);
customer.get("/products/:id" ,productController.detailProduct);
customer.get("/categories",categoryController.getCategory)
customer.get("/categories/:id",categoryController.jumlahCategory)



module.exports =customer;