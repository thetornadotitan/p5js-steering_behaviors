var myFont;
var fontPoints;
var myString;
var myFontSize;
var vehicles;

function preload(){
	myFont = loadFont('Chewy.ttf');
}

function setup(){
	//Create and custmize canvas
	createCanvas(windowWidth, windowHeight);

	//Set-up global variables
	myFontSize = 180;
	myString = "Interactivity!";
	vehicles = [];
	//Get an array of all the points needed to make up the current text
	fontPoints = myFont.textToPoints(myString, windowWidth / 2 - myFontSize * (myString.length / 5), windowHeight / 2, myFontSize);

	//Make a vehicle for every point in the text's points
	for(var i = 0; i < fontPoints.length; i++){
		//Variable to hold the current point
		var cPoint = fontPoints[i];
		//Give the vehicle the target to the text's points
		vehicles.push(new Vehicle(cPoint.x, cPoint.y));
	}
}

function draw(){
	//Nice little belnding here
	background(0, 25);
	//Go through the vehicles and...
	for(var i = 0; i < vehicles.length; i++){
		//Calc their forces based off of defined behavioral circumstances (see 'Arrive' and 'Flee' in sketch1Vehicle.js)
		vehicles[i].CalcForces();
		//Update their values based on the calc'd forces
		vehicles[i].Update();
		//Draw them to the screen
		vehicles[i].Render();
	}
}

//If the window is resized....
function windowResized() {
	//Update canvas size
  	resizeCanvas(windowWidth, windowHeight);

  	//update text points to be 'centered' on the screen
  	fontPoints = myFont.textToPoints(myString, windowWidth / 2 - myFontSize * (myString.length / 5), windowHeight / 2, myFontSize);
  	for(var i = 0; i < fontPoints.length; i++){
		var cPoint = fontPoints[i];
		vehicles[i].trg.set(cPoint.x, cPoint.y);
	}
}