import {query} from "express";
import db_conn from "../database.js";
import bcrypt from "bcrypt"; 
const salt_rounds = 10;
// set User password
export function setPassword(user_obj, password_to_hash) {
    bcrypt.hash( password_to_hash, salt_rounds, (err, hashed_password) => {
        user_obj.user_password = hashed_password; 
        updateUserDetailsById(user_obj.user_id, user_obj);        
    }); 
}; 

// verify Staff password
export function verifyPassword(user, password_guess) {
    console.log(`password_guess: ${password_guess}`); 
    console.dir(user)
    console.log(`user.user_password: ${user.user_password}`); 
    return bcrypt.compare(password_guess, user.user_password);
}; 

// USER [CREATE] FUNCTIONS
export function create(user) {
    console.log(`HERE IN CREATE USER FUNCTION`); 
    return db_conn.query(`
        INSERT INTO user        
            (firstname,         
             lastname,               
             user_role,                        
             username,                         
             user_password)             
        VALUES                    
            (?, ?, ?, ?, ?);`, 
        [user.firstname, 
            user.lastname, 
            user.user_role, 
            user.username, 
            user.user_password]
    ); 
}; 


// USER [READ] FUNCTIONS
export function getAll() {
    let query = `
        SELECT * FROM user WHERE is_deleted!='0'; 
    `
    return db_conn.query(query).then(([query_results]) => {
        return query_results; 
    }); 
}; 

export function getByUsername(username) {
    return db_conn.query(`
        SELECT * FROM user      
        WHERE username=?;`, 
        [username]).then(([query_results]) => {
            if (query_results.length > 0) {
                return query_results[0]
            } else {
                Promise.reject("no matches for username"); 
            }
        }); 
}; 

export function getDetailedBySearchTerm(
    search_term, 
    start_date_created, 
    end_date_created, 
    order_by="", 
) {

    start_date_created = start_date_created ? start_date_created : "1950-01-01 00:00:00"; 
    end_date_created = end_date_created ? end_date_created :"3000-01-01 00:00:00"; 

    console.dir(search_term); 
    console.dir(start_date_created); 
    console.dir(end_date_created); 
    console.dir(order_by); 

    let query = `

    SELECT * FROM user                        
        INNER JOIN changelog

        ON user.user_id = changelog.user_id
    WHERE 
        CONCAT(user.firstname,                   
            user.lastname,                  
            user.user_role,                              
            user.username) LIKE ? 
        AND ? <= date_created AND date_created <= ?
        AND user.is_deleted!='1'`

    console.log(`
        --------------
        order_by: ${order_by}
        --------------
        query: ${query}
        --------------
        `); 

    if (order_by) {
        if (order_by == "date_created (newest first)") {
            query += " ORDER BY changelog.date_created DESC"; 

        } else if (order_by == "date_created (oldest first)") {
            query += " ORDER BY changelog.date_created ASC"; 

        } else if (order_by == "date_last_modified (newest first)") {
            query += " ORDER BY changelog.date_last_modified ASC"; 

        } else if (order_by == "date_last_modified (oldest first)") {
            query += " ORDER BY changelog.date_last_modified DESC"; 
        }
    }
    return db_conn.query(
        query, 
        [`%${search_term}%`, start_date_created, end_date_created]
    ).then(([query_results]) => {
        return query_results
    }); 
};  

export function getBySearchTerm(search_term) {
    return db_conn.query(`
        SELECT * FROM user                        
        WHERE CONCAT(firstname,                   
                     lastname,                  
                     user_role,                              
                     username)
        LIKE ? AND is_deleted != '1'`,  
        [`%${search_term}%`]
    ).then(([query_results]) => {
            return query_results
        }); 
};  

export function getById(user_id) {
    console.log(`user_id: ${user_id}`); 
    return db_conn.query(`
        SELECT * FROM user     
            WHERE user_id=?
        AND user_id!='1' 
        `, 
        [user_id]) .then(([query_results]) => {
            if (query_results.length > 0) {
                return query_results[0]; 
            } else {
                return query_results; 
            }
        }); 
}; 

export function getAllUserChangelog(order_by="") {
    let query = `
        SELECT * FROM user
            INNER JOIN changelog
                
            ON user.user_id = changelog.user_id
        WHERE user.is_deleted != '1'
    `

    if (order_by) {
        if (order_by == "date_created (newest first)") {
            query += " ORDER BY changelog.date_created DESC"; 

        } else if (order_by == "date_created (oldest first)") {
            query += " ORDER BY changelog.date_created ASC"; 

        } else if (order_by == "date_last_modified (newest first)") {
            query += " ORDER BY changelog.date_last_modified ASC"; 

        } else if (order_by == "date_last_modified (oldest first)") {
            query += " ORDER BY changelog.date_last_modified DESC"; 

        } else {
            query += " ORDER BY ORDER BY changelog.date_created DESC"
        }
    }
    console.log("-----QUERY----")
    console.log(query); 
    console.log(`order_by: ${order_by}`); 
    return db_conn.query(query).then(([query_results]) => {
            return query_results
        }); 
}; 

export function getUserChangelogByUserId(user_id) {
    return db_conn.query(`
        SELECT * FROM user
        INNER JOIN changelog

        ON user.user_id = changelog.user_id
        WHERE user.user_id = ? AND user.is_deleted != '1'`, 
        [user_id]).then(([query_results]) => {
            if (query_results.length > 0) {
                return query_results[0]; 
            } else {
                return query_results; 
            }
        }); 
}; 

// USER [UPDATE] FUNCTIONS
export function updateUserDetailsById(user_id, new_user_details) {
    return db_conn.query(`
        UPDATE user             
        SET                       
            firstname=?,        
            lastname=?,         
            user_role=?,        
            username=?,         
            user_password=?     
        WHERE user_id=? AND is_deleted != '1' `, 
        [
            new_user_details.firstname, 
            new_user_details.lastname, 
            new_user_details.user_role, 
            new_user_details.username, 
            new_user_details.user_password, 
            user_id
        ]
    ); 
}; 

// USER [DELETE] FUNCTIONS
export function deleteById(user_id) {
    return db_conn.query(`
        UPDATE user
            SET is_deleted = '1'
            WHERE user_id = ?`, 
        [user_id]
    ); 
}; 


// db_conn.query(`
//     SELECT * FROM user
// `).then(([query_results]) => {
//     for (const user of query_results) {
//         console.log(`user: ${user}`); 
//         if (!(user.user_password.startsWith("$2"))) {
//             setPassword(user, user.user_password); 
//         }
//     }
// }); 

// db_conn.query(`
//     UPDATE user
//     SET user_password='easy' WHERE true; 
// `); 
