
let mysql = require("mysql");
let inquirer = require("inquirer");

let numberOfUnits = '';

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
    userSearch();
});


function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      //connection.end();
  });
}

function userSearch() {
    inquirer
        .prompt({
                type: "input",
                name: "name",
                message: "Welcome to bamazon"
            },
            {
                //type: "input",
                //name: "Hello",
                //message: "We Love Our Customers"
            })
        .then(function (answer) {
            switch (answer.id) {
                case "Find product by ID":
                    productSearch();
                    break;

                case "Find product by number of units":
                    unitsToBuy();
                    break;
            }

        });


    function userDecide() {
        inquirer
            .prompt({
                name: "response",
                type: "list",
                message: "Would you like to view our products?",
                choices: [
                    "Y",
                    "N"
                ]
            })
            .then(function (answer) {
                console.log(answer.response); {

                    //console.log(answer.response);
                    //case "Find by product id":
                    //  productSearch();
                     //   break;

                    //case "Find all product by number of units":
                       // unitsToBuy();
                      // break;
                }
            });
         }

    function productSearch() {
        inquirer
            .prompt({
                name: "id",
                type: "list",
                message: "What is the id of the product you would like to purchase?",
                choices: [
                    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
                ]
            })
            .then(function (answer) {
                let query = "SELECT id FROM bamazon WHERE=item_id?";
                connection.query(query, {id: answer.id}, function (err, res) {
                    for (var i = 0; i < res.length; i++) {
                        //console.log("id: " + id[i]);
                        if (answer.response === "Y") {
                            return id[i];
                        } else if (answer.response === "N") {
                            console.log("Have Another Look!");
                        }
                    }
                    productSearch();
                });
            });
        }

    function unitsToBuy() {
        inquirer
            .prompt({
                type: "confirm",
                name: "count",
                message: "How many units of the product would you like to buy?"
            })
            .then(function (answer) {
                let query = "SELECT id FROM bamazon_db WHERE=item_id ?";
                connection.query(query, {id: answer.id}, function (err, res) {
                    for (var i = 0; i < res.length; i++) {
                        if (numberOfUnits < 5) {
                            return sum;
                        } else if (numberOfUnits >= 5) {
                            return sum;
                        }
                        productSearch();
                    }
              });
         });
     }
}