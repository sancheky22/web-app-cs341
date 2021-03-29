//@author: Kyle Sanchez

// copied from users.js
var express = require('express');
var router = express.Router();

// Need to require dbms_promise.js file in orders.js (access database code)
// for hw 5 
var dbms = require('./dbms.js');

// Function to increment and retrieve orderID for a new order being placed
async function getOrderID(){
    // Retrieve the MAX(ORDERID) from the DB
    const dbResponse = await dbms.dbquery("SELECT MAX(ORDERID) FROM ORDERS;");
    // If this value is 0 return 0
    if (dbResponse.length === 0) return 0;
    // get the first value of whatever the max ORDER ID is (Max should be first)
    const maxOrderID = dbResponse[0]["MAX(ORDERID)"];
    // Increment orderID
    return maxOrderID+1;
}

// Function to insert a new order into the database
async function placeOrder(month, day, quantity, topping, notes){
    // Pass the new orderID to the new order
    const orderID = await getOrderID();
    // Insert the new order into the databse
    await dbms.dbquery(`INSERT INTO ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES)
                VALUES (${orderID},'${month}', ${day}, ${quantity}, '${topping}', '${notes}');`);
}


// Post method
router.post('/', async function(req,res,next){
    // retrieve quantity,topping, notes from the request body
    const quanity = req.body["quantity"];
    const topping = req.body["toppings"];
    const notes = req.body["notes"];

    // Hard coded a day with my birthday
    const month = "NOV";
    const day = 24;

    try {
        await placeOrder(month,day,quanity,topping,notes);
        // Log the quantity,topping and notes to make sure correct values being sent
        console.log(quanity);
        console.log(topping);
        console.log(notes);
        // No error
        return res.sendStatus(200);
    }catch(e){
        console.error(e);
        // Error Bad Request
        return res.sendStatus(400);
    }

});

module.exports = router;