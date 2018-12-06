function Vehicle(x, y){
	this.pos = createVector(random(-8, windowWidth + 8), random(-8, windowHeight + 8));
	this.vel = createVector();
	this.acc = createVector();
	this.trg = createVector(x, y);
	this.c = color(random(25, 255), random(25, 255), random(25, 255));
	this.r = 8;
	this.maxSpeed = 10;
	this.maxForce = 0.3;

	//Create a vecotor to hold the mouse pos, we can update this rather than creating a new vector
	Vehicle.prototype.mouseVec = createVector(mouseX, mouseY);

	Vehicle.prototype.CalcForces = function(){
		//Get new mouse POS and apply it to an already created vector. Don't create vectors every frame!
		this.mouseVec.set(mouseX, mouseY)

		//Run force Calcs
		var arrive = this.Arrive();
		var flee = this.Flee(this.mouseVec);

		//Weigh forces for desired behavior
		arrive.mult(1);
		flee.mult(10);

		//Apply weighted forces
		this.ApplyForce(arrive);
		this.ApplyForce(flee);

	}

	//Update the acc with a given force
	Vehicle.prototype.ApplyForce = function(f){
		this.acc.add(f);
	}

	//Seek to rest at a particular target, slow down when close, and stop when arrived
	Vehicle.prototype.Arrive = function(){
		//What vector will get us to our desired location?
		var desired = p5.Vector.sub(this.trg, this.pos);
		//How far away is our desired pos?
		var d = desired.mag();
		//Variable to hold calc'd speed
		var speed;
		//Slow down within a certain distance
		if(d < 100){
			//The closer we are the slower we go...
			speed = map(d, 0, 100, 0, this.maxSpeed);
		}else{
			//Outside of a particular distinace just go as fast as you can
			speed = this.maxSpeed;
		}
		//Set the mag of our vector to as long as it can be given the circumstance
		desired.setMag(speed);
		//How should we steer ourselves to get where we want to go?
		var steer = p5.Vector.sub(desired, this.vel);
		//We can only steer so well.
		steer.limit(this.maxForce);
		//Return our calc steering
		return steer;
	}

	//Run away from a particular vector
	Vehicle.prototype.Flee = function(from){
		//What vector is between us and our predator?
		var desired = p5.Vector.sub(from, this.pos);
		//How far away is our predator?
		var d = desired.mag();
		//if our predator is close, run.
		if(d < 50){
			//Run as fast as you can
			desired.setMag(this.maxSpeed);
			//In the oppsoite director of the predator
			desired.mult(-1);
			//Calc how to run
			var steer = p5.Vector.sub(desired, this.vel);
			//We can only run so well
			steer.limit(this.maxForce);
			//Return out flee path
			return steer;
		}else{
			//Predator is far away, chill
			desired.mult(0);
			//Return chillness
			return desired;
		}
	}

	//Update the physics with all currently calculated forces
	Vehicle.prototype.Update = function(){
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	//Update the screen based on position and any instaced custumization
	Vehicle.prototype.Render = function(){
		push();
		stroke(this.c);
		fill(this.c);
		strokeWeight(this.r);
		point(this.pos.x, this.pos.y);
		pop();
	}
}