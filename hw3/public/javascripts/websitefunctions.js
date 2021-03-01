// used the document ready function as recommended by the w3 schools tutorial
// link: https://www.w3schools.com/jquery/jquery_syntax.asp
$(document).ready(function(){
   // Registering an onClick listener to the order button using its ID
   $("#orderButton").click(onClick);
   
   // function that handles clicks to the dropdown list with the different months
   // gets the dropdown-content id (months) and listens for clicks to its a href values (list options)
   // External Citation: Used this reference to create my click function to handle events for the dropdown
   // menu with the month selections along with assigning each month a data element id
   // Link: https://stackoverflow.com/questions/18171600/how-to-assign-value-to-href

   // Registering an onCLick listener to the dropdown-contents a href values with its ID
   $('#months a').click(monthClick);

	function monthClick(){
      // NOTE: This method differs from previous iterations (Large if else block was cut down for brevity)
   
      // gets the current value of the dropdown menu using the 'this' keyword
      // each month has a specific data element ID that corresponds to a specific month
      var id = $(this).data('elemid');
      
      // Sets the text of the month drop down button to the corresponding ID of the month that was clicked
      $('#monthButton').text(id);

      // Create a post call for HW 4 specification #3
      // External Citation: Read up on the jquery post documentation to know how to call post 
      // Link: https://api.jquery.com/jquery.post/
      $.post("/orders", {}, function(data, status){
         // Iteration variable
         var i = 0;
         // Loop through 0-2 so we can update the Bulleted list in index.html
         while(i<3){
            // Changes from topping0 to topping1 to topping2
            // This allows these values to get updated with their new hardcoded values
            // from the JSON obj. in orders.js
            var toppingID = "topping" + i;

            // Sets the quanity to the appropriate value from the order they appear
            // in the cheesecakeData array in routes/orders.js
            var quantity = data[i].quantity;
            var topping = data[i].topping;

            // Call stringify on the object to get it's quantity and topping
            converted = JSON.stringify(quantity + " " + topping);
            // Parse this object 
            parse = JSON.parse(converted);
            // Updated the HTML to appropriately display the new data from routes/orders.js
            document.getElementById(toppingID).innerHTML = parse;

            // increment i to go through the three toppings and their quantities
            i++;
         }
      });
      
    
   }// end of monthClick Function

	// External Citation: Referenced the following tutorial to trim input from textarea
	// Link: 
	// https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-a-textarea-in-jquery.php	

   function onClick(){
      // variable that trims the string from the textarea
      var veganCheck = $.trim($("#notes").val());

      // variables for the customers quantity and topping from dropdown menu and radio button group
      var quantity = $('#quantity option:selected').text();
      var topping = $('input[name="Topping"]:checked').val();

      // if the word Vegan or vegan appears anywhere in the string it pops up the warning
      if(veganCheck.indexOf("Vegan") >= 0 || veganCheck.indexOf("vegan")>=0){
         // Show alert dialog to user if value is vegan upper and lower case
		   // Note: only displays if vegan is spelled as Vegan or vegan
         alert("WARNING: Cheesecake contains dairy");

      }else{ // if customer isn't a vegan
         // External Citation: Referenced the following tutorial to use the hide method 
         // Link: 
         // https://www.w3schools.com/jquery/eff_hide.asp

         // hides the quantity, dropdown, topping selector, notes text, and order button
         // as specified by the homework requirements
         $('#table1').hide();
         $("label").hide();
         $("textarea").hide();
         $('#orderButton').hide();

         // External Citation: Referenced this page to use id's of parts of webpage to change them
         // Link: 
         // https://www.tutorialspoint.com/How-to-change-text-inside-an-element-using-jQuery

         // after the appropriate parts of the webpage are hidden, displays the appropriate
         // thank you message with the customers order and their additional notes
         $("#message").text("Thank you! Your order has been placed");
         $("#orderdetails").text("Order Details: " + quantity + " "+ topping + " cheesecake(s)");
         $("#ordernotes").text("Additional Notes: " + veganCheck);

	   }
   }// End of onClick function

}); // End Document Ready Function