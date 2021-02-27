//@author: Kyle Sanchez

// copied from users.js
var express = require('express');
var router = express.Router();

// w3 schools ex:
// https://www.w3schools.com/js/js_json_intro.asp
// https://medium.com/@sandhya.sadanandan/javascript-how-to-construct-an-array-of-json-objects-using-map-d1a513727008

var data = [{
    "topping": "cherry",
    "quantity": "2"
  },
  {
    "topping": "plain",
    "quantity": "6"
  },
  { 
    "topping": "chocolate",
    "quantity": "3"
  },
  {
    "topping": "cherry",
    "quantity": "8"
  }
];

var ordersJSON = JSON.stringify(data);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(ordersJSON);
});

module.exports = router;