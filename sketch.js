// Click and Drag an object

var dragging = false; // Is the object being dragged?
var rollover = false; // Is the mouse over the ellipse?

var x, y, r;          // Location and size
var offsetX, offsetY;    // Mouseclick offset
//arrays
let xArr = [];
let yArr = [];
let colorArr = [];

let normalizedAngle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  // Dimensions
  R = 105 * 2;          //radius of the outside circle
  r = 50 * 2;           //radius of the inside circle
  D = 2 * R;            //diameter of the outside circle
  d = 2 * r;            //diameter of the inside circle
  p = 60;               //distance of the pen

  l = p/r;
  k = r/R;


  counter = 0;          //how many times has the mouse angle reset
  crossedUp = false;    //has the mouse crossed from the bottom half to the upper half
  crossedDown = false;  //has the mouse crossed from the upper half to the bottom half

  mouseAngle = atan2(mouseY - height/2, mouseX - width/2);
  penAngle = -((R-r)/r)*mouseAngle;

  // Starting location
  x = (R-r) + windowWidth/2;
  y = windowHeight/2;
  xpen = x + p;
  ypen = windowHeight/2;

  

  direction = "";                  //which  direction is the mouse moving
  oldy = 0;
  oldx = 0;
}

function draw() {
  background(200);

  if (mouseY < oldy) {              //determine the direction
        direction = "up";
  } else if (mouseY > oldy) {
            direction = "down";
  }
  oldy = mouseY;


text(direction, 10, 90)
text(crossedUp, 10, 120)
text(crossedDown, 10, 150)
text(counter, 10, 180)
text(mouseY, 10, 210)
text(normalizedAngle, 10, 240)

  
    // Is mouse over object
    let m_dist = dist(mouseX, mouseY, x, y);
    if (m_dist < r) {
      rollover = true;
    } else {
      rollover = false;
    }

  

  stroke(0);
  
    //Different fill based on state
    if (dragging) {
      fill(150);
    } else if (rollover) {
      fill(175);
    } else {
      fill(175, 200);
    }
    
    ellipse(x, y, d);
    ellipse(xpen,ypen,10);
    noFill();
    ellipse (windowWidth/2, windowHeight/2, D);
    text (mouseAngle, 10, 30);
    text (penAngle, 10, 60)

  if (mouseIsPressed === true){
      xArr.push(xpen);
      yArr.push(ypen);
      colorArr.push(Math.random());
  }
  
  for (let i = 0; i<xArr.length; i++){
      strokeWeight(1);
      stroke( 255, 0, 0);
      line (xArr[i-1], yArr[i-1], xArr[i], yArr[i]);
      strokeWeight(1);

  }
}
 
function mouseMoved(){
 translate(width / 2, height / 2);
 mouseAngle =  atan2(mouseY - height/2, mouseX - width/2);
 //penAngle = TWO_PI * counter + (-((R-r)/r) * mouseAngle);
 //penAngle = TWO_PI * counter + mouseAngle;
}

function mouseDragged(){
  //COUNTER METHOD
if (mouseX < width / 2){
  if (direction == "up" && mouseY < windowHeight / 2 && crossedUp == false){
    counter++;
    crossedUp = true;
    crossedDown = false;
  }else if (direction == "down" && mouseY > windowHeight / 2 && crossedDown == false){
    counter--;
    crossedUp = false;
    crossedDown = true;
  }
}else{
  if (direction == "down" && mouseY < windowHeight / 2 && crossedDown == false){
     //counter--;
     crossedUp = false;
     crossedDown = true;
   }else if (direction == "up" && mouseY < windowHeight / 2 && crossedUp == false){
     //counter--;
     crossedUp = true;
     crossedDown = false;
   }
}
  let m_dist = dist(mouseX, mouseY, x, y);      //mouse distance from the inner circle
    if (m_dist < d/2) {                         //determines whether the mouse is hovering over
      dragging = true;
  }
  translate(width / 2, height / 2);

  mouseAngle =  atan2(mouseY - height/2, mouseX - width/2);
  //penAngle = -((R-r)/r)*mouseAngle;
  penAngle = TWO_PI * counter + mouseAngle;
  //penAngle = TWO_PI * counter + (-((R-r)/r) * mouseAngle);

  if(dragging){
  dragging = true;
  x = width / 2 + (R-r) * cos(mouseAngle);
  y = height / 2 + (R-r) * sin(mouseAngle);

 
  xpen = R * ((1 - k) * cos(penAngle) + (l * k * cos(((1-k) / k) * penAngle))) + (width) / 2
  ypen = R * ((1 - k) * sin(penAngle) - (l * k * sin(((1-k) / k) * penAngle))) + (height) / 2
  }
}

function mouseReleased() {
  // Quit dragging and rollover
  dragging = false;
  rollover = false;
}
