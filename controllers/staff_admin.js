import express, {query, response} from "express";
import bcrypt from "bcrypt"; 
import { stringify as queryStringStringify } from "querystring"; 
import * as User from "../models/user.js"; 
import * as Product from "../models/product.js"; 
import * as ChangeLog from "../models/changelog.js"; 
import * as Order from "../models/order.js"; 
import * as Customer from "../models/customer.js"; 
import access_control from "../access_control.js";
import userController from "./user.js";

const salt_rounds = 10;
const staffAdminController = express.Router(); 

function currentDateInSQLFormat() {
    return new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');  
}

function dateToSQLformat(date_arg) {
    return new Date(date_arg)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "); 
}

// ==========
// GET ROUTES 
// ==========

staffAdminController.get("/staff_admin", 
    access_control(["admin", "manager", "sales"]), 
    (request, response) => {

        const query = request.query;
        const tab = !query.tab ? "staff" : request.query.tab; 
        const action = !query.action ? null : request.query.action;
        const sort_key = !query.sort_by ? null: request.query.sort_by; 
        const edit_id = !query.edit_id ? null: request.query.edit_id; 
        const search_term = !query.search_term ? null: request.query.search_term; 
        const start_date_created = !query.start_date_created ? "" : dateToSQLformat(query.start_date_created); 
        const end_date_created = !query.end_date_created ? "" : dateToSQLformat(query.end_date_created); 

        console.dir(`request.session`); 
        console.dir(request.session); 

        // initial renger_args for all tabs
        let render_args = {
            tab, 
            tab_data: { all_entries: null, edit_entry: null }, 
            user_role: request.session.user.user_role, 
            action, 
            sort_key, 
            sort_keys: [], 
            search_keys: [], 
            search_key: "", 
            start_date_created: start_date_created.split(" ")[0], // convert date time string to just date string
            end_date_created: end_date_created.split(" ")[0] // conver date time string to just date string
        }

        if (tab == "staff") {

            render_args.search_keys = [
                "name", 
                "username", 
                "role", 
                "id"
            ]
            render_args.sort_keys = [
                "date_created (newest first)", 
                "date_created (oldest first)"
            ]
            render_args.sort_key = sort_key ? sort_key : "date_created (newest first)"; 

            if (search_term) {
                const start_date_created = dateToSQLformat(start_date_created); 
                const end_date_created = dateToSQLformat(end_date_created); 

                User.getDetailedBySearchTerm(
                    search_term, 
                    start_date_created, 
                    end_date_created, 
                    render_args.sort_key
                ).then((all_staff) => {

                    render_args.tab_data.all_entries = all_staff; 

                    if (!edit_id) {
                        response.render("../views/staff_admin_temp", render_args); 
                    } else {
                        User.getById(edit_id).then((edit_staff) => {
                            render_args.tab_data.edit_entry = edit_staff; 
                            response.render("../views/staff_admin_temp", render_args); 
                        }); 
                    }
                }).catch(err => {
                    console.log(`err: ${err}`); 
                }); 

            } else { // if staff tab with no search term
                User.getAllUserChangelog(render_args.sort_key).then((all_staff) => {

                    render_args.tab_data.all_entries = all_staff; 
                    render_args.sort_keys = [
                        "date_created (newest first)", 
                        "date_created (oldest first)"
                    ]

                    if (!edit_id) {
                        response.render("../views/staff_admin_temp", render_args); 
                    } else {
                        User.getById(edit_id).then((edit_staff) => {
                            render_args.tab_data.edit_entry = edit_staff; 
                            response.render("../views/staff_admin_temp", render_args); 
                        }); 
                    }
                }).catch(err => {
                    console.log(`err: ${err}`); 
                }); 
            }


        } else if (tab == "orders") {

            render_args.sort_keys = [
                "order_date (newest first)", 
                "order_date (oldest first)", 
                "order_delivery_date (newest first)", 
                "order_delivery_date (oldest first)"
            ]
            render_args.search_keys = [
                "order_date (newest first)", 
                "order_date (oldest first)", 
                "order_delivery_date (newest first)", 
                "order_delivery_date (oldest first)"
            ]
            render_args.sort_key = sort_key ? sort_key : "order_date (newest first)"; 

            console.log(`render_args.sort_key: ${render_args.sort_key}`); 
            console.log(`sort_key: ${sort_key}`); 

            if (search_term) {

                Order.getDetailedBySearchTerm(
                    search_term, 
                    render_args.sort_key, 
                    start_date_created, 
                    end_date_created
                ).then((all_orders) => {

                    render_args.tab_data.all_entries = all_orders; 

                    if (!edit_id) {
                        response.render("../views/staff_admin_temp", render_args); 

                    } else {
                        User.getById(edit_id).then((edit_staff) => {
                            render_args.tab_data.edit_entry = edit_staff; 
                            response.render("../views/staff_admin_temp", render_args); 
                        }); 
                    }
                }).catch(err => {
                    console.log(`err: ${err}`); 
                }); 

            } else { // if orders tab with no search term

                Order.getAllDetailed(render_args.sort_key).then((all_orders) => {
                    render_args.tab_data.all_entries = all_orders; 

                    if (!edit_id) {
                        response.render("../views/staff_admin_temp.ejs", render_args); 
                    } else {
                        Order.getById(edit_id).then((edit_order) => {
                            render_args.tab_data.edit_entry = edit_order; 
                            response.render("../views/staff_admin_temp.ejs", render_args); 
                        }); 
                    }
                }); 
            }
        } else if (tab == "customers") {
            Customer.getAll().then((all_customers) => {

                render_args.tab_data.all_entries = all_customers; 
                render_args.sort_keys = [
                    "customer_id (ASC)", 
                    "customer_id (DESC)", 
                    "customer_address", 
                    "postcode", 
                    "city", 
                    "state"
                ]
                render_args.search_keys = [
                    "ID", 
                    "firstname", 
                    "lastname", 
                    "address", 
                    "postcode", 
                    "city", 
                    "state"
                ]

                if (!edit_id) {
                    response.render("../views/staff_admin_temp.ejs", render_args); 

                } else {
                    Customer.getById(edit_id).then((edit_customer) => {
                        render_args.tab_data.edit_entry = edit_customer; 
                        response.render("../views/staff_admin_temp.ejs", render_args); 
                    }).catch(err => {
                        console.log(`err: ${err}`); 
                    }); 
                }
            }); 
        } else if (tab == "products") {

            render_args.sort_keys = [
                "product_id (ASC)", 
                "product_id (DESC)", 
                "product_name (ASC)", 
                "product_name (DESC)", 
                "product_model (ASC)", 
                "product_model (DESC)", 
                "product_manufacturer (ASC)", 
                "product_manufacturer (DESC)", 
                "product_stock (ASC)", 
                "product_stock (DESC)"
            ]
            render_args.search_keys = [
                "id", 
                "name", 
                "model", 
                "manufacturer"
            ]
            render_args.sort_key = sort_key ? sort_key : "product_id (DESC)"; 

            Product.getAllDetailed(render_args.sort_key).then((all_products) => {

                render_args.tab_data.all_entries = all_products; 

                if (!edit_id) {
                    response.render("../views/staff_admin_temp.ejs", render_args); 

                } else {
                    Product.getById(edit_id).then((edit_product) => {
                        render_args.tab_data.edit_entry = edit_product; 
                        response.render("../views/staff_admin_temp.ejs", render_args); 
                    }); 
                }
            }); 
        } else if (tab == "changelog") {
            ChangeLog.getAllDetailed(sort_key).then((all_changes) => {

                render_args.tab_data.all_entries = all_changes; 
                render_args.sort_keys = [
                    "date_change_made (newest first)", 
                    "date_change_made (oldest first)"
                ]
                render_args.search_keys = [
                    "order_date (newest first)", 
                    "order_date (oldest first)", 
                    "order_delivery_date (newest first)", 
                    "order_delivery_date (oldest first)"
                ]

                if (!edit_id) {
                    response.render("../views/staff_admin_temp.ejs", render_args); 

                } else {
                    ChangeLog.getById(edit_id).then((edit_change) => {
                        render_args.tab_data.edit_entry = edit_change; 
                        response.render("../views/staff_admin_temp.ejs", render_args); 
                    }); 
                }
            }); 
        }
    }); 


// ============
// POST ROUTES
// ============

// Create Staff [POST]
userController.post("/create_staff", 
    access_control(["manager"]), 
    (request, response) => {

    User.create({
        firstname:     request.body.firstname, 
        lastname:      request.body.lastname, 
        user_role:     request.body.user_role, 
        username:      request.body.username, 
        user_password: request.body.user_password

    }).then(([returned_obj]) => {

        User.getById(returned_obj.insertId).then((new_created_user) => {

            ChangeLog.create({
                date_created:           currentDateInSQLFormat(), 
                date_last_modified:     null, 
                user_id:                new_created_user.user_id, 
                product_id:             null, 
                change_made_by_user_id: 1, // <-- placeholder
                change_action:          "created"

            }).then(() => {
                response.redirect("/staff_admin?tab=staff"); 
            }); 
        }); 
    }); 
}); 

userController.post("/create_product", 
    access_control(["admin", "manager"]), 
    (request, response) => {

    const formBody = request.body; 

    Product.create({
        name:         formBody.product_name, 
        model:        formBody.product_model, 
        manufacturer: formBody.product_manufacturer, 
        price:        formBody.product_price, 
        stock:        formBody.product_stock, 
        weight:       formBody.product_weight, 
        dimensions:   formBody.product_dimensions, 
        os:           formBody.product_os, 
        screensize:   formBody.product_screensize, 
        resolution:   formBody.product_resolution, 
        cpu:          formBody.product_cpu, 
        ram:          formBody.product_ram, 
        storage:      formBody.product_storage, 
        battery:      formBody.product_battery, 
        front_camera: formBody.product_front_camera 

    }).then(([returned_obj]) => {

        Product.getById(returned_obj.insertId).then((new_created_product) => {
            ChangeLog.create({
                date_created:              currentDateInSQLFormat(), 
                date_last_modified:        null, 
                product_id:                new_created_product.product_id, 
                user_id:                   null, 
                change_made_by_user_id:    1, // <-- placeholder
                change_action:             "created"
            }).then(() => {
                response.redirect("/staff_admin?tab=products"); 
            }); 
        }); 
    }); 
}); 


// SEARCH staff_admin [GET]
staffAdminController.get("/search_staff_admin", 
    access_control(["admin", "manager", "sales"]), 
    (request, response) => {

    console.log(`HERE IN SEARCH STAFF ADMIN`); 

    const query = request.query; 
    const tab = !("tab" in query) ? "staff" : query.tab; 
    const action = !("action" in query) ? null : query.action;
    const sort_key = !("sort_by" in query) ? null: query.sort_by; 
    const edit_id = !("edit_id" in query) ? null: query.edit_id; 
    const search_term = !("search_term" in query) ? null: query.search_term; 
    const start_date_created = query.start_date_created ? dateToSQLformat(query.start_date_created) : ""; 
    const end_date_created = query.end_date_created ? dateToSQLformat(query.end_date_created) : ""; 

    console.dir("|QUERY|"); 
    console.dir(query); 
    console.log(`tab: ${tab}`); 
    console.log(`action: ${action}`); 
    console.log(`sort_key: ${sort_key}`); 
    console.log(`edit_id: ${edit_id}`); 
    console.log(`search_term: ${search_term}`); 
    console.log(`start_date_created: ${start_date_created}`); 
    console.log(`end_date_created: ${end_date_created}`); 
    console.log(`query.start_date_created: ${query.start_date_created}`); 
    console.log(`query.end_date_created: ${query.end_date_created}`); 

    let render_args = {
        tab, 
        tab_data: { 
            all_entries: null, 
            edit_entry: null
        }, 
        user_role: request.session.user.user_role, 
        action, 
        sort_key, 
        sort_keys: [], 
        search_keys: [], 
        search_key: "date_created", 
        start_date_created: start_date_created.split(" ")[0], // convert date time string to just date string
        end_date_created: end_date_created.split(" ")[0] // conver date time string to just date string
    }

    if (tab == "staff") {

        render_args.sort_keys = [
            "date_created (newest first)", 
            "date_created (oldest first)"
        ]
        render_args.search_keys = [
            "name", 
            "username", 
            "role", 
            "id"
        ]
        render_args.sort_key = sort_key ? sort_key : "date_created (newest first)"; 

        User.getDetailedBySearchTerm(
            search_term, 
            start_date_created, 
            end_date_created, 
            sort_key
        ).then((all_staff) => {

            render_args.tab_data.all_entries = all_staff; 

            if (!edit_id) {
                response.render("../views/staff_admin_temp", render_args); 

            } else {
                User.getById(edit_id).then((edit_staff) => {
                    render_args.tab_data.edit_entry = edit_staff; 
                    response.render("../views/staff_admin_temp", render_args); 
                }); 
            }
        }).catch(err => {
                console.log(`err: ${err}`); 
            }); 

    } else if (tab == "orders") {

        render_args.sort_keys = [
            "order_date (newest first)", 
            "order_date (oldest first)", 
            "order_delivery_date (newest first)", 
            "order_delivery_date (oldest first)"
        ]
        render_args.search_keys = [
            "order_date (newest first)", 
            "order_date (oldest first)", 
            "order_delivery_date (newest first)", 
            "order_delivery_date (oldest first)"
        ]
        render_args.sort_key = sort_key ? sort_key : "date_created (newest first)"; 

        Order.getDetailedBySearchTerm(
            search_term, 
            render_args.sort_key, 
            start_date_created, 
            end_date_created
        ).then((all_staff) => {
            render_args.tab_data.all_entries = all_staff; 

            if (!edit_id) {
                response.render("../views/staff_admin_temp", render_args); 
            } else {
                User.getById(edit_id).then((edit_staff) => {
                    render_args.tab_data.edit_entry = edit_staff; 
                    response.render("../views/staff_admin_temp", render_args); 
                }); 
            }
        }).catch(err => {
            console.log(`err: ${err}`); 
        }); 

    } else if (tab == "changelog") {

        render_args.sort_keys = [
            "date_change_made (newest first)", 
            "date_change_made (oldest first)"
        ]
        render_args.search_keys = [
            "order_date (newest first)", 
            "order_date (oldest first)", 
            "order_delivery_date (newest first)", 
            "order_delivery_date (oldest first)"
        ]

        ChangeLog.getAllDetailedBySearchTerm(
            search_term, 
            start_date_created, 
            end_date_created, 
            render_args.sort_key
        ).then((all_changes) => {
            render_args.tab_data.all_entries = all_changes; 
            response.render("../views/staff_admin_temp", render_args); 
        }).catch(err => {
            console.log(`err: ${err}`); 
        }); 

    } else if (tab == "customers") {

        render_args.sort_keys = [
            "customer_id (ASC)", 
            "customer_id (DESC)", 
            "customer_address", 
            "postcode", 
            "city", 
            "state"
        ]
        render_args.search_keys = [
            "ID", 
            "firstname", 
            "lastname", 
            "address", 
            "postcode", 
            "city", 
            "state"
        ]
        render_args.sort_key = sort_key ? sort_key : "customer_id (DESC)"

        Customer.getAllDetailedBySearchTerm(
            search_term, 
            start_date_created, 
            end_date_created, 
            render_args.sort_key
        ).then((all_changes) => {
            render_args.tab_data.all_entries = all_changes; 
            response.render("../views/staff_admin_temp", render_args); 
        }).catch(err => {
            console.log(`err: ${err}`); 
        }); 
    } else if (tab == "products") {

        render_args.sort_keys = [
            "product_id (ASC)", 
            "product_id (DESC)", 
            "product_name (ASC)", 
            "product_name (DESC)", 
            "product_model (ASC)", 
            "product_model (DESC)", 
            "product_manufacturer (ASC)", 
            "product_manufacturer (DESC)", 
            "product_stock (ASC)", 
            "product_stock (DESC)"
        ]
        render_args.search_keys = [
            "ID", 
            "firstname", 
            "lastname", 
            "address", 
            "postcode", 
            "city", 
            "state"
        ]
        render_args.sort_key = sort_key ? sort_key : "product_id (DESC)"

        Product.getAllDetailedBySearchTerm(
            search_term, 
            start_date_created, 
            end_date_created, 
            render_args.sort_key
        ).then((all_products) => {
            render_args.tab_data.all_entries = all_products; 
            response.render("../views/staff_admin_temp", render_args); 
        })
    }
}); 


// SEARCH staff_admin [POST]
staffAdminController.post("/search_staff_admin", 
    access_control(["admin", "manager", "sales"]), 
    (request, response) => {
    console.log(`request.body`); 
    console.dir(request.body); 
    response.redirect("/search_staff_admin?" + queryStringStringify(request.body)); 
}); 


// CUD staff_admin [POST]
staffAdminController.post("/staff_admin", (request, response) => {

        const formBody = request.body; 

    // Staff CUD
    if (formBody.tab == "staff" && 
        formBody.action == "update") {

        User.getById(formBody.staff_id).then( (staff_obj) => {

            for (let key of Object.keys(staff_obj)) {
                staff_obj[key] = key in formBody ? formBody[key] : staff_obj[key]; 
            }

            User.updateUserDetailsById(formBody.staff_id, staff_obj).then(() => {
                response.redirect("/staff_admin?tab=staff"); 
            }); 
        }); 

    } else if (formBody.tab == "staff" && 
               formBody.action == "delete"){

        User.getById(formBody.staff_id).then( (staff_obj) => {

            User.deleteById(staff_obj.user_id).then(() => {
                response.redirect(`/staff_admin?tab=staff`); 
            }).catch(err => {
                console.log(`err: ${err}`); 
            }); 
        }).catch(err => {
            console.log(`err: ${err}`); 
        }); 

    // Products CUD
    } else if (formBody.tab == "products" && 
               formBody.action == "delete") {

        Product.deleteById(formBody.product_id).then(() => {
            ChangeLog.create({
                date_created:           currentDateInSQLFormat(), 
                date_last_modified:     null, 
                user_id:                null, 
                product_id:             formBody.product_id, 
                change_made_by_user_id: 1, // <-- placeholder
                change_action:          "deleted"
            }).then(() => {
                response.redirect("/staff_admin?tab=products"); 
            }); 
        }).catch(err => {
            console.log(`err: ${err}`); 
        })

    } else if (formBody.tab == "products" && 
               formBody.action == "update") {

        Product.getById(formBody.product_id).then((product_obj) => {

            for (let key of Object.keys(product_obj)) {
                product_obj[key] = key in formBody ? formBody[key] : product_obj[key]; 
            }
            Product.updateDetailsById(formBody.product_id, product_obj).then(() => {
                response.redirect("/staff_admin?tab=products"); 
            }); 
        }).catch((err) => {
            console.log(`err: ${err}`); 
        }); 
    }
});


// DEBUGGING TEST ROUTE
userController.post("/test_route", (request, response) => {
    const debug_string = `
    REQUEST BODY: "${JSON.stringify(request.body, null, 2)}"
    Object.entries(request.body).length: "${Object.entries(request.body).length}"
    `
    console.dir("REQUEST BODY"); 
    console.dir("------------"); 
    console.dir("|          |"); 
    console.dir(request.body); 
    console.dir("|          |"); 
    console.dir("------------"); 

    ChangeLog.getAllDetailedBySearchTerm(
        "", 
        "", 
        null, 
        null, 
        "date_change_made (newest first)"
    ).then((change_results) => {
        console.log(debug_string); 
        console.dir("CHANGE RESULTS"); 
        console.dir("------------"); 
        console.dir("|          |"); 
        console.dir(change_results); 
        console.dir("|          |"); 
        console.dir("------------"); 
        response.send(debug_string); 
    }); 

}); 


export default staffAdminController; 
