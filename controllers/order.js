import express from "express";
import * as Order from "../models/order.js"; 
import * as Customer from "../models/customer.js"; 

const ordersController = express.Router(); 

ordersController.post("/orders_list", (request, response) => {
    response.status(200).send("PASS"); 
}); 

ordersController.get("/orders_list", (request, response) => {
    response.render("orders_list.ejs", { orders }); 
}); 

ordersController.post("/order_confirmation", (request, response) => {
    const formBody = request.body; 
    const current_datetime = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "); 

    if (!(
        /^[A-Za-z\-]+$/.test(formBody.customer_firstname) &&   
        /^[A-Za-z\-]+$/.test(formBody.customer_lastname) &&    
        /^[0-9\-]+$/.test(formBody.customer_phone) &&    
        /^[0-9\-]+$/.test(formBody.customer_email) &&    
        /^\w+\@\w+\.\w+$/.test(formBody.customer_address) &&   
        /^[0-9]{4,4}$/.test(formBody.customer_postcode) &&  
        /^[A-Za-z]+$/.test(formBody.customer_state) &&   
        /^[A-Za-z]$/.test(formBody.customer_city)
    )) {
        response.send("invalid input in form"); 
    }

    Customer.create({
        firstname:        formBody.customer_firstname,  
        lastname:         formBody.customer_lastname,  
        customer_phone:   formBody.customer_phone,  
        customer_email:   formBody.customer_email,  
        customer_address: formBody.customer_address, 
        postcode:         formBody.customer_postcode, 
        state:            formBody.customer_state, 
        city:             formBody.customer_city

    }).then((new_created_customer) => {

        const new_order_obj = {
            order_date:  current_datetime, 
            customer_id: new_created_customer.insertId, 
            product_id:  formBody.product_id, 
            quantity:    formBody.quantity_ordered, 
            price_sold:  formBody.price_sold
        }; 

        Order.create(new_order_obj).catch(err => {
            console.log("err:", err); 
        }); 

        Order.createOrderDetail(new_order_obj).catch(err => {
            console.log("err:", err); 
        }); 
    }); 

}); 

export default ordersController; 
