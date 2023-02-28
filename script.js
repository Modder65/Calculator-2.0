let equationArray = []; //array that houses the equation thats displayed to the screen of the calculator
let replaceResults = true; //variable that tracks whether or not the values displayed on the calulator screen have been cleared
let finalResults; //variable that stores the final result of an evaluated equation

function calcClick(event) {
	if (event.target.getAttribute('data-num')) { //checks if the user clicked a number button
		if ( replaceResults == true ) { //checks if replaceResults is equal to true, which it is at the start because its already assigned that value before the calcClick function is defined
			replaceResults = false;     //whenever a number button is clicked check if replaceResults is equal to true, and if it is, set it equal to false
			if ( equationArray.length < 2 ) { //if the equation has no operator and no (or 1) number
				equationArray = [];           //empty the equation
				if ( event.target.getAttribute('data-num') == "." ) { //if the user clicks the decimal button while there is no prior equation
					equationArray[0] = "0"+event.target.getAttribute('data-num'); //set the first value of the equation to 0 with a decimal point
				} else {
					equationArray[0] = event.target.getAttribute('data-num'); //if the user clicks any other number button except the decimal button while the equation is empty
				}                                                             //set the first value of the equation to the value of the clicked number button
			} else {
				if ( event.target.getAttribute('data-num') == "." ) { //if the equation already has a number and operator, and the user clicks the decimal button
					equationArray[2] = "0"+event.target.getAttribute('data-num'); //set the second number value in the equation to 0 with a decimal point
				} else {
					equationArray[2] = event.target.getAttribute('data-num'); //if the user clicks any other number button except the decimal button while the equation already has a number and operator
				}                                                             //set the second number value in the eqation to the clicked buttons number value
			}

		} else { //if ReplaceResults is not equal to true when a number button is clicked
			if ( equationArray.length < 2 ) { //check if the equation has no operator and no (or 1) number. If true then
				if ( equationArray.length == 0 ) { //check if there is no equation being currently displayed. If true then
					if ( event.target.getAttribute('data-num') == "." ) { //check if the decimal button is being clicked. If true then
						equationArray[0] = "0"+event.target.getAttribute('data-num'); //set the first number value of the eqation equal to 0 with a decimal point
					} else { //if the user clicks any other number button besides the decimal button while there is no current equation,
						equationArray[0] = event.target.getAttribute('data-num'); //set the first number value of the equation to the value of whichever number button was clicked by the user
					}
				} else { //if the equation doesnt contain an operator but already contains a number value,
					if ( equationArray[0].toString().includes(".") && event.target.getAttribute('data-num') == ".") { //check if the user clicked the decimal button while the first number value in the equation already includes a decimal
						console.log("This is already a decimal."); //if the above conditional statement is true, log the message "This is already a decimal." to the console
					} else { //if the first value of the equation doesn't include a decimal point and the user clicks any other number button besides the decimal button
						equationArray[0] = equationArray[0] + event.target.getAttribute('data-num'); //set the first number value of the equation equal to itself plus the value of whichever number button the user clicked
					}                                                                                //(this creates a 2 digit number with string concatenation, it does NOT add the 2 values together)
				} 
			} else if ( equationArray.length > 1 ) { //checks if the equation has more than 1 value. If true, 
				if ( equationArray.length == 2 ) {   //check if the equation has a number and an operator specifically. If true,
					if ( event.target.getAttribute('data-num') == "." ) { //checks if the user clicks the decimal button while the above 2 conditional statemenets are true. If true,
						equationArray[2] = "0"+event.target.getAttribute('data-num'); //set the second number value in the equation to 0 with a decimal point
					} else { //if the user clicks any other number button except the decimal button, 
						equationArray[2] = event.target.getAttribute('data-num'); //set the second number value in the equation equal to the value of whichever number button was clicked by the user
					}
				} else { //if the equation doesnt include a number and operator specifically,
					if ( equationArray[2].toString().includes(".") && event.target.getAttribute('data-num') == ".") { //check if the user clicked the decimal button while the second number value in the equation already includes a decimal
						console.log("This is already a decimal."); //if the above conditional statement is true, log the message "This is already a decimal." to the console
					} else { ////if the second value of the equation doesn't include a decimal point and the user clicks any other number button besides the decimal button
						equationArray[2] = equationArray[2] + event.target.getAttribute('data-num'); //set the second number value of the equation equal to itself plus the value of whichever number button the user clicked
					}                                                                                //(this creates a 2 digit number with string concatenation, it does NOT add the 2 values together)
				}
			}
		}
		//console.log(event.target.getAttribute('data-num'));
		console.log(equationArray); //logs the equation to the console in the form of an array
		
		
	} else if (event.target.getAttribute('data-operator')) { //check if the user clicks an operator button 
		replaceResults = false; //whenever an operator button is clicked by the user set the value of replaceResults to false (replaceResults = false means that the equation has not been cleared)
		if ( event.target.getAttribute('data-operator') == "clear" ) { //check if the user clicks the clear button. If true, 
			replaceResults = true; //set replaceResults equal to true (replaceResullts = true means that the equation has been cleared)
			equationArray = []; //clear the entire equation
			console.log(equationArray); //log the empty equation to the console in array form
		} else if ( event.target.getAttribute('data-operator') == "=" ) { //if the above conditional statement is false, check if the user clicked the equals button. If true, 
			if ( equationArray.length < 3 ) { //check if the equation doesn't include a second number value. If true, 
				console.log("Not ready to calcuate, please enter a proper equation."); //log the message "Not ready to calculate, please enter a proper equation." to the console
			} else { //if the equation does include a second number value while the equals button is clicked by the user,
				calculateResults( event.target.getAttribute('data-operator') ); //call the calculateResults function, passing the value of the operator button clicked as an argument
			}                                                                   //this function decides how to correctly evaluate the equation based on the operator value that was passed to it as an argument and returns the result
		} else { //if the user clicks any operator button except the clear or equals buttons, 
			if ( equationArray.length <= 2 ) { //check if the equation includes a number and an operator, just a first number value, or nothing at all. If true, 
				if ( equationArray.length == 0 ) { //check if the equation is empty. If true, 
					console.log("Please enter a number first, then an operator."); //log the message "Please enter a number first, then an operator." to the console
				} else { //if the equation includes a number and an operator or just a first number value, but is not empty, 
					equationArray[1] = event.target.getAttribute('data-operator');	//set the first operator value of the equation to the value of whichever operator button the user clicked
				}
				console.log(equationArray); //if the equation is empty, log the equation to the console in the form of an array
			} else { //if the equation contains a second number value
				calculateResults( event.target.getAttribute('data-operator') ); //call the calculateResults function, passing the value of the operator button clicked as an argument
			}                                                                   //this function decides how to correctly evaluate the equation based on the operator value that was passed to it as an argument and returns the result
		}
		// console.log(event.target.getAttribute('data-operator'));
		
	} else if (event.target.getAttribute('data-negative')) { //check if the user clicks the negative conversion button
		replaceResults = true; //set replaceResults equal to true (replaceResullts = true means that the equation has been cleared)
		if ( equationArray.length == 0 ) { //check if the equation is empty. If true, 
			console.log("Please select a number."); //log the message "Please select a number." to the console
		} else if ( equationArray.length < 3 ) { //check if the equation doesnt include a second number value. If true, 
			equationArray[0] = equationArray[0]*(-1); //set the first number value of the equation equal to itself multiplied by negative 1(this makes the first value negative)
		} else { //if the equation already includes a second number value,
			equationArray[2] = equationArray[2]*(-1); //set the secsond number value in the equation equal to itself multiplied by negative 1(this makes the second value negative)
		}
		console.log(equationArray);//when the user clicks the negative button, log the current equation to the console in the form of an array
	} else if (event.target.getAttribute('data-percent')) { //checks if the user clicks the percent conversion button. If true, 
		replaceResults = true; //set replaceResults equal to true (replaceResullts = true means that the equation has been cleared)
		if ( equationArray.length == 0 ) { //check if the equation is empty. If true, 
			console.log("Please select a number."); //log the message "Please select a number." to the console
		} else if ( equationArray.length < 3 ) { //check if the equation doesnt include a second number value. If true, 
			equationArray[0] = parseFloat(equationArray[0]/100); // .toFixed(2); //set the first number value of the equation equal to its percentage in decimal form (ie if the first value is 50 when the percent button is clicked, it returns 0.50)
		} else { //if the equation includes a second number value,
			equationArray[2] = parseFloat(equationArray[2]/100); // .toFixed(2); //set the second number value of the equation equal to its percentage in decimal form 
		}
		console.log(equationArray); //when the user clicks the percent button, log the current equation to the console in the form of an array
	}
	updateCalculatorDisplay(); //when any button on the calculator is clicked, call the updateCalculatorDisplay() function. (This function controls the values that are displayed to the on-screen caluclator)
}

function calculateResults( operator ) { //this function decides how to correctly evaluate the equation based on the operator value that was passed to it as an argument and returns the result
	finalResults = eval( "(" + parseFloat(equationArray[0])+ ")" + equationArray[1] + "(" + parseFloat(equationArray[2]) + ")" ); //evaluates the entire quation and stores the result in the finalResults variable
	if ( operator == "=" ) { //if this function recieves the equals button value as an argument, 
		replaceResults = true; //set replaceResults equal to true (replaceResullts = true means that the equation has been cleared)
		equationArray = []; //clears the equation
		if ( finalResults.toString().includes(".") ) { //if the final result of the evaluated equation includes a decimal point, 
			equationArray[0] = parseFloat(finalResults).toFixed(2); //set the first number value of the equation equal to the result of the final evaluated equation with a precision of 2 decimal places
		} else { //if the final result of the evaluated equation does not include a decimal point,
			equationArray[0] = finalResults; //set the first number value of the equation equal to the result of the final evaluated equation 
		}
	} else { //if this function recieves any operator as an argument except the equals button, 
		replaceResults = true; //set replaceResults equal to true (replaceResullts = true means that the equation has been cleared)
		equationArray = []; //clears the equation
		if ( finalResults.toString().includes(".") ) { //checks if the final result of the evaluated equation includes a decimal. If true, 
			equationArray[0] = parseFloat(finalResults).toFixed(2); //set the first number value of the equation equal to the result of the final evaluated equation with a precision of 2 decimal places
		} else { //if the result of the final evaluated equation does not include a decimal 
			equationArray[0] = finalResults; //set the first number value of the equation equal to the result of the final evaluated equation
		}
		equationArray[1] = operator; //if this function recieves any operator as an argument except the equals button, 
	}                                //set the operator value in the equation equal to whichever operator button the user clicked 
	updateCalculatorDisplay(); //whenever the calulateResults function is called, call the updateCalculatorDisplay function after interpreting the above conditional statements
}

function updateCalculatorDisplay() { //This function controls the values that are displayed to the on-screen caluclator
	document.getElementById('previousText').textContent = ""; //accesses the textContent of the previousText class in the html file
	for (let i = 0; i < equationArray.length; i++) { //for loop that iterates through the equation array 
		document.getElementById('previousText').textContent += equationArray[i] + " "; //goes through the equation array and appends each indexes value with a space to the textContent of the previousText class in the html
	}
	if ( equationArray.length == 0 ) { //checks if the equation is empty. If true, 
		document.getElementById('outputText').textContent = "0"; //sets the textContent of the outputText classin the html to 0
	} else if ( equationArray.length <= 2 ) { //checks if the equation has a number and an operator or just a first number value with no operator. If true, 
		document.getElementById('outputText').textContent = equationArray[0]; //sets the textContent of the outputText class equal to the first number value in the equation
	} else { //if the equation already has 2 number values and an operator,
		document.getElementById('outputText').textContent = equationArray[2]; //sets the textContent of the outputText class equal to the second number value in the equation 
	}
}