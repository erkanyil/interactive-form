var jobTitleInput = document.getElementById("other-title");
var selectTitle = document.getElementById("title");
var selectDesign = document.getElementById("design");
var selectColor = document.getElementById("color");
var eventSelect = document.querySelectorAll(".activities input");

var priceInfo = document.createElement("span");
var paymentInfo = document.querySelectorAll(".payment > div");
var colorOptions = [];
var total = 0.00;

// Display or Hide other job title text input 
selectTitle.addEventListener('change', ()=>{
	if (selectTitle.value==='other')
		jobTitleInput.style.display = 'block';
	else
		jobTitleInput.style.display = 'none';
});

/* ----	Tshirt Color Selection ----
*/

// Tshirt color listing based on Design selection
var changeTShirtColors = function(){
	var colors = themesAndColors[selectDesign.value];
	while (selectColor.options.length){
		selectColor.options.remove(0);
	}
	if (colors){
		for (var i=0; i < colors.length ;i++){
			var color = document.createElement("option");
			color.value = colors[i][0];
			color.text = colors[i][1];
			selectColor.add(color);

		}
	}

}


/* ----	Register for Activities ----
*/

//Match selected activity with activity description in data.js
function getActivityData(selActivity){
	var pos;
	var name = selActivity.name;
	
	for (var i = 0; i< activities.length; ++i){
		if (activities[i].name == name){
			
			pos = i;
			break;
		}
	}
	console.log(pos);
	return activities[pos];
}

function filterActivities(currentActivity){
	var i;
	for (i=0; i< activities.length; ++i){
		//Check if event are colliding
		if(	activities[i].name !== currentActivity.name &&
			activities[i].day === currentActivity.day &&
			activities[i].time_start=== currentActivity.time_start){
				//toggle disabled property for both checkbox and label
				eventSelect[i].disabled = !eventSelect[i].disabled;
				eventSelect[i].parentNode.classList.toggle('disabled');
			}
	}
}
// Calculate and displat total for selected activities

function displayPrice(currentElement, currentActivity){
	currentElement.checked === true ? total += currentActivity.price : total -= currentActivity.price;
	priceInfo.innerText = "Total: $" + total;
	if (total > 0) priceInfo.style.display = "";
	else priceInfo.style.display = "none";

}

function updateActivities(){
	var currentElement = this;
	var currentActivity = getActivityData(this);
	console.log(currentActivity);
	filterActivities(currentActivity);
	displayPrice(currentElement, currentActivity);
	
}

for (var i = 0; i < eventSelect.length; ++i){
	eventSelect[i].onchange = updateActivities;
}


/* Payment Info Section */

var changePaymentInfo = function() {
	var selPayment = this.value;
	var i;
	for(i = 0; i < paymentInfo.length; ++i) {
		if(paymentInfo[i].classList.contains(selPayment)) {
			paymentInfo[i].style.display = "";
		} else {
			paymentInfo[i].style.display = "none";
		}
	}
}


//Payment Select - Payment Info
document.getElementById("payment").addEventListener("change", changePaymentInfo);

//Design Select - T-Shirt Color Info
selectDesign.addEventListener("change", changeTShirtColors);




/* When Page Load */

//Trigger change event to show appropriate colors in T-Shirt Info select
changeTShirtColors();

// Displat price info
document.querySelector(".activities").appendChild(priceInfo);

// Focus on nameInput field at the beginning
document.querySelector("input[type=text]:first-of-type").focus();

// Hiding other job title at the beginning
jobTitleInput.style.display ='none';

//No payment info is displayed, until payment method is chosen
changePaymentInfo();


	




