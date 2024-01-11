-- SQL uSED ---

-- specify databasee to use; 
/*
mysqlsh --sql;
\connect root@localhost --password=MyNewPass5!
USE mobile_hour_db
SHOW tables; 
*/
;
ALTER TABLE mobile_hour_db.changelog ENGINE=InnoDB;

ALTER TABLE mobile_hour_db.changelog ENGINE=InnoDB; 
ALTER TABLE mobile_hour_db.customer ENGINE=InnoDB; 
ALTER TABLE mobile_hour_db.feature ENGINE=InnoDB; 
ALTER TABLE mobile_hour_db.order_detail ENGINE=InnoDB; 
ALTER TABLE mobile_hour_db.orders ENGINE=InnoDB; 
ALTER TABLE mobile_hour_db.product ENGINE=InnoDB; 
ALTER TABLE mobile_hour_db.user ENGINE=InnoDB; 

SELECT TABLE_NAME,
       ENGINE
FROM   information_schema.TABLES
WHERE  TABLE_SCHEMA = 'mobile_hour_db';

DROP TABLE orders_part2_fk_test;  

DELETE FROM customer WHERE customer_id > 218; 

-- SELECT ALL QUERIES
SELECT * FROM orders; 
SELECT * FROM order_detail; 
SELECT * FROM user; 
SELECT * FROM product; 
SELECT * FROM changelog; 
SELECT * FROM customer; 
SELECT * FROM feature; 

SELECT * FROM changelog WHERE date_created >= '2023-10-19 05:20:20' and date_created <= '2023-10-20 05:20:20'; 
SELECT * FROM changelog WHERE date_created >= '0' and date_created <= ''; 

SELECT * FROM user
    INNER JOIN changelog
        
    ON user.user_id = changelog.user_id
WHERE CONCAT(user.firstname,                   
             user.lastname,                  
             user.user_role,                              
             user.username)
LIKE '%%' AND date_created <= '2023-11-21 00:00:00' and date_created >= '2023-11-06 00:00:00'
ORDER BY ''; 

-- SELECT ALL QUERIES
SHOW INDEXES FROM orders; 
SHOW COLUMNS FROM orders; 
SHOW COLUMNS FROM order_detail; 
SHOW COLUMNS FROM user; 
SHOW COLUMNS FROM product; 
SHOW COLUMNS FROM changelog; 
SHOW COLUMNS FROM customer; 
SHOW COLUMNS FROM feature; 

SELECT * FROM  customer
    INNER JOIN orders on orders.customer_id = customer.customer_id; 

SELECT * FROM customer                       
    INNER JOIN orders on orders.customer_id = customer.customer_id; 
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

SELECT * FROM user; 

INSERT INTO user (user_id, firstname, lastname, user_role, username, user_password)
VALUES
    (1, "Shaun", "Rumints", "manager", "ShaunIsManager", "easy"); 

SELECT * FROM changelog; 

-- alter column changelog to include staff change made by
ALTER TABLE changelog
ADD COLUMN  change_made_by_user_id INT NOT NULL; 


-- alter column user_id to accept null
ALTER TABLE orders
ADD COLUMN  order_detail_id INT NOT NULL; 


ALTER TABLE orders
ADD FOREIGN KEY (order_detail_id) REFERENCES order_detail(order_detail_id);

ALTER TABLE orders
ADD CONSTRAINT fk_order_detail_id
FOREIGN KEY (order_detail_id) REFERENCES fk_order_detail_id(customer_id); 

ALTER TABLE `mobile_hour_db`.`orders`
ADD CONSTRAINT `fk_order_detail_id`
  FOREIGN KEY (`order_detail_id`)
  REFERENCES `mobile_hour_db`.`order_detail` (`order_detail_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE mobile_hour_db.orders
ADD CONSTRAINT order_detail_id
  FOREIGN KEY (order_detail_id)
  REFERENCES mobile_hour_db.order_detail(order_detail_id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `dummy_db`.`new_table` 
ADD CONSTRAINT `fk_new_table_2`
  FOREIGN KEY (`dummy_friend_id`)
  REFERENCES `dummy_db`.`dummy_friends` (`dummy_friend_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

SHOW TABLES; 

SELECT * FROM `mobile_hour_db`.`order_detail`; 

ALTER TABLE `mobile_hour_db`.`orders` 
ADD CONSTRAINT `fk_new_table_10`
  FOREIGN KEY (`order_detail_id`)
  REFERENCES `mobile_hour_db`.`order_detail` (`order_detail_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE orders_part2_fk_test (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (PersonID) REFERENCES customer(PersonID)
);

ALTER TABLE `orders` ADD FOREIGN KEY (order_detail_id) REFERENCES customer(customer_id);
ALTER TABLE `orders` ADD FOREIGN KEY (order_detail_id) REFERENCES mobile_hour_db.customer(customer_id);
ALTER TABLE `orders` ADD FOREIGN KEY (order_detail_id) REFERENCES mobile_hour_db.skljflksjdflk (sdjlfksdj); 
ALTER TABLE `orders` ADD FOREIGN KEY (order_detail_id) REFERENCES customer (sdjlfksdj); 

SELECT * from order_detail; 
SHOW COLUMNS FROM order_detail; 

-- ORDER JOINED QUERIES

-- order_order_details
SELECT * FROM orders
    INNER JOIN order_detail
ON orders.order_id = order_detail.order_detail_id; 

SELECT * FROM orders
    INNER JOIN order_detail
ON orders.order_id = order_detail.order_detail_id; 


-- alter column user_id to accept null
ALTER TABLE changelog
MODIFY COLUMN user_id INT NULL; 

-- alter column product_id to accept null
ALTER TABLE changelog
MODIFY COLUMN product_id INT NULL; 

-- alter column date_last_modified to accept null
ALTER TABLE changelog
MODIFY COLUMN date_last_modified DATETIME NULL; 

-- Insert User Changelog 
INSERT INTO changelog (date_created, date_last_modified, user_id, product_id, change_made_by_user_id) 
VALUES 
("2023-10-19 06:28:31", "2023-10-19 06:28:31", 84, null, 96); 

-- Insert Product Changelog 
INSERT INTO changelog (date_created, date_last_modified, user_id, product_id, change_made_by_user_id) 
VALUES 
("2023-10-19 06:28:31", "2023-10-19 06:28:31", 89, null, 96); 



-- CHANGELOG JOINED QUERIES

-- user_changelog
SELECT * from user
    INNER JOIN changelog
ON user.user_id = changelog.user_id; 

-- product_changelog
SELECT * from product
    INNER JOIN changelog
ON orders.order_id = order_detail.order_detail_id; 


SHOW COLUMNS FROM user; 

SELECT * from orders
    INNER JOIN order_detail
ON orders.order_id = order_detail.order_detail_id; 

INSERT INTO orders (order_date, customer_id) 
VALUES 
    ("2023-10-19 06:28:31", 1), 
    ("2023-10-24 06:30:31", 2), 
    ("2023-10-17 05:28:31", 4), 
    ("2023-10-21 06:27:27", 2);

INSERT INTO order_detail (
    product_id, 
    quantity, 
    price_sold, 
    order_id)
VALUES
    (1, 4, 50, 157), 
    (1, 4, 50, 158), 
    (1, 4, 50, 159), 
    (1, 4, 50, 160);  


SELECT * FROM orders; 
SELECT * FROM order_detail; 

UPDATE orders
    SET order_id = 4
WHERE order_id = 160; 

ALTER TABLE order_detail
    DROP COLUMN order_id; 


SHOW COLUMNS from orders; 
SHOW COLUMNS from order_detail; 

-- | order_id | order_date          | order_delivery_date | customer_id |

-- get test user with id=1 --
SELECT * FROM user
WHERE user_id=1;
SELECT * from product; 
SHOW COLUMNS FROM product; 

SHOW TABLES; 

SHOW COLUMNS FROM customer; 
SHOW COLUMNS FROM orders; 


SELECT * FROM user; 
SELECT * FROM orders; 
SELECT * FROM changelog; 


-- alter column user_password into varchar(1000) instead of binary
ALTER TABLE user
MODIFY COLUMN user_password VARCHAR(1000); 

ALTER TABLE user
MODIFY COLUMN user_role ENUM("admin", "sales", "stock", "manager") NOT NULL; 

-- get test user with id=1 --
SELECT 'user_password' FROM user; 

-- set all user passwords to "test" --
UPDATE user
SET user_password = "easy"; 

UPDATE user
SET user_role = "admin"; 

SELECT 
    username, 
    user_password 
FROM user 
WHERE username="johnisadmin";

UPDATE user
SET user_password="test"
WHERE user_id=18; 

--- INSERTING FILLER VALUES FOR PRODUCT LIST ---



INSERT INTO product (product_name, product_model, manufacturer, price, stock_on_hand, feature_id)
VALUES 
("iPhone", "11 Pro", "Apple", 999, 50, 1), 
("iPhone", "12 Pro Max", "Apple", 1099, 75, 102), 
("iPhone", "SE", "Apple", 399, 54, 2), 
("Samsung", "Galaxy", "Samsung", 899, 87, 3), 
("Google", "Pixel 4", "Google", 799, 35, 4), 
("Google", "Pixel 5", "Google", 699, 45, 5), 
("OnePlus", "9 P", "OnePlus", 899, 30, 6), 
("OnePlus", "Nord 2", "OnePlus", 499, 50, 7), 
("Xiaomi", "Mi 1", "Xiaomi", 699, 35, 8), 
("Xiaomi", "Redmi Note 1", "Xiaomi", 249, 70, 111), 
("Huawei", "P30 P", "Huawei", 899, 25, 112), 
("Huawei", "Mate 4", "Huawei", 1099, 15, 113), 
("Oppo", "Reno 6 P", "Oppo", 799, 40, 114), 
("Oppo", "Find X", "Oppo", 899, 30, 115), 
("Vivo", "V", "Vivo", 599, 55, 116), 
("Vivo", "X60 Pro+", "Vivo", 899, 20, 117), 
("Motorola", "Moto G P", "Motorola", 249, 80, 118), 
("Motorola", "Edge+", "Motorola", 699, 20, 119), 
("Sony", "Xperia 1 I", "Sony", 1099, 20, 120), 
("Sony", "Xperia 5 I", "Sony", 899, 30, 121), 
("LG", "Velvet 5", "LG", 599, 40, 122), 
("LG", "W", "LG", 799, 25, 123), 
("Asus", "ROG Phone 5", "Asus", 999, 15, 124), 
("Asus", "Zenfone 8", "Asus", 799, 30, 125), 
("Realme", "Narzo 30 P", "Realme", 299, 70, 126), 
("Realme", "GT Master Ed.", "Realme", 349, 45, 127), 
("Nubia", "Red Magic 6", "Nubia", 599, 20, 128), 
("Nubia", "Z30 P", "Nubia", 699, 25, 129), 
("Blackberry", "Key2 L", "Blackberry", 299, 15, 130), 
("Blackberry", "M", "Blackberry", 399, 10, 131), 
("CAT", "S62 P", "CAT", 649, 8, 132), 
("CAT", "B", "CAT", 99, 30, 133), 
("Fairphone", "4+", "Fairphone", 549, 12, 134), 
("Fairphone", "3", "Fairphone", 449, 18, 135); 

CREATE TABLE orders_part2_fk_test (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID)
);

SELECT * FROM orders_part2_fk_test; 
SHOW COLUMNS FROM orders_part2_fk_test; 

CREATE TABLE orders_part2_fk_again (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID), 
    FOREIGN KEY (PersonID) REFERENCES orders_part2_fk_test(PeronID); 
);

SELECT * FROM orders; 
SELECT * FROM order_detail; 
SELECT * FROM orders
    INNER JOIN order_detail; 

SELECT * FROM orders
    INNER JOIN order_detail

WHERE CONCAT(
    orders.order_id, 
    orders.order_date
) LIKE '%8%'; 

SELECT * FROM orders                        
    INNER JOIN order_detail
        
    ON orders.order_detail_id = order_detail.order_detail_id
WHERE CONCAT(orders.order_id,                   
             orders.order_date,                  
             orders.order_delivery_date,                              
             orders.customer_id, 
             order_detail.product_id, 
             order_detail.quantity, 
             order_detail.price_sold)
LIKE '%6%';

SHOW COLUMNS FROM orders; 
SHOW COLUMNS FROM order_detail; 

SELECT * FROM orders; 

UPDATE orders SET order_detail_id = 6 WHERE order_id = 6;
UPDATE orders SET order_detail_id = 7 WHERE order_id = 7;
UPDATE orders SET order_detail_id = 8 WHERE order_id = 8;

SELECT * FROM orders 
WHERE orders.order_id LIKE '%6%'; 

SELECT * FROM order_detail; 
WHERE orders.order_id LIKE '%6%'; 

SELECT * FROM orders 
INNER JOIN order_detail 

    ON orders.order_detail_id = order_detail.order_detail_id
    WHERE CONCAT(
        orders.order_id, 
        order_detail.quantity
    ) LIKE '%6%'; 
)
SELECT * FROM orders 

WHERE CONCAT(orders.order_id,                   
             orders.order_date,                  
             orders.order_delivery_date,                              
             orders.customer_id, 
             order_detail.product_id, 
             order_detail.quantity, 
             order_detail.price_sold)

LIKE '%6%';

SELECT * FROM orders 
INNER JOIN order_detail 

    ON orders.order_detail_id = order_detail.order_detail_id
    WHERE CONCAT(
        orders.order_id, 
        orders.order_date, 
        orders.customer_id, 
        order_detail.quantity
    ) LIKE '%6%'; 


SELECT * FROM orders;  
SELECT * FROM order_detail;  

DELETE FROM customer     
    WHERE customer_id <= 149; 


SHOW COLUMNS FROM changelog; 

SELECT * from changelog 
INNER JOIN  product
    ON changelog.product_id = product.product_id
INNER JOIN user
    ON changelog.user_id = user.user_id;

SELECT * from changelog 
INNER JOIN user
    ON changelog.user_id = user.user_id;

SELECT 
    changelog.product_id, 
    changelog.user_id 

SELECT * FROM product; 
SELECT * FROM changelog; 


SELECT 
    product.product_name, 
    product.product_model, 
    user.user_id, 
    changelog.product_id, 
    changelog.date_last_modified, 
    changelog.change_made_by_user_id
FROM changelog 
    LEFT JOIN product ON changelog.product_id = product.product_id
    LEFT JOIN user ON changelog.user_id = user.user_id; 


ALTER TABLE changelog
DROP COLUMN change_action; 

ALTER TABLE changelog
ADD COLUMN  change_action ENUM("created", "updated", "deleted") NOT NULL; 

UPDATE changelog
    SET change_action = "updated"
WHERE true; 

SELECT * FROM changelog; 


UPDATE feature
SET
OS="10"
WHERE feature_id="109";
 
SELECT * FROM feature; 

UPDATE feature
SET
    weight="10", 
    dimensions="10", 
    OS="10", 
    screensize="10", 
    resolution="10", 
    cpu="10", 
    ram="10", 
    storage="10", 
    battery="10", 
    front_camera="10"

WHERE feature_id="109";



SELECT * FROM product; 

SELECT product_name from product; 

SELECT * FROM changelog WHERE changelog.product_id; 
SELECT * FROM 

SELECT 
    product.product_name, 
    product.product_model, 
    created_user.username AS created_username, 
    created_by_user.username AS created_by_username, 
    changelog.product_id, 
    changelog.date_created, 
    changelog.date_last_modified, 
    changelog.change_made_by_user_id, 
    changelog.change_action
FROM changelog 
    LEFT JOIN product ON changelog.product_id = product.product_id
    LEFT JOIN user AS created_user ON changelog.user_id = created_user.user_id
    LEFT JOIN user AS created_by_user ON changelog.change_made_by_user_id = created_by_user.user_id;



    SHOW TABLES; 

ALTER TABLE product
ADD COLUMN is_deleted ENUM('0', '1') NOT NULL; 

ALTER TABLE user
ADD COLUMN is_deleted ENUM('0', '1') NOT NULL; 



SELECT 
    product_name, 
    product_model
    -- created_user.username AS created_username, 
    -- created_by_user.username AS created_by_username, 
    -- changelog.product_id, 
    -- changelog.date_created, 
    -- changelog.date_last_modified, 
    -- changelog.change_made_by_user_id, 
    -- changelog.change_action
FROM changelog 
    LEFT JOIN product ON changelog.product_id = product.product_id; 

SELECT product_id FROM product; 
SELECT changelog_id, user_id, product_id, date_created FROM changelog; 

SELECT 
    -- product_name, 
    -- product_model, 
    -- created_user.username AS created_username, 
    -- created_by_user.username AS created_by_username, 
    -- changelog.product_id, 
    -- changelog.date_created, 
    -- changelog.date_last_modified, 
    -- changelog.change_made_by_user_id, 
    -- changelog.change_action
    *
FROM changelog 
    LEFT JOIN product ON changelog.product_id = product.product_id
    LEFT JOIN user AS created_user ON changelog.user_id = created_user.user_id
    LEFT JOIN user AS created_by_user ON changelog.change_made_by_user_id = created_by_user.user_id


DELETE FROM changelog WHERE true; 

SELECT 
    product.product_name, 
    product.product_model, 
    created_user.username AS created_username, 
    created_by_user.username AS created_by_username, 
    changelog.product_id, 
    changelog.date_created, 
    changelog.date_last_modified, 
    changelog.change_made_by_user_id, 
    changelog.change_action
FROM changelog 
    LEFT JOIN product ON changelog.product_id = product.product_id
    LEFT JOIN user AS created_user ON changelog.user_id = created_user.user_id
    LEFT JOIN user AS created_by_user ON changelog.change_made_by_user_id = created_by_user.user_id; 

SELECT * FROM product; 

SELECT * FROM changelog; 
DELETE FROM changelog WHERE product_id != 84; 

SELECT * FROM customer; 
DELETE FROM customer WHERE true; 

SELECT * FROM orders; 
DELETE FROM orders WHERE true; 

SELECT * FROM product; 
SELECT * FROM feature; 

SELECT * FROM product LIMIT 1; 
SHOW COLUMNS FROM product; 

SELECT product.product_id, product.feature_id FROM product 
    INNER JOIN feature
    ON feature.feature_id=product.feature_id
WHERE manufacturer IS NULL; 

DELETE FROM product WHERE product_id="59"
    OR product_id="60"
    OR product_id="61"
    OR product_id="62"
    OR product_id="63"
    OR product_id="64"
    OR product_id="65"
    OR product_id="66"
    OR product_id="68"
    OR product_id="69"
    OR product_id="74"
    OR product_id="77"; 

DELETE FROM feature WHERE feature_id="110"
    OR "111"
    OR "112"
    OR "113"
    OR "114"
    OR "115"
    OR "116"
    OR "117"
    OR "119"
    OR "120"
    OR "125"
    OR "128"; 

SELECT * FROM feature LIMIT 1; 
SHOW COLUMNS FROM feature; 

SELECT * FROM product; 
SELECT * FROM feature;

INSERT INTO feature (
    weight, 
    dimensions, 
    OS, 
    screensize, 
    resolution, 
    cpu, 
    ram, 
    storage, 
    battery, 
    front_camera
) VALUES (
    "100.50", 
    "100x100x100", 
    "Some Phone OS", 
    "200", 
    "300x300", 
    "Intel Pentium", 
    "8", 
    "250", 
    "4000", 
    "20"
);

DELETE FROM feature; 
DELETE FROM product;

ALTER TABLE product
    ADD CONSTRAINT fk_feature_id
    FOREIGN KEY (feature_id)
    REFERENCES feature(feature_id)
    ON DELETE CASCADE; 

 
SELECT * FROM user; 
SELECT * FROM changelog; 
DELETE FROM changelog WHERE user_id IS NULL AND product_id IS NULL; 

DELETE FROM user WHERE NOT (
       username="ShaunIsManager"
    OR username="PeterInSales"
    OR username="SamIsAdmin"
    OR username="JohnTheAdmin"
); 

UPDATE changelog
SET user_id=159 
WHERE changelog_id=90; 

UPDATE changelog
SET user_id=158 
WHERE changelog_id=89;

DELETE FROM user WHERE user_id=154; 
SELECT * FROM user;


SHOW COLUMNS FROM feature;


INSERT INTO feature (weight, dimensions, OS, screensize, resolution, cpu, ram, storage, battery, front_camera)
VALUES
    (50.00, '150x75x8', 'iOS', 5.8, '1125x2436', 'Apple A13 Bionic', 4, 64, 3046, 12.00),
    (75.00, '160x78x8', 'iOS', 6.7, '1284x2778', 'Apple A14 Bionic', 6, 128, 3687, 12.00),
    (54.00, '138x67x7', 'iOS', 4.7, '750x1334', 'Apple A13 Bionic', 3, 64, 1821, 7.00),
    (87.00, '149x71x7', 'Android', 6.1, '1080x2340', 'Samsung Exynos 9820', 8, 128, 3400, 10.00),
    (35.00, '158x76x8', 'Android', 5.7, '1080x2280', 'Qualcomm Snapdragon 855', 6, 64, 2800, 8.00),
    (45.00, '153x74x8', 'Android', 6.0, '1080x2340', 'Qualcomm Snapdragon 765G', 8, 128, 4080, 8.00),
    (30.00, '165x81x8', 'Android', 6.55, '1080x2400', 'Qualcomm Snapdragon 888', 8, 128, 4500, 16.00),
    (50.00, '163x74x8', 'Android', 6.43, '1080x2400', 'MediaTek Dimensity 1200', 8, 128, 4500, 16.00),
    (35.00, '165x76x8', 'Android', 6.67, '1080x2400', 'Qualcomm Snapdragon 888', 8, 128, 4780, 20.00),
    (70.00, '162x75x8', 'Android', 6.0, '1080x2340', 'Qualcomm Snapdragon 732G', 6, 64, 5000, 16.00),
    (25.00, '149x71x7', 'Android', 6.1, '1080x2340', 'Huawei Kirin 980', 6, 128, 3650, 24.00),
    (15.00, '166x76x9', 'Android', 6.7, '1080x2340', 'Huawei Kirin 9000', 8, 256, 4400, 50.00),
    (40.00, '165x74x8', 'Android', 6.44, '1080x2400', 'Qualcomm Snapdragon 870', 8, 128, 4300, 32.00),
    (30.00, '160x76x7', 'Android', 6.67, '1080x2340', 'Qualcomm Snapdragon 845', 8, 256, 3730, 16.00),
    (55.00, '162x77x9', 'Android', 6.38, '1080x2340', 'Qualcomm Snapdragon 855', 8, 128, 4500, 32.00),
    (20.00, '168x78x8', 'Android', 6.56, '1080x2376', 'Qualcomm Snapdragon 870', 12, 256, 4200, 32.00),
    (80.00, '158x76x9', 'Android', 6.4, '1080x2300', 'Qualcomm Snapdragon 665', 6, 128, 5000, 48.00),
    (20.00, '165x74x9', 'Android', 6.7, '1080x2340', 'Qualcomm Snapdragon 865', 12, 256, 5000, 16.00),
    (20.00, '168x81x8', 'Android', 6.5, '1644x3840', 'Qualcomm Snapdragon 888', 12, 256, 4500, 12.00),
    (30.00, '160x75x8', 'Android', 6.1, '1080x2520', 'Qualcomm Snapdragon 888', 12, 256, 4500, 16.00),
    (40.00, '169x78x9', 'Android', 6.8, '1080x2460', 'Qualcomm Snapdragon 765G', 8, 128, 4300, 20.00),
    (25.00, '167x76x9', 'Android', 6.57, '1080x2340', 'Qualcomm Snapdragon 765G', 8, 128, 4310, 20.00),
    (15.00, '168x78x9', 'Android', 6.67, '1080x2340', 'Qualcomm Snapdragon 660', 4, 64, 3000, 13.00); 

INSERT INTO product (product_name, product_model, manufacturer, price, stock_on_hand, feature_id)
VALUES 
("iPhone", "11 Pro", "Apple", 999, 50, 137), 
("iPhone", "12 Pro Max", "Apple", 1099, 75, 138), 
("iPhone", "SE", "Apple", 399, 54, 139), 
("Samsung", "Galaxy", "Samsung", 899, 87, 140), 
("Google", "Pixel 4", "Google", 799, 35, 141), 
("Google", "Pixel 5", "Google", 699, 45, 142), 
("OnePlus", "9 P", "OnePlus", 899, 30, 143), 
("OnePlus", "Nord 2", "OnePlus", 499, 50, 144), 
("Xiaomi", "Mi 1", "Xiaomi", 699, 35, 145), 
("Xiaomi", "Redmi Note 1", "Xiaomi", 249, 70, 146), 
("Huawei", "P30 P", "Huawei", 899, 25, 147), 
("Huawei", "Mate 4", "Huawei", 1099, 15, 148), 
("Oppo", "Reno 6 P", "Oppo", 799, 40, 149), 
("Oppo", "Find X", "Oppo", 899, 30, 150), 
("Vivo", "V", "Vivo", 599, 55, 151), 
("Vivo", "X60 Pro+", "Vivo", 899, 20, 152), 
("Motorola", "Moto G P", "Motorola", 249, 80, 153), 
("Motorola", "Edge+", "Motorola", 699, 20, 154), 
("Sony", "Xperia 1 I", "Sony", 1099, 20, 155), 
("Sony", "Xperia 5 I", "Sony", 899, 30, 156), 
("LG", "Velvet 5", "LG", 599, 40, 157), 
("LG", "W", "LG", 799, 25, 158), 
("Asus", "ROG Phone 5", "Asus", 999, 15, 159); 

SELECT * FROM feature; 
SELECT * FROM feature; 

SELECT * FROM feature;

DELETE FROM changelog WHERE changelog_id=80; 

SHOW COLUMNS FROM customer;

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
) LIKE '%%'

AND "1950-01-01 00:00:00" <= order_date AND order_date <= "3000-01-01 00:00:00"; 

''
'1950-01-01 00:00:00'
'3000-01-01 00:00:00'
'order_date (newest first)'
getDetailedBySearchTerm 
'query_results'

SELECT * FROM orders; 
SELECT * FROM product;
SELECT * FROM order_detail; 

SELECT * FROM product
INNER JOIN order_detail ON product.product_id = order_detail.product_id LIMIT 2;

DELETE FROM orders WHERE true; 
DELETE FROM order_detail WHERE true; 
DELETE FROM customer WHERE true; 

ALTER TABLE orders
    ADD CONSTRAINT fk_order_detail_id
    FOREIGN KEY (order_detail_id)
    REFERENCES order_detail(order_detail_id)
    ON DELETE CASCADE; 

ALTER TABLE order_detail
    ADD CONSTRAINT fk_product_id
    FOREIGN KEY (product_id)
    REFERENCES product(product_id)
    ON DELETE CASCADE; 

SHOW INDEXES from orders; 
SHOW INDEXES from order_detail; 
SHOW INDEXES from customer; 

SHOW COLUMNS FROM order_detail; 
SHOW COLUMNS FROM customer; 
SHOW COLUMNS FROM user; 


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
    product.product_name LIKE '%%' OR
    product.product_model LIKE '%%' OR
    created_user.username LIKE '%%' OR 
    created_by_user.username LIKE '%%'; 

SELECT * FROM changelog LEFT JOIN product ON changelog.product_id = product.product_id
                        LEFT JOIN user AS created_by_user ON changelog.change_made_by_user_id = created_by_user.user_id
                        LEFT JOIN user AS created_user ON changelog.user_id = created_user.user_id; 

select * from changelog; 
SHOW INDEXES FROM changelog; 

ALTER TABLE changelog
    ADD CONSTRAINT fk_changelog_user_id
    FOREIGN KEY (user_id)
    REFERENCES user(user_id)
    ON DELETE CASCADE; 

ALTER TABLE changelog
    DROP FOREIGN KEY fk_user_id; 

ALTER TABLE changelog
    ADD CONSTRAINT fk_changelog_product_id
    FOREIGN KEY (product_id)
    REFERENCES product(product_id)
    ON DELETE CASCADE; 
SHOW INDEXES FROM changelog; 

ALTER TABLE orders
    ADD CONSTRAINT fk_orders_customer_id
    FOREIGN KEY (customer_id)
    REFERENCES customer(customer_id)
    ON DELETE CASCADE; 
SHOW INDEXES FROM orders; 

SHOW COLUMNS FROM product; 

SELECT * FROM product WHERE product_id != 108; 
SELECT * FROM changelog; 

INSERT INTO changelog (
    date_created, 
    date_last_modified, 
    user_id, 
    product_id, 
    change_made_by_user_id, 
    change_action
) VALUES
('2023-11-18 16:04:15', NULL, NULL,  85, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  86, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  87, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  88, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  89, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  90, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  91, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  92, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  93, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  94, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  95, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  96, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  97, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  98, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL,  99, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL, 100, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL, 101, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL, 102, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL, 103, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL, 104, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL, 105, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL, 106, 1, 'created'),
('2023-11-18 16:04:15', NULL, NULL, 107, 1, 'created'); 

INSERT INTO changelog (date_created, date_last_modified, user_id, product_id, change_made_by_user_id) 
('2023-11-18 16:04:15', NULL, NULL, 108, 'created'), 


SELECT * FROM customer WHERE customer_phone = "";  
DELETE FROM customer WHERE customer_phone = "";  
