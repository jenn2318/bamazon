
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
    //userSearch();
    userDecide();
    //productSearch();
    //unitsToBuy();
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
                message: "Welcome to bamazon!, Would you like to view our products?"
            },
            {
                //type: "input",
                //name: "Hello",
                //message: "We Love Our Customers"
            })
        .then(function (answer) {
            switch (answer.name) {
                case "Find product by ID":
                    productSearch();
                    break;

                case "Find product by number of units":
                    unitsToBuy();
                    break;
            }

        });

    }


    function userDecide() {
        inquirer
            .prompt({
                name: "name",
                type: "list",
                message: "Would you like to view our products?",
                choices: [
                    "Y",
                    "N"
                ]
            })
            .then(function (answer) {
                console.log(answer.name);
                    if (answer.name === "Y") {
                        console.log("Ok, great!");

                    } else {
                  if (answer.name === "N") {
                        console.log("Come On, Have Another Look!");
                    }
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
                let query = "SELECT id FROM products WHERE=item_id=2";
                connection.query(query, {id: answer.id}, function (err, res) {
                    for (var i = 0; i < res.length; i++) {
                        unitsToBuy(res[0].product_name)
                        }

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
                let query = "SELECT id FROM products WHERE=item_id?";
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
