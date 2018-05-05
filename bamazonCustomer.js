
let mysql = require("mysql");
let inquirer = require("inquirer");
let Table = require("easy-table");


let choicesArr = [];
let purchase_amt;
let product_price;
let stock_onhand = '';


let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err, res) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showProducts();
    afterConnection();
    printStuff(res);

});


function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      //connection.end();
  });
}


function printStuff (res) {


    let data = [
        { id: 1, desc: 'banana', department_name: res.produce, price: 1.00, stock_quanity:50 },
        { id: 2, desc: 'shampoo', department_name: res.beauty, price: 19.00, stcok_quanity:20},
        { id: 3, desc: 'cookies', department_name: res.snacks, price: 2.00, stock_quantity:15 }
    ]

    let t = new Table

    data.forEach(function (product) {
        t.cell('Item ID', product.item_id);
        t.cell('Product Name', product.product_name);
        t.cell('Department Name', product.department_name);
        t.cell('Price, USD', product.price, Table.number(2))
        t.cell('Stock Quantity', product.stock_quantity);
        t.newRow()
    });

    console.log(t.toString());
}



//function made for user to choose an ID of the Item they would like to purchase
showProducts = function () {
    connection.query('SELECT * FROM products', function (err, res) {
        let choicesArr = [];
        // Display all items
        console.log("Display all available items for sale");
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            choicesArr.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
        }
        console.log("-----");


// inquirer to prompt the user of the item ID they would like to buy

        inquirer
            .prompt([{
                name: "id",
                type: "input",
                message: "Welcome to bamazon! Here are our products, Which item ID would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
// This prompt will ask the user how many units they would like to buy
                {
                    name: "count",
                    type: "input",
                    message: "How many of this item would you like to buy?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }])
            // query database, to update the stock quantity
            .then(function (answer) {
                let chosenID = answer.id - 1;
                let chosenQuantity = answer.count;
                //after taking in amount user wants, verify the quantity is there
                if (chosenQuantity < res[chosenID].stock_quantity) {
                    //mysql should update stock quantity here
                    connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: res[chosenID].stock_quantity - chosenQuantity}, {
                        item_id: res[chosenID].item_id
                    }], function (err, res) {
                        console.log(res);
                    });
                } else {
                    console.log("Insufficient quantity for the item you wanted!");


                }
            });
    });
}


//Function to show the price, still working on this function
//function purchaseMade() {
  //  stock_onhand = stock_left
   //let query = "SELECT products WHERE=item_id=? AND SET price=?",
    //connection.query(query,function(err, res){
      // console.log(err);
     //console.log("You're total price is $" + total_price);
    //}

