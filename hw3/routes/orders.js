//@author: Kyle Sanchez

// copied from users.js
var express = require('express');
var router = express.Router();

// External Citation: Used the example from w3 and medium.com to construct an arry of JSON objects
// Link: https://www.w3schools.com/js/js_json_intro.asp
// Link: https://medium.com/@sandhya.sadanandan/javascript-how-to-construct-an-array-of-json-objects-using-map-d1a513727008

// cheesecakeData to be parsed when the dropdown button is clicked
var cheesecakeData = [{
    topping: "cherry",
    quantity: 2
  },
  {
    topping: "plain",
    quantity: 6
  },
  { 
    topping: "chocolate",
    quantity: 3
  }
];


//var ordersJSON = JSON.stringify(data);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(cheesecakeData);
});

// This tells our server side to expect a post call just like it expects a GET call as well
/* POST users listing. */
router.post('/', function(req, res, next) {
  res.send(cheesecakeData);
});

module.exports = router;