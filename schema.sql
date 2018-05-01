DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
item_id VARCHAR(50),
product_name VARCHAR(150),
department_name VARCHAR(100),
price DECIMAL(5),
stock_quantity INTEGER(100),
PRIMARY KEY (id)

SELECT * FROM products;