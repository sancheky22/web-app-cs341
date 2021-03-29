//@author: Kyle Sanchez

// copied from users.js
var express = require('express');
var router = express.Router();

// Need to require dbms_promise.js file in orders.js (access database code)
// for hw 5 
var dbms = require('./dbms.js');

// External Citation: Used the example from w3 and medium.com to construct an arry of JSON objects
// Link: https://www.w3schools.com/js/js_json_intro.asp
// Link: https://medium.com/@sandhya.sadanandan/javascript-how-to-construct-an-array-of-json-objects-using-map-d1a513727008


// cheesecakeData to be parsed when the dropdown button is clicked
// set data to 0 for now so it can be changed by the DB
var cheesecakeData = [{
    topping: "cherry",
    quantity: 0
  },
  {
    topping: "plain",
    quantity: 0
  },
  { 
    topping: "chocolate",
    quantity: 0
  }
];


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(cheesecakeData);
});

// External Citation: Read developer documentation to understand how to properly fetch data from database
// Link: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
// This tells our server side to expect a post call just like it expects a GET call as well
/* POST users listing. */
router.use(express.json());
router.post('/', function(req, res, next) {
  // Month database variable that will be used for our SQL calls
  var db_Month = req.body.month;
  // log to see what month is being clicked
  console.log("month: " + db_Month);
  // SQL call to get the plain cheesecakes for whatever month is called
  dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE TOPPING='plain' AND MONTH='"+ db_Month + "';").then(function(cheesecakeDB){
    // cheesecake quantity 
    var cheesecakeQuan = cheesecakeDB[0]["SUM(QUANTITY)"]

    // set the quantity for 0 if it isn't set properly
    if (!cheesecakeQuan){
      cheesecakeQuan= 0;
    }
    // setting quantity to the correct quantity that is in the database
    cheesecakeData[0]["quantity"] = cheesecakeQuan;


  }).then(function(){
    // ReturnSQL call to get the plain cheesecakes for whatever month is called
    return dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE TOPPING='cherry' AND MONTH='"+ db_Month + "';");


  }).then(function(cheesecakeDB){
    var cheesecakeQuan = cheesecakeDB[0]["SUM(QUANTITY)"]
    // set the quantity for 0 if it isn't set properly
    if (!cheesecakeQuan){
      cheesecakeQuan = 0;
    }
    // setting the second quantity to the correct cheesecake quantity
    cheesecakeData[1]["quantity"] = cheesecakeQuan;
  }).then(function(){
    // Return SQL call to get the plain cheesecakes for whatever month is called
    return dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE TOPPING='chocolate' AND MONTH='"+ db_Month + "';");
  }).then(function(cheesecakeDB){

    var cheesecakeQuan = cheesecakeDB[0]["SUM(QUANTITY"]
    // set the quantity for 0 if it isn't set properly
    if (!cheesecakeQuan){
      cheesecakeQuan = 0;
    }

    // setting quantity to the correct quantity that is in the database
    cheesecakeData[2]["quantity"] = cheesecakeQuan;
  }).then(function(){
      // log the JSON object
      console.log(cheesecakeData);
      // send the proper cheesecake data to the website
      res.json(cheesecakeData);
  });

});


module.exports = router;