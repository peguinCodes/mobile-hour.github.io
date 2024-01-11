import express from "express";
import * as Product from "../models/product.js"


const checkoutController = express.Router(); 

checkoutController.get("/product_checkout", (request, response) => {
    Product.getDetailedById(request.query.product_id).then((product) => {
        response.render("../views/product_details", {product}); 
    })
}); 

export default checkoutController; 
