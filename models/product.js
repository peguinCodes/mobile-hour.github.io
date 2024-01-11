import {compareSync} from "bcrypt";
import db_conn from "../database.js";

export function createProduct(product) {
    return db_conn.query(`
        INSERT INTO product        
            (
             product_name,         
             product_model,               
             manufacturer,                        
             price,                         
             stock_on_hand, 
             feature_id
            )             
        VALUES                    
            (?, ?, ?, ?, ?, ?);`, 
        [
            product.name, 
            product.model, 
            product.manufacturer, 
            product.price, 
            product.stock, 
            product.feature_id
        ]
    ); 
}; 

export function createFeature(feature) {
    console.log(`@--createFeature function`); 
    console.log(`feature: ${JSON.stringify(feature, null, 2)}`); 
    console.log(`
         ${feature.weight}, 
         ${feature.dimensions}, 
         ${feature.os}, 
         ${feature.screensize}, 
         ${feature.resolution}, 
         ${feature.cpu}, 
         ${feature.ram}, 
         ${feature.storage}, 
         ${feature.battery}, 
         ${feature.front_camera}
        \n`); 
    return db_conn.query(`
        INSERT INTO feature        
            (
             weight, 
             dimensions, 
             os, 
             screensize, 
             resolution, 
             cpu, 
             ram, 
             storage, 
             battery, 
             front_camera  
            )             
        VALUES                    
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
        [
         feature.weight, 
         feature.dimensions, 
         feature.os, 
         feature.screensize, 
         feature.resolution, 
         feature.cpu, 
         feature.ram, 
         feature.storage, 
         feature.battery, 
         feature.front_camera  
        ]
    ); 
}; 

export function create(product) {
    console.log(`@--create function`); 
    console.log(`product: ${JSON.stringify(product, null, 2)}`); 
    console.log(`
         ${product.weight}, 
         ${product.dimensions}, 
         ${product.os}, 
         ${product.screensize}, 
         ${product.resolution}, 
         ${product.cpu}, 
         ${product.ram}, 
         ${product.storage}, 
         ${product.battery}, 
         ${product.front_camera}
        \n`); 
    return createFeature({
        weight:       product.weight, 
        dimensions:   product.dimensions, 
        os:           product.os, 
        screensize:   product.screensize, 
        resolution:   product.resolution, 
        cpu:          product.cpu, 
        ram:          product.ram, 
        storage:      product.storage, 
        battery:      product.battery, 
        front_camera: product.front_camera  
    }).then(([returned_feature]) => {
        return createProduct({
            name:         product.name, 
            model:        product.model, 
            manufacturer: product.manufacturer, 
            price:        product.price, 
            stock:        product.stock, 
            feature_id:   returned_feature.insertId
        }); 
    }); 
}; 

export function deleteById(product_id) {
    return db_conn.query(`
        DELETE FROM product     
            WHERE product_id=?`, 
        [product_id]
    ); 
}; 

export function getAllDetailed(order_by = "") {
    let query = `
        SELECT * FROM product                       
        INNER JOIN feature                           
        ON product.feature_id = feature.feature_id`

    console.log(`HEEEEERE in DETAILED ALL GET OF PRODUCT`); 

    console.log(`order_by: ${order_by}`); 

    if (order_by == "product_id (ASC)") {
        query += " ORDER BY product_id ASC"; 

    } else if (order_by == "product_id (DESC)") {
        query += " ORDER BY product_id DESC"; 

    } else if (order_by == "product_name (ASC)") {
        query += " ORDER BY product_name ASC"; 

    } else if (order_by == "product_name (DESC)") {
        query += " ORDER BY product_name DESC"; 

    } else if (order_by == "product_model (ASC)") {
        query += " ORDER BY product_model ASC"; 

    } else if (order_by == "product_model (DESC)") {
        query += " ORDER BY product_model DESC"; 

    } else if (order_by == "product_manufacturer (ASC)") {
        query += " ORDER BY manufacturer ASC"; 

    } else if (order_by == "product_manufacturer (DESC)") {
        query += " ORDER BY manufacturer DESC"; 

    } else if (order_by == "product_stock (ASC)") {
        query += " ORDER BY stock_on_hand ASC"; 

    } else if (order_by == "product_stock (DESC)") {
        query += " ORDER BY stock_on_hand DESC"; 

    } else if (order_by == "product_price (ASC)") {
        query += " ORDER BY price ASC"; 

    } else if (order_by == "product_price (DESC)") {
        query += " ORDER BY price DESC"; 
    }

    console.log(`%%%%%%%`); 
    console.log(`query: ${query}`); 
    console.log(`order_by: ${order_by}`); 

    return db_conn.query(query).then(([query_results]) => {
        return query_results
    }); 
}; 

export function getAllDetailedBySearchTerm(
    search_term, 
    start_date_created, 
    end_date_created, 
    order_by=""
) {

    start_date_created = start_date_created.length > 0 ? start_date_created : "1950-01-01 00:00:00"
    end_date_created = end_date_created.length > 0 ? end_date_created : "3000-01-01 00:00:00"

    let query = `
        SELECT * FROM product                       
            INNER JOIN feature ON product.feature_id = feature.feature_id
            INNER JOIN changelog ON product.product_id = changelog.product_id
        
        WHERE
            (
                product.product_name LIKE ? OR
                product.product_model LIKE ?
            ) AND ? <= date_created AND date_created <= ?`

    if (order_by == "product_id (ASC)") {
        query += " ORDER BY product.product_id ASC"; 

    } else if (order_by == "product_id (DESC)") {
        query += " ORDER BY product.product_id DESC"; 

    } else if (order_by == "product_name (ASC)") {
        query += " ORDER BY product_name ASC"; 

    } else if (order_by == "product_name (DESC)") {
        query += " ORDER BY product_name DESC"; 

    } else if (order_by == "product_model (ASC)") {
        query += " ORDER BY product_model ASC"; 

    } else if (order_by == "product_model (DESC)") {
        query += " ORDER BY product_model DESC"; 

    } else if (order_by == "product_manufacturer (ASC)") {
        query += " ORDER BY manufacturer ASC"; 

    } else if (order_by == "product_manufacturer (DESC)") {
        query += " ORDER BY manufacturer DESC"; 

    } else if (order_by == "product_stock (ASC)") {
        query += " ORDER BY stock_on_hand ASC"; 

    } else if (order_by == "product_stock (DESC)") {
        query += " ORDER BY stock_on_hand DESC"; 

    } else if (order_by == "product_price (ASC)") {
        query += " ORDER BY price ASC"; 

    } else if (order_by == "product_price (DESC)") {
        query += " ORDER BY price DESC"; 
    }

    return db_conn.query(query, [
        `%${search_term}%`, 
        `%${search_term}%`, 
        start_date_created, 
        end_date_created
    ]).then(([query_results]) => {
        return query_results
    }); 
}; 

export function getAll() {
    return db_conn.query(
        `SELECT * FROM product`
    ).then(([query_results]) => {
        return query_results
    }); 
}; 


export function getById(product_id) {
    return db_conn.query(`
        SELECT * FROM product                     
        INNER JOIN feature                        
        ON product.feature_id = feature.feature_id
        WHERE product.product_id = ?`, 
        [product_id])
        .then(([query_results]) => {
            if (query_results.length > 0) {
                return query_results[0]
            } else {
                return query_results; 
            }
        }); 
}; 

export function getDetailedById(product_id) {
    return db_conn.query(`
        SELECT * FROM product
            INNER JOIN feature
            ON product.feature_id = feature.feature_id
        WHERE product.product_id = ?; 
        `, [product_id]).then(([query_results]) => {
            if (query_results.length > 0) {
                return query_results[0]
            } else {
                return query_results; 
            }
        }); 
}; 


export function getBySearchTerm(search_term) {
    return db_conn.query(
        "SELECT * FROM product                      " + 
        "INNER JOIN feature                         " + 
        "ON product.feature_id = feature.feature_id " + 
        "WHERE CONCAT(product_name,                 " + 
        "             product_model,                " + 
        "             OS,                           " +  
        "             cpu,                          " +  
        "             ram,                          " +  
        "             storage,                      " +  
        "             manufacturer)                 " +  
        "LIKE ?;                                    ",  
        [`%${search_term}%`]
    ).then(([query_results]) => {
            return query_results
        }); 
};  

export function getBySearchForFeature(search_term) {
    return db_conn.query(
        "SELECT * FROM product                      " + 
        "INNER JOIN feature                         " +
        "ON product.feature_id = feature.feature_id " + 
        "WHERE CONCAT(product.product_name,         " + 
        "             product.product_model,        " + 
        "             product.manufacturer,         " + 
        "             feature.OS,                   " + 
        "             feature.cpu)                  " +  
        "LIKE ?;                                    ",  
        [`%${search_term}%`]
    ).then(([query_results]) => {
            return query_results
        }); 
  
};  

export function getFeatureByProductID(product_id) {
    return db_conn.query(
        "SELECT * FROM product                      " + 
        "INNER JOIN feature                         " +
        "ON product.feature_id = feature.feature_id " + 
        "WHERE product_id = ?                       ", 
        [product_id]
    ).then(([query_results]) => {
        return query_results
    }); 
}; 

export function updateDetailsById(product_id, new_product_details) {
    console.log("new_product_details:", new_product_details); 
    console.log(`
    new_product_details.product_name, 
    new_product_details.product_model, 
    new_product_details.product_manufacturer, 
    new_product_details.product_price, 
    new_product_details.product_stock_on_hand, 
    product_id, 
    ${new_product_details.product_name}, 
    ${new_product_details.product_model}, 
    ${new_product_details.product_manufacturer} 
    ${new_product_details.product_price} 
    ${new_product_details.product_stock_on_hand} 
    `); 
        return db_conn.query(`
        UPDATE feature
        SET
            weight=?, 
            dimensions=?, 
            OS=?, 
            screensize=?, 
            resolution=?, 
            cpu=?, 
            ram=?, 
            storage=?, 
            battery=?, 
            front_camera=?

        WHERE feature_id=?;
        `, 
        [
            new_product_details.weight, 
            new_product_details.dimensions, 
            new_product_details.OS, 
            new_product_details.screensize, 
            new_product_details.resolution, 
            new_product_details.cpu, 
            new_product_details.ram, 
            new_product_details.storage, 
            new_product_details.battery, 
            new_product_details.front_camera, 
            new_product_details.feature_id
        ]
    ).then(() => {
    return db_conn.query(`
        UPDATE product             
        SET 
            product_name=?,        
            product_model=?,         
            manufacturer=?,        
            price=?,         
            stock_on_hand=?

        WHERE product_id=?;
        `, 
        [
            new_product_details.product_name, 
            new_product_details.product_model, 
            new_product_details.manufacturer, 
            new_product_details.price, 
            new_product_details.stock_on_hand, 
            product_id, 
        ]); 
    }); 
}; 
