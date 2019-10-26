var myStore = new Commerce('pk_168757b95ff55c066b59b9e93c48a2b0e7bc1b97c798b', true);



$(document).ready(function(){
//Create a checkout token for the product with the permalink 'commerce-js-example'.
myStore.Checkout.generateToken('white-dress', 'permalink', function(resp){
  //Store the checkout token id as a global variable
  checkout_token_id = resp.id;
      /*
      CREATE EXTRAFIELD <INPUT>'s

      */
        //Loop through each extrafield in this checkout token
        $.each(resp.extrafields, function(k, extrafield) {
          //Create an <input> for this extrafield with the name in this format extrafield[{EXTRAFIELD_ID}]
          var extrafield_html =  extrafield.name + ": <input name=\"extrafields["+extrafield.id+"]\" type=\"text\">";
          //Append the new input to the extrafields <div>
          $('#extrafields').append(extrafield_html)
        });
  },
  function(error){
    console.log(error);
  }
);
});
/*
The capture function

*/
function capture(){
  //We're using jQuery.serializeJSON (https://github.com/marioizquierdo/jquery.serializeJSON) to convert the form into a json object so we don't have to do any extra formatting
  var order = $('#checkout').serializeJSON();
  myStore.Checkout.capture(checkout_token_id, order,
    function(resp) {
        console.log(resp);
        alert('Captured! Check the console for the receipt object');
    },
    function(error) {
      console.log(error)
      alert('Error! Check the console for more details');
    }
  );
}
