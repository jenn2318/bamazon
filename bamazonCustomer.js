
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
  });
}

function productSearch() {
  inquirer
    .prompt({
     
       type: "input",
       name: "name",
       message: "Welcome to bamazon"
    },
      {
        type: confirm,
        name: count,
        message: "Would you like to view our products?"
      }
    }) .then(function(answer) {
      switch (answer.id) {
      case "Find product by ID":
        productSearch();
        break;

      case "Find product by number of units":
        unitsToBuy();
        break;
      }
    });

function productSearch() {
  inquirer
    .prompt({
      name: "id",
      type: "list",
      message: "What is the id of the product you would like to purchase?",
      choices: [
        '1','2','3','4','5','6','7','8','9','10'
      ]
    }
      .then(function(answer) {
        var query = "SELECT id FROM bamazon WHERE ?";
        connection.query(query, { id: answer.id }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("id: " + id[i]);
          }
          productSearch();
        });
      });      

  function untitsToBuy() {
    inquirer
      .prompt({
        type: "confirm",
        name: "count",
        message: "How many units of the product would you like to buy?"
      })
      .then(function(answer) {
        //var query = "SELECT id FROM bamazon_db WHERE ?";
        connection.query(query, { id: answer.id }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            if (number of units < 5) {
              return sum;
           } else {
             if (number of units >= 5) {
                 return sum;
            }
            
          } 
          productSearch();
        });
      });
  }
  