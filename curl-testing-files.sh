req GET "staff_admin?tab=staff"
req GET "staff_admin?tab=orders"
req GET "staff_admin?tab=products"
req GET "staff_admin?tab=customers"
req GET "staff_admin?tab=changelog"

req POST "test_route" '{
    "name": "product_name"
}'

req GET "staff_admin?tab=changelog"

req POST "create_staff" '{
    "firstname": "Paul", 
    "lastname": "Benson", 
    "user_role": "Sales", 
    "username": "SamIsSales", 
    "user_password": "PaulsPassword"
}'

req POST "staff_admin" '{
    "tab": "products", 
    "action": "update", 
    "product_id": "82", 
    "change_action": "updated", 
    "product_name": "some_modelsomething else"
}'

req POST "create_product" '{ 
        "product_name":         "some_name",  
        "product_model":        "some_model",  
        "product_manufacturer": "some_manufacturer",  
        "product_price":        "100",   
        "product_stock":        "100",   
        "product_weight":       "100",   
        "product_dimensions":   "some_produc",   
        "product_os":           "some_os",   
        "product_screensize":   "100",   
        "product_resolution":   "100",   
        "product_cpu":          "some_cpu",   
        "product_ram":          "100",   
        "product_storage":      "100",   
        "product_battery":      "100",   
        "product_front_camera": "100"  
    }'


req POST "test_route"

req POST "search_staff_admin" '{
    "tab": "changelog", 
    "search_term": ""
}'

req POST "search_staff_admin" '{
    "tab": "changelog", 
    "search_term": ""
}'

req POST "order_confirmation" '{
    "customer_firstname": "Adam",  
    "customer_lastname": "West",  
    "customer_phone": "0562323834",  
    "customer_email": "AdamWest@gmail.com",  
    "customer_address": "45 Dimsdale Street", 
    "customer_postcode": "0687", 
    "customer_state": "QLD", 
    "customer_city": "Brisbane", 
    "product_id": "107", 
    "price_sold": "1299.00", 
    "quantity_ordered": "8"
}'

req GET "staff_login"
req GET "staff_admin"
