import db_conn from "../database.js";

export function deleteById(customer_id) {
    return db_conn.query(`
        DELETE FROM customer     
            WHERE customer_id=?`, 
        [customer_id]
    ); 
}; 

export function create(customer_obj) {
    return db_conn.query(`
        INSERT INTO customer (
            firstname, 
            lastname, 
            customer_phone, 
            customer_email, 
            customer_address, 
            postcode, 
            city, 
            state 
        ) 
        VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?
            ); 
    `, [
            customer_obj.firstname, 
            customer_obj.lastname, 
            customer_obj.customer_phone, 
            customer_obj.customer_email, 
            customer_obj.customer_address, 
            customer_obj.postcode, 
            customer_obj.city, 
            customer_obj.state 
    ]).then(([query_results]) => query_results); 
}; 


export function getAll(order_by="") {
    let query = `SELECT * FROM customer`

    if (order_by == "customer_id (ASC)") {
        query += " ORDER BY customer_id ASC"
    } else if (order_by == "customer_id (ASC)") {
        query += " ORDER BY customer_id ASC"
    } else if (order_by == "customer_id (DESC)") {
        query += " ORDER BY customer_id DESC"
    } else if (order_by == "customer_address") {
        query += " ORDER BY customer_address"
    } else if (order_by == "postcode") {
        query += " ORDER BY postcode"
    } else if (order_by == "city") {
        query += " ORDER BY city"
    } else if (order_by == "state") {
        query += " ORDER BY state"
    }

    console.log(`query: ${query}`); 

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

    start_date_created = start_date_created ? start_date_created : "1950-01-01 00:00:00"; 
    end_date_created = end_date_created ? end_date_created :"3000-01-01 00:00:00"; 

    let query = `
        SELECT * FROM customer                       
            INNER JOIN orders on orders.customer_id = customer.customer_id
        WHERE
            (
                customer.firstname LIKE ? OR
                customer.lastname LIKE ? OR 
                customer.customer_phone LIKE ? OR
                customer.customer_email LIKE ? OR
                customer.customer_address LIKE ? OR
                customer.postcode LIKE ? OR
                customer.city LIKE ? OR
                customer.state LIKE ?
            ) AND ? <= orders.order_date AND orders.order_date <= ?`

    console.log(`HEEEEERE in DETAILED ALL GET OF PRODUCT`); 
    
    if (order_by == "customer_id (ASC)") {
        query += " ORDER BY customer.customer_id ASC"; 
    } else if (order_by == "customer_id (DESC)") {
        query += " ORDER BY customer.customer_id DESC"; 
    } else if (order_by == "customer_address (ASC)") {
        query += " ORDER BY customer.customer_address ASC"; 
    } else if (order_by == "customer_address (DESC)") {
        query += " ORDER BY customer.customer_address DESC"; 
    } else if (order_by == "postcode (ASC)") {
        query += " ORDER BY customer.postcode ASC"; 
    } else if (order_by == "postcode (DESC)") {
        query += " ORDER BY customer.postcode DESC"; 
    } else if (order_by == "city (ASC)") {
        query += " ORDER BY customer.city ASC"; 
    } else if (order_by == "city (DESC)") {
        query += " ORDER BY customer.city DESC"; 
    } else if (order_by == "state (ASK)") {
        query += " ORDER BY customer.state ASK"; 
    } else if (order_by == "state (DESC)") {
        query += " ORDER BY customer.state DESC"; 
    }

    console.log(`%%%%%%%`); 
    console.log(`query: ${query}`); 
    console.log(`order_by: ${order_by}`); 

    return db_conn.query(query, [
        `%${search_term}%`, 
        `%${search_term}%`, 
        `%${search_term}%`, 
        `%${search_term}%`, 
        `%${search_term}%`, 
        `%${search_term}%`, 
        `%${search_term}%`, 
        `%${search_term}%`, 
        start_date_created, 
        end_date_created
    ]).then(([query_results]) => {
        return query_results
    }); 
}; 

export function getById(customer_id) {
    return db_conn.query(`
        SELECT * FROM customer
            WHERE customer_id=?;`
        , [
            customer_id
        ]
    ) .then(([query_results]) => {
        return query_results
    }); 
}; 

export function updateCustomerDetailsById(
    customer_id, 
    new_customer_details
) {
    return db_conn.query(`
        UPDATE customer             
        SET                         
            firstname=?,   
            lastname=?,   
            customer_phone=?,   
            customer_email=?,   
            customer_address=?,   
            postcode=?,   
            city=?,   
            state=?  
        WHERE customer_id=?;        `, 
        [
            new_customer_details.firstname,  
            new_customer_details.lastname,  
            new_customer_details.customer_phone,  
            new_customer_details.customer_email,  
            new_customer_details.customer_address,  
            new_customer_details.postcode,  
            new_customer_details.city,  
            new_customer_details.state, 
            new_customer_details.customer_id
        ]
    ); 
}
