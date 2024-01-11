import express from "express";
import session from "express-session";

import productController from "./controllers/product.js";
import customerController from "./controllers/customer.js";
import userController from "./controllers/user.js";
import staffLoginController from "./controllers/staff_login.js";
import staffAdminController from "./controllers/staff_admin.js"
import ordersController from "./controllers/order.js";

const app = express(); 
const port = 8090; 
app.use(express.urlencoded({ extended: true }));

// sessions [!] Place before controllers, otherwise they can't use it. 
app.use(
    session({
        secret: "secret phrase", 
        resave: false, 
        saveUninitialized: false, 
        cookie: { secure: false }
    }) 
); 

app.use(express.json()); 

// why does this route only work if it's aove the static middleware line ? 
// when UNDERNEATH the static middleware line it loads a blank page with none of the ejs. 
app.get("/", (request, response) => {
    response.render("staff_login.ejs"); 
}); 

app.get("/debug_view", (request, response) => {
    response.render("debug_view.ejs"); 
})

// static
app.use(express.static("static")); 

// view engine
app.set("view engine", "ejs"); 

// controllers
app.use(userController); 
app.use(productController); 
app.use(customerController);
app.use(staffLoginController); 
app.use(staffAdminController); 
app.use(ordersController); 

// start server - listen for connections
app.listen(port, "localhost", () => console.log("listening on port:", port)); 
