import express from "express";
import * as User from "../models/user.js"

const staffLoginController = express.Router(); 

staffLoginController.get("/staff_login", (request, response) => {
    response.render("../views/staff_login.ejs"); 
}); 


staffLoginController.post("/staff_login", (request, response) => {
    const login_username = request.body.login_username; 
    const login_password = request.body.login_password; 

    User.getByUsername(login_username)
        .then((user_account) => {
            console.dir(`USER_ACCOUNT`); 
            console.dir(user_account); 
            // probably unnecessary abstraction. may remove later
            User.verifyPassword(user_account, login_password) 
                .then((is_match_password) => {
                    if (!(user_account && is_match_password)) {
                        response.status(404).send('Login Failed! :('); 
                    } else {
                        request.session.user = {
                            user_id: user_account.user_id, 
                            user_role: user_account.user_role
                        }
                        response.redirect("/staff_admin"); 
                    }; 
                }); 
        }).catch((error) => {
            console.log(`Failed to get user ('${login_username}') | Error: ${error}`); 
            response.status(404).send('Login Failed! :('); 
        }); 
}); 

staffLoginController.post("/staff_logout", (request, response) => {
    request.session.destroy(); 
}); 

export default staffLoginController; 
