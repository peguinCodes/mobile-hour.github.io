import db_conn from "../database.js";

export function getAll() {
    return db_conn.query("SELECT * FROM changelog").then(
    ([query_results]) => {
        return query_results; 
    }); 
}; 

export function getAllDetailed(order_by="changelog-date-created-desc") {
    let query = `
        SELECT 
            product.product_name, 
            product.product_model, 
            created_user.username AS created_username, 
            created_by_user.username AS created_by_username, 
            changelog.changelog_id, 
            changelog.product_id, 
            changelog.date_created, 
            changelog.date_last_modified, 
            changelog.change_made_by_user_id, 
            changelog.change_action
        FROM changelog 
            LEFT JOIN product ON changelog.product_id = product.product_id
            LEFT JOIN user AS created_user ON changelog.user_id = created_user.user_id
            LEFT JOIN user AS created_by_user ON changelog.change_made_by_user_id = created_by_user.user_id
        `

    if (order_by == "date_change_made (newest first)") {
        query += "ORDER BY changelog.date_created DESC"; 
    } else if (order_by == "date_change_made (oldest first)") {
        query += "ORDER BY changelog.date_created ASC"; 

    }

    return db_conn.query(query, [order_by]).then(
    ([query_results]) => {
        console.log(`query_results.length: ${query_results.length}`); 
        return query_results; 
    }); 
}; 

export function getAllDetailedBySearchTerm(
    search_term, 
    start_date_created, 
    end_date_created, 
    order_by="", 
) {

    start_date_created = start_date_created ? start_date_created : "1950-01-01 00:00:00"; 
    end_date_created = end_date_created ? end_date_created :"3000-01-01 00:00:00"; 

    console.log(`search_term: ${search_term}`); 
    console.log(`start_date_created: ${start_date_created}`); 
    console.log(`end_date_created: ${end_date_created}`); 


    let query = `
        SELECT 
            product.product_name, 
            product.product_model, 
            created_user.username AS created_username, 
            created_by_user.username AS created_by_username, 
            changelog.changelog_id, 
            changelog.product_id, 
            changelog.date_created, 
            changelog.date_last_modified, 
            changelog.change_made_by_user_id, 
            changelog.change_action
        FROM changelog 
            LEFT JOIN product ON changelog.product_id = product.product_id
            LEFT JOIN user AS created_user ON changelog.user_id = created_user.user_id
            LEFT JOIN user AS created_by_user ON changelog.change_made_by_user_id = created_by_user.user_id
        WHERE
            (
                product.product_name LIKE ? OR
                product.product_model LIKE ? OR
                created_user.username LIKE ? OR 
                created_by_user.username LIKE ?
            ) AND ? <= date_created AND date_created <= ?
        `

    if (order_by == "date_change_made (newest first)") {
        query += "ORDER BY changelog.date_created DESC"; 
    } else if (order_by == "date_change_made (oldest first)") {
        query += "ORDER BY changelog.date_created ASC"; 
    }

    console.log(`start_date_created: ${start_date_created}`); 
    console.log(`end_date_created: ${end_date_created}`); 

    return db_conn.query(query, [
        `%${search_term}%`, 
        `%${search_term}%`, 
        `%${search_term}%`, 
        `%${search_term}%`, 
        start_date_created, 
        end_date_created
    ]).then(([query_results]) => {
        // console.dir("QUERY"); 
        // console.dir(query); 
        console.dir(`----------------------------`); 
        console.dir(`----------------------------`); 
        console.dir(`QUERY RESULTS LENGTH`); 
        console.dir(query_results.length); 
        console.dir(`----------------------------`); 
        console.dir(`----------------------------`); 
        return query_results; 
    }); 
}; 

export function create(change_obj) {
    return db_conn.query(`
        INSERT INTO changelog (
            date_created, 
            date_last_modified, 
            user_id, 
            product_id, 
            change_made_by_user_id, 
            change_action
        ) 
        VALUES 
        (?, ?, ?, ?, ?, ?)
    `, [
        change_obj.date_created, 
        change_obj.date_last_modified, 
        change_obj.user_id, 
        change_obj.product_id, 
        change_obj.change_made_by_user_id, 
        change_obj.change_action
    ]).then(
    ([query_results]) => {
        return query_results; 
    }); 
}; 
