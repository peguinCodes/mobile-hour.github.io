import express from "express";
import * as Products from "../models/product.js"


const productController = express.Router(); 

productController.post("/product_list", (request, response) => {
    response.status(200).send("PASS"); 
}); 

productController.get("/product_list", 
    (request, response) => {
    Products.getAll().then((products) => {
        response.render("product_list.ejs", { products }); 
    }); 
}); 

function sort_as_num(arr, sort_key) {
    const sorted_arr = arr.sort(
        (a, b) => {
            if (parseFloat(a[sort_key]) < parseFloat(b[sort_key])) { 
                return -1; 
            } else if (parseFloat(a[sort_key]) > parseFloat(b[sort_key])) { 
                return 1; 
            } else { 
                return 0; 
            }; 
        }); 
    return sorted_arr; 
}

function sort_as_alpha(arr, sort_key) {
    const sorted_arr = arr.sort(
        (a, b) => {
            if (a[sort_key] < b[sort_key]) { 
                return -1; 
            } else if (a[sort_key] > b[sort_key]) { 
                return 1; 
            } else { 
                return 0; 
            }; 
        }); 
    return sorted_arr; 
}

productController.get("/view_products", (request, response) => {
    const sort_key = request.query.sort_by ? request.query.sort_by : "manufacturer"; 
    const search_term = request.query.search_term; 

    Products.getAllDetailed()
        .then((product_results) => {
            if (sort_key === "price") {
                product_results = sort_as_num(product_results, sort_key); 
            } else {
                product_results = sort_as_alpha(product_results, sort_key); 
            }; 
            console.log(`product_results[0]: ${product_results[0]}`); 
            console.dir(product_results[0]); 
            response.render("view_products.ejs", { product_results, sort_key, search_term }); 
        }); 
}); 

productController.get("/search_products", (request, response) => {
    const sort_key = request.query.sort_by ? request.query.sort_by : "manufacturer"; 
    const search_term = request.query.search_term; 

    Products.getBySearchTerm(search_term)
        .then((product_results) => {
            if (sort_key === "price") {
                product_results = sort_as_num(product_results, sort_key); 
            } else {
                product_results = sort_as_alpha(product_results, sort_key); 
            }; 
            response.render("view_products.ejs", 
                { 
                    product_results, 
                    sort_key, 
                    search_term 
                }); 
        }); 
}); 

productController.get("/product_details", (request, response) => {
    const product_id = request.query.product_id; 
    Products.getDetailedById(product_id).then((product) => {
        console.log("product:"); 
        console.dir(product); 
        response.render("product_details.ejs", 
            { product }
        ); 
    }); 
}); 

export default productController; 
