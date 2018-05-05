
let mysql = require("mysql");
let inquirer = require("inquirer");


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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    purchaseStuff();


});


function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      //connection.end();
  });
}

    //}


//function made for user to choose an ID of the Item they would like to purchase
purchaseStuff = function () {
    connection.query('SELECT * FROM products', function (err, res) {
        let choicesArr = [];
        // Display all items
        console.log("Display all available items for sale");
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            choicesArr.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
        }
        console.log("-----");


// inquirer to prompt the items they want to buy

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
                //after taking in amount, verify if we have enough quantity
                if (chosenQuantity < res[chosenID].stock_quantity) {
                    //If i have i should update MySQL
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        //mysql will update quantity
                        stock_quantity: res[chosenID].stock_quantity - chosenQuantity
                    }, {
                        item_id: res[chosenID].item_id
                    }], function (err, res) {
                        console.log(res);
                    });
                } else {
                    console.log("Insufficient quantity for the item you wanted!");
                    //purchaseStuff();

                }
            });
    });
}


//Function to show the price, still working on this function
//function purchaseMade() {
    //stock_onhand = stock_left
  //  let query = "SELECT products WHERE price=?",
    //connection.query(query,function(err, res){
      //  console.log(res);
    //  console.log("You're total price is $" + total_price);
    //});
      //purchaseMade();
