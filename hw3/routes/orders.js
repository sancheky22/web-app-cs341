//@author: Kyle Sanchez

// copied from users.js
var express = require('express');
var router = express.Router();

// w3 schools ex:
// https://www.w3schools.com/js/js_json_intro.asp
var myObj = 
{ data : [   
    { topping: "cherry",
      quantity: "2" },
    { topping: "plain",
      quantity: "6" },
    { topping: "chocolate",
      quantity: "3" }
  ] // end data
}// end myObj



var myJSON = JSON.stringify(myObj);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(myJSON);
});

module.exports = router;