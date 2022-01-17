var selectInputs = document.querySelectorAll(".activities input");
var nameMessage = "Please enter a name!";
var emailMessage = "Please enter an email!";
var activityMessage = "Please select an activity!";

/* Basic Info section
*/
function isNameEmpty(){
    return document.getElementById("name").value ==="";
}

function hasEmail(){
    var email =  document.getElementById("email").value;
    return /\S+@\S+\.\S+/.test(email);
}

/* Activities Section
*/
function activitySelected(){
    checked = 0;
    for (var i=0; i < selectInputs.length; i++){
        if(selectInputs[i].checked) checked++;
    }
    return checked > 0;
}

/* Payment Info Section
*/
function ccNumberCorrect(){
    var cardNumber  = document.getElementById("cc-num").value;
    var cardLength = cardNumber.length >=13 && cardNumber.length <= 16;
    return (cardLength && !isNaN(cardNumber));
}

function zipCorrect(){
    var zipCode = document.getElementById("zip").value;
    var zipLength = zipCode.length === 5;
    return zipLength && !isNaN(zipCode);

}

function cvvCorrect(){
    var cvvNumber = document.getElementById("cvv").value;
    var cvvLength = cvvNumber.length === 3;
    return cvvLength && !isNaN(cvvNumber);
}
function creditInfoCorrect(){
    var paymentSelect = document.getElementById("payment");
    if (paymentSelect.value !== "credit-card" && paymentSelect.value !=="select-method") return true;
    return ccNumberCorrect() && zipCorrect() && cvvCorrect();
}

/* Validation and Error Handling
*/
function createErrorMessage(text){
    var errorMessage = document.createElement("span");
    errorMessage.innerText = text;
    errorMessage.className = "error";
    return errorMessage;
}

function showErrorMessages(){

    if (isNameEmpty()){
        var messageElement = createErrorMessage(nameMessage);
        document.querySelector("label[for='name']").appendChild(messageElement);
    }
    if (!hasEmail()){
        var messageElement = createErrorMessage(emailMessage);
        document.querySelector("label[for='email']").appendChild(messageElement);
    }
    if(!activitySelected()){
        var messageElement = createErrorMessage(activityMessage);
        document.querySelector(".activities legend").appendChild(messageElement);
    }

    if(document.getElementById("payment").value === "select-method")
        document.querySelector("label[for='payment']").className += "message";
    
    if (!ccNumberCorrect()) document.querySelector("label[for='cc-num']").className += "message";
    if (!zipCorrect()) document.querySelector("label[for='zip']").className += "message";
    if (!cvvCorrect()) document.querySelector("label[for='cvv']").className += "message";

}

var canSubmit = function(event){
    // Prevent submitting form automatically
    event.preventDefault();
    // Get rid of previous error messages
    while(document.querySelectorAll(".error").length){
        document.querySelectorAll(".error")[0].remove();
    }
    while(document.querySelectorAll(".message").length){
        document.querySelectorAll(".message")[0].className ="";
    }
    // If form is valid, trigger submit on form
    if(!isNameEmpty() && hasEmail() && activitySelected() && creditInfoCorrect()){
        
        document.querySelector("form").submit();   
    } else {
        showErrorMessages();
    }
}
/* Event Handlers
*/
document.querySelector("button[type='submit']").addEventListener("click", canSubmit);




