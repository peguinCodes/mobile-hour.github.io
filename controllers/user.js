import express from "express";
import * as User from "../models/user.js"

const userController = express.Router(); 

// Update user ROUTE
userController.post("/edit_user", (request, response) => {
    const formBody = request.body; 
    User.updateUserDetails(
        formBody.firstname, 
        formBody.lastname, 
        formBody.user_role, 
        formBody.username, 
        formBody.user_password, 
        formBody.user_id
    )
    response.status(200).send("UPDATED USER BY ID!"); 
}); 

export default userController; 
