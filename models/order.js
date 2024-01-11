import db_conn from "../database.js";

export function getAll(order_by="") {
    let query = `
        SELECT * FROM orders
    `

    if (order_by) {
        if (order_by == "order_date") {
            query += " ORDER BY order_date; "; 

        } else if (order_by == "order_delivery_date") {
            query += " ORDER BY order_delivery_date; "; 

        } else if (order_by == "customer_id") {
            query += " ORDER BY customer_id; "; 
        }
    }

    return db_conn.query(query)
        .then(([query_results]) => {
            return query_results
        }); 
}; 

export function createOrderDetail(order_detail_obj) {
    let query = `
        INSERT INTO order_detail (
            product_id, 
            quantity, 
            price_sold) 
        VALUES 
        (?, ?, ?)`

    return db_conn.query(
        query, 
        [
            order_detail_obj.product_id, 
            order_detail_obj.quantity, 
            order_detail_obj.price_sold
        ]); 
}; 

export function create(order_obj) {
    return createOrderDetail(order_obj).then(([created_order_detail]) => {

        console.log("created_order_detail:", created_order_detail); 
        
        return db_conn.query(`

            INSERT INTO orders (
                order_date, 
                customer_id, 
                order_detail_id
            ) 
            VALUES 
                (?, ?, ?); 

            `, [
                order_obj.order_date, 
                order_obj.customer_id, 
                created_order_detail.insertId
            ]); 
    }); 
}; 

export function updateOrderDetailsById(order_id, new_order_details) {
    return db_conn.query(`

        UPDATE orders             
        SET                         
            order_date=?,          
            order_delivery_date=?,           
            customer_id=?          
        WHERE order_id=?;`, 

        [
            new_order_details.order_date, 
            new_order_details.order_delivery_date, 
            new_order_details.customer_id, 
            new_order_details.order_id, 
        ]
    ); 
}; 

export function getById(order_id) {
    return db_conn.query(`

        SELECT * FROM orders
        WHERE order_id = ?;`, 

        [ order_id ]).then(([query_results]) => {
            return query_results
        }); 
}; 

// order_detail_id
// product_id     
// quantity       
// price_sold     

export function getDetailedBySearchTerm(
    search_term, 
    order_by="", 
    start_date_created, 
    end_date_created
) {

    start_date_created = start_date_created ? start_date_created : "1950-01-01 00:00:00"; 
    end_date_created = end_date_created ? end_date_created :"3000-01-01 00:00:00"; 

    console.log(`order_by: ${order_by}`); 

    let query = `

        SELECT * FROM orders                        
            INNER JOIN order_detail
            ON orders.order_detail_id = order_detail.order_detail_id
            INNER JOIN product
            ON order_detail.product_id = product.product_id

        WHERE CONCAT(
            orders.order_detail_id, 
            order_detail.product_id, 
            product.product_name, 
            product.product_model, 
            product.manufacturer
        ) LIKE ?

        AND ? <= order_date AND order_date <= ?`

    if (order_by) {
        if (order_by == "order_date (newest first)") {
            query += " ORDER BY orders.order_date DESC"; 

        } else if (order_by == "order_date (oldest first)") {
            query += " ORDER BY orders.order_date ASC"; 

        } else if (order_by == "order_delivery_date (newest first)") {
            query += " ORDER BY orders.order_delivery_date ASC"; 

        } else if (order_by == "order_delivery_date (oldest first)") {
            query += " ORDER BY orders.order_delivery_date DESC"; 
        }
    }

    console.log(`
        --------------
        order_by: ${order_by}
        --------------
        query: ${query}
        --------------
        `); 

    console.dir(search_term); 
    console.dir(start_date_created); 
    console.dir(end_date_created); 
    console.dir(order_by); 

    return db_conn.query(query, [
        `%${search_term}%`, 
        start_date_created, 
        end_date_created, 
        order_by
    ]).then(([query_results]) => {
        return query_results
    }); 
};  

export function getDetailedById(order_id) {
    return db_conn.query(`

        SELECT * FROM orders
            INNER JOIN order_detail

        ON orders.order_id = order_detail.order_detail_id
        WHERE order.orders_id = ?`, 

        [ order_id ]).then(([query_results]) => {

            return query_results

    }); 
}; 


export function getAllDetailed(order_by="order_date (oldest first)") {
    console.log(`order_by: ${order_by}`); 
    let query = `
        SELECT * FROM orders
            INNER JOIN order_detail

            ON orders.order_detail_id = order_detail.order_detail_id
    `

    if (order_by) {
        if (order_by == "order_date (newest first)") {
            query += " ORDER BY order_date DESC;"; 
        } else if (order_by == "order_date (oldest first)") {
            query += " ORDER BY order_date ASC;"; 
        } else if (order_by == "order_delivery_date (newest first)") {
            query += " ORDER BY order_delivery_date DESC; "; 
        } else if (order_by == "order_delivery_date (oldest first)") {
            query += " ORDER BY order_delivery_date ASC; "; 
        } else if (order_by == "customer_id") {
            query += " ORDER BY customer_id; "; 
        }
    }

    return db_conn.query(query, 
        [
            order_by
        ]).then(([query_results]) => {
            console.log(`query_results.length: ${query_results.length}`); 
            return query_results
        }); 
}; 
