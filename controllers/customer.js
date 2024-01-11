import express from "express";
import * as Products from "../models/product.js"; 

const customerController = express.Router(); 

customerController.get("/checkout", (request, response) => {
    const product_id = request.query.product_id; 
    Products.getById(product_id).then((product) => {
        response.render("product_checkout.ejs", { product }); 
    }); 
}); 

export default customerController; 
