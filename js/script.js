// Job Role

// define variables
const otherJobRole = document.querySelector('#other-title');
otherJobRole.className = "input-hidden";

const jobDropDown = document.querySelector('#title');
const jobRoles = document.querySelectorAll('#title option');

let selectOtherRole;

//find the job role with the value of other - covers possibility of more options added in future
for (let i=0; i<jobRoles.length; i++) {
    if(jobRoles[i].value === "other") {  
        selectOtherRole = jobRoles[i];
    }
}

// listen for a change in the dropdown's selected value
jobDropDown.addEventListener('change', function() {
    //if the selected role is 'other', change the style of the associated text field
    if(selectOtherRole.selected) {
        otherJobRole.className = ""
    } else {
        otherJobRole.className = "input-hidden" 
    }
})


// T-shirt info
//hiding the t-shirt options until a selection is made

const colourDropDown = document.querySelector('#color');
const noColours = document.createElement('OPTION');
noColours.value = "no-colours";
noColours.innerText = "Please select a T-shirt theme";
let colourOptions = document.querySelectorAll('#color option');

//looping through and hiding each option
function noDesign(){
    for(let i=0; i<colourOptions.length; i++) {
        colourOptions[i].style = "display: none";
    }
    // adding the no colour option in place of the colours
    colourDropDown.insertBefore(noColours, colourOptions[0]);
    colourDropDown.value = "no-colours";

}

// call it immediately. Not an IFFE because using it agian later.
noDesign();

const designDropDown = document.querySelector('#design');

designDropDown.addEventListener('change', function() {
    let designSelected = designDropDown.value;
    changeColorScheme(designSelected);
})

// reset value of colorOptions to include no colours
colourOptions = document.querySelectorAll('#color option');
// two arrays to include all possible values for the select options
const jsPunsArray = ['cornflowerblue', 'darkslategrey', 'gold']
const loveJS = ['tomato', 'steelblue', 'dimgrey']

// complicated function to update the drop down

const changeColorScheme = scheme => {
    // it determines whether js puns or love js
    if (scheme === 'js puns') {
        for(let i=0; i<colourOptions.length; i++) {
            // within each possible option, it loops through all the select options 
            //and compares them against the arrays of values for js puns and love js
            if(jsPunsArray.includes(colourOptions[i].value)) {
                // if the array contains the value for the select option, the select option is displayed.
                colourOptions[i].style = "display: block";
                // another comparison against the array is made to see if the dropdown value is not from the array
                // if it isn't, it is set to it. This means it should be set to the first value in the array
                if(!jsPunsArray.includes(colourDropDown.value)) {
                    colourDropDown.value = colourOptions[i].value;
                }
            } else {
                colourOptions[i].style = "display: none";
            }
        }
    } else if (scheme === 'heart js') {
        for(let i=0; i<colourOptions.length; i++) {
            if (loveJS.includes(colourOptions[i].value)) {
                colourOptions[i].style = "display: block";
                if(!loveJS.includes(colourDropDown.value)) {
                    colourDropDown.value = colourOptions[i].value;
                }
            } else {
                colourOptions[i].style = "display: none";
            }
        }
    } else {
        // calling this function again to reset the dropdown.
        noDesign();
    }
}

// Activties section

const activities = document.querySelectorAll('.activities label');

const activityField = document.querySelector('.activities');

// creating the running total and putting it into the web page
const bill = document.createElement('DIV');
bill.innerHTML = '<p>Total: $<span id="bill">0</span></p>';
activityField.appendChild(bill);

// this allows me to target the number
const dollar = document.querySelector('#bill');

let spend = 0;

// loop over all activities to add event listeners on each
for(let i=0; i< activities.length; i++) {
    // listening for a change
    activities[i].addEventListener('change', function() {
        //if the checkbox gets checked
        if(this.firstElementChild.checked == true) {
            // add the associated monetary value to the spend variable
            spend += parseInt(this.firstElementChild.getAttribute('data-cost'));
            // if not
        } else {
            //then take the value away
            spend -= parseInt(this.firstElementChild.getAttribute('data-cost'));
        }
        // update the web page with the updated value of spend.
        dollar.innerText = spend
        
        // now handle the clashing times
        // need the time and name of the event we are currently looping over
        let time = this.firstElementChild.getAttribute('data-day-and-time');
        let event = this.firstElementChild.getAttribute('name');

        // pass those in to my event clashing function, along with the two times we are concerned with.
        greyOutClashingEvents("Tuesday 9am-12pm", time, event);
        greyOutClashingEvents("Tuesday 1pm-4pm", time, event);        

    })
}



function greyOutClashingEvents(timeParam, time, event) {
    // time of our event must match the time we are concerned with
    if( time == timeParam) {
        // get all the events at this time - should be 2
        let events =  document.querySelectorAll(`[data-day-and-time="${timeParam}"]`);
        for( let i = 0; i < events.length; i++) {
            //if it's not the one we have from our outermost loop, saved in the event variable
             if(events[i].getAttribute('name') !== event) {
                 // then we want to grey it out, and disable it
                 // unless it already was grey and disabled, in which case do the opposite         
                if(events[i].disabled == true) {
                    events[i].removeAttribute("disabled");
                    events[i].parentElement.setAttribute('style', '');
                } else {
                    events[i].disabled = true;
                    events[i].parentElement.setAttribute('style', 'color: grey');
                }
             }
        }
    }
}

//Payment Info

// disable 'select payment type'
const selectMethod = document.querySelector('#payment').children[0];
selectMethod.disabled = true;
selectMethod.setAttribute('style', 'display:none');
paymentDropDown = document.querySelector('#payment');


// set up an array to hold the IDs for the three payment types
const paymentMethods = ['#credit-card', '#bitcoin', '#paypal'];

// create a function that accepts one payment type as a parameter
// and hides the other two methods.
function showPaymentMethod(method) {
    for(let i=0; i < paymentMethods.length; i++) {
        let paymentOption = document.querySelector(paymentMethods[i]);

        if (paymentMethods[i] === method) {
            paymentOption.style.display = "block"
        } else {
            paymentOption.style.display = "none"
        }
    }
}

// setting the default for when the user loads the form
showPaymentMethod('#credit-card')
paymentDropDown.value="credit card";

// Set up a listener on the payment dropdown
paymentDropDown.addEventListener('change', function() {
    // variety of options for the switch statement depending on which value is selected in the drop down
    switch(this.value) {
        case 'credit card':
            showPaymentMethod('#credit-card')
        break;
        case 'paypal':
            showPaymentMethod('#paypal')
        break;
        case 'bitcoin':
            showPaymentMethod('#bitcoin')
        break;
        default:
            showPaymentMethod('#credit-card')
    }
})


// Form validation



// submit listener

const submitButton = document.querySelector('[type="submit"]');
const form = document.querySelector('form');

//name variables
const nameInput = document.querySelector('#name');


//email variables
const emailInput = document.querySelector('#mail');

//credit card variables

const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

// validation event listener

form.addEventListener('submit', function(e) {
    
    // Name field not blank
    if(nameInput.value == '') {
        e.preventDefault();
        failUI(nameInput);    
    } else {
        succeedUI(nameInput)
    }
    
    // email
    if(!regExTester(emailInput.value, /[^@]+@[^@]+\.[a-z]+/ig)) {
        e.preventDefault();
        failUI(emailInput);
    }  else {
        succeedUI(emailInput)
    }

    // activities checklist
    if(!checklistValidate()) {
        e.preventDefault();
        failUI(activityField);
    } else {
        succeedUI(activityField);
    }

    // credit card validation
    
    // check if credit card is displayed
    if(document.querySelector('#credit-card').style.display !== "none") {
        // validate credit card number
        if(!regExTester(cardNumber.value, /^\d{13,16}$/)) {
            e.preventDefault();
            failUI(cardNumber);
        } else {
            succeedUI(cardNumber);
        }

        // validate zip code
        if(!regExTester(zipCode.value, /^\d{5}$/)) {
            e.preventDefault();
            failUI(zipCode);
        } else {
            succeedUI(zipCode);
        }

        //validate cvv
        if(!regExTester(cvv.value, /^\d{3}$/)) {
            e.preventDefault();
            failUI(cvv);
        } else {
            succeedUI(cvv);
        }
    
    }


})



// validation functions 

//this adds the Fail message and the red outline to whatever part of the form wasn't filled in
const failUI = (failure) => {
    let query = '.failure-message-'+failure.id;
    // check to ensure not already marked as failed
    if(!document.querySelector(query)) {
        let fail = document.createElement('P');
        fail.innerText = "Fail";
        //when a failure happens, log it as a class so can check and not add two fail messages
        fail.className = "failure-message-"+failure.id;
        failure.parentNode.insertBefore(fail, failure.nextSibling)
        failure.className = "failure-border";
    }

}

// this removes fail messages and red outlines if problems resolved.
const succeedUI = (success) => {
    // only want to remove fail messages if they are there,
    // otherwise throws an error.
    let query = '.failure-message-'+success.id;
    if(document.querySelector(query)) {
        success.className = "";
        let removeFail = document.querySelector(query)
        removeFail.remove(removeFail);
    }
}

//arrow functions above don't really make any difference to regular function calls here
//I'm just trying to familiarise myself with the syntax

function checklistValidate() {
    for(let i=0; i<activities.length; i++) {
        if(activities[i].firstElementChild.checked) {
            return true
        }
    }
    return false;
}

function regExTester(item, regEx) {
    return regEx.test(item)
}