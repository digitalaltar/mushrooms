//---------------------------
// Variables
//---------------------------
let objects = []; // Store {x, y, size} of both rocks and mushrooms
let bees = []; // Array to store bees positions
let fireflies = []; // Array to store firefly positions
let numFireflies = 10; // Number of fireflies
let currentGradient = 0; // 3 Gradients

//---------------------------
// Set Up
//---------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  currentGradient = floor(random(3));
  drawStaticElements(); // Draw static elements only once

  for (let i = 0; i < numFireflies; i++) {
    fireflies.push(new Firefly());
  }
}

//---------------------------
// Main Draw Function
//---------------------------
function draw() {
  animate(); // Animate moving elements
}

//---------------------------
// Main Animate Function
//---------------------------
function animate() {
  if (currentGradient === 0) {
  } else if (currentGradient === 1) {
  } else if (currentGradient === 2) {
  }
}

//---------------------------
// Draw Various Things
//---------------------------
// Draw Static Elements
function drawStaticElements() {
  background(255);
  currentGradient = floor(random(3));
  drawBackground(currentGradient);
  drawRocks(20);
  for (let i = 0; i < 20; i++) {
    placeMushroom();
  }

  if (currentGradient === 0) {
    drawBees();
  } else if (currentGradient === 1) {
    placeCaterpillar();
  } else if (currentGradient === 2) {
    drawFireflies();
  }
}

// Draw the Background
function drawBackground(gradientIndex) {
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c;
    if (gradientIndex === 0) {
      c = lerpColor(color(112, 249, 255), color(0, 190, 65), inter);
    } else if (gradientIndex === 1) {
      c = lerpColor(color(255, 220, 70), color(92, 190, 0), inter);
    } else if (gradientIndex === 2) {
      c = lerpColor(color(40, 60, 85), color(0, 57, 36), inter);
    }
    stroke(c);
    line(0, i, width, i);
  }
}

// Draw the Caterpillar
function drawCaterpillar(x, y) {
    let segments = 7; // Number of body segments
    let segmentSize = 20; // Size of each segment
    let caterpillarColor = color(20, 120, 20); // A subdued green for the body

    // Draw the body segments
    for (let i = 0; i < segments; i++) {
        let segmentX = x + (i - segments / 2) * segmentSize * 0.6;
        let segmentY = y + sin(i * PI / 3) * 5; // Add undulation to the body

        fill(caterpillarColor);
        noStroke();
        ellipse(segmentX, segmentY, segmentSize, segmentSize); // Body segments

        // Shading for 3D effect on segments
        fill(0, 0, 0, 20); // Semi-transparent black for shadow
        ellipse(segmentX - segmentSize / 4, segmentY, segmentSize / 1.5, segmentSize / 1.5);

        // Draw one spot on each segment
        drawSpotOnSegment(segmentX, segmentY, segmentSize);
    }

    // Simplified head without facial features for realism
    let headX = x + (-(segments / 2) * segmentSize * 0.6);
    fill(caterpillarColor);
    ellipse(headX, y, segmentSize, segmentSize); // Head

    // Simple antennae
    stroke(20, 120, 20);
    strokeWeight(2);
    noFill();
    arc(headX, y - segmentSize / 2, segmentSize / 2, segmentSize / 2, PI - QUARTER_PI, PI + QUARTER_PI);
}

// Draw Caterpillar's spots
function drawSpotOnSegment(x, y, size) {
  let spotSize = 6; // Size of the spot

    fill(255, 204, 0); // Bright color for the spot
    noStroke();
    ellipse(x - 2, y - 3, spotSize, spotSize);
}

// Draw Bees
function drawBees() {
  for (let i = 0; i < 10; i++) {
    let beeX = random(100, width - 100);
    let beeY = random(100, height - 100);
    drawBee(beeX, beeY);
  }
}

// Draw a Bee
function drawBee(x, y) {
    // Random angle within a limited range for a slight tilt
    // Here, limiting the angle to +/- 15 degrees (converted to radians)
    let angle = random(-PI / 12, PI / 12); // PI / 12 radians is equivalent to 15 degrees

    push(); // Start a new drawing state
    translate(x, y); // Move to the position where the bee should be drawn
    rotate(angle); // Rotate the drawing canvas by the random angle

    // Body of the bee
    fill(255, 200, 0); // Yellow color for the body
    ellipse(x, y, 30, 15); // Oval shape for the bee's body

    // Bee's stripes
    fill(0); // Black color for the stripes
    rect(x + 3, y - 8, 4, 15, 2); // stripe
    rect(x - 4, y - 8, 4, 15, 2); //
    rect(x - 11, y - 7, 4, 13, 2); // 

    // Wings
    fill(255, 255, 255, 150); // Semi-transparent white for the wings
    ellipse(x - 8, y - 12, 30, 15); // Left wing
    ellipse(x, y - 12, 30, 15); // Right wing

    pop(); // Restores the previous drawing state
}

// Draw Fireflies
function drawFireflies() {
  for (let i = 0; i < 10; i++) {
    let fireflyX = random(100, width - 100);
    let fireflyY = random(100, height - 100);
    drawFirefly(fireflyX, fireflyY);
  }
}

// Draw a Firefly
function drawFirefly(x, y) {
  let bodyColor = color(255, 255, 0, 100); // Translucent yellow color for the firefly's body
  let lightColor = color(255, 255, 0, 50); // Translucent yellow for the light
  let glowColor = color(255, 255, 0, 20); // Very translucent yellow for glow

  // Draw firefly's body
  fill(bodyColor);
  ellipse(x, y, 10, 5);

  // Draw firefly's light with a glowing effect
  for (let i = 0; i < 10; i++) {
    let glowSize = random(20, 30); // Random size for the glow
    let glowX = random(-5, 5); // Random position within a range
    let glowY = random(-5, 5); // Random position within a range
    fill(glowColor);
    ellipse(x + glowX, y + glowY, glowSize, glowSize);
  }

  // Draw the core light
  fill(lightColor);
  ellipse(x + 5, y - 2, 10, 10);
}

// Draw Rocks
function drawRocks(amount) {
  for (let i = 0; i < amount; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(10, 25);
    
    // Only add rock if it doesn't overlap with existing objects
    if (!isTooClose(x, y, size)) {
      fill(125, 125, 125, 200);
      noStroke();
      ellipse(x, y, size, size * random(0.5, 0.8));
      objects.push({x, y, size});
    }
  }
}

// Draw Mushroom
function drawMushroom(x, y) {
  let stemHeight = random(30, 80);
  let capWidth = random(30, 100);
  let capHeight = random(30, 60);

  // Grass around the stem base
  for (let i = -10; i <= 20; i += 3) {
    let grassX = x + i;
    let grassHeight = random(5, 15);
    let grassWidth = random(1, 2);
    drawGrass(grassX, y + stemHeight, grassHeight, grassWidth);
  }

    drawDirt(x + 5, y + stemHeight, 5);

  // Stem
  fill(204, 102, 0, 150);
  noStroke();
  rect(x, y, 10, stemHeight);

  // Gills
  drawGills(x + 5, y - 5, capWidth / 1.2, stemHeight / 10);

  // Soft Cap with Blended Edges
  let capBaseColor = color(random(100, 255), 0, 0, 150);
  for (let i = 0; i < 5; i++) {
    let thisCapColor = lerpColor(color(255, 100, 100, 50), capBaseColor, i * 0.2);
    fill(thisCapColor);
    noStroke();
    arc(x + 5, y, capWidth * (1 + i * 0.1), capHeight * (1 + i * 0.1), PI, 0, OPEN);
  }

    // Draw spots on cap
  drawSpots(x + 5, y, capWidth, capHeight);
}

// Draw Spots on Mushroom Caps
function drawSpots(x, y, capWidth, capHeight) {
  let spots = []; // Store {x, y, size} of spots for current mushroom
  let spotCount = int(random(5, 15)); // Random number of spots

  for (let i = 0; i < spotCount; i++) {
    let attempts = 0;
    while (attempts < 50) { // Limit attempts to avoid infinite loop
      let spotX = random(x - capWidth / 2, x + capWidth / 2);
      let spotY = random(y - capHeight / 2, y);
      let spotSize = random(2, 7); // Random spot size

      if (!isSpotTooClose(spots, spotX, spotY, spotSize)) {
        fill(255, 255, 255, 200); // White spots
        noStroke();
        ellipse(spotX, spotY, spotSize, spotSize);
        spots.push({x: spotX, y: spotY, size: spotSize}); // Add spot to array
        break; // Exit loop after successful placement
      }
      attempts++;
    }
  }
}

// Draw Mushroom Gills
function drawGills(centerX, startY, capWidth, gillLength) {
  let gillSpacing = 4; // Space between each gill line
  let gillCount = capWidth / gillSpacing;
  stroke(120, 60, 0, 100);
  strokeWeight(2);

  for (let i = 0; i < gillCount; i++) {
    let xOffset = i * gillSpacing - capWidth / 2;
    let gillStartX = centerX + xOffset;
    let gillEndX = centerX + xOffset * 0.8; // Adjust for slight angle
    let gillEndY = startY + gillLength;
    line(gillStartX, startY, gillEndX, gillEndY);
  }
}

// Draw Grass around Mushroom Stems
function drawGrass(x, baseY, height, width) {
  push(); // Save the current drawing style settings and transformations
  strokeWeight(width);
  stroke(34, 139, 34, 100); // Semi-transparent green color for a subtle look
  noFill();
  // Drawing a simple line for now, can be adjusted for more complexity
  line(x, baseY, x, baseY - height);
  pop(); // Restore the original drawing style settings and transformations
}

// Draw Dirt around Mushroom Stems
function drawDirt(x, y, amount) {
  for (let i = 0; i < amount; i++) {
    // Position each rock near the base of a mushroom
    let dirtX = x + random(-20, 20);
    let dirtY = y + random(0, 10);
    let dirtWidth = random(3, 7);
    let dirtHeight = dirtWidth * random(0.5, 1);

    fill(123, 85, 77, 150);
    noStroke();
    ellipse(dirtX, dirtY, dirtWidth, dirtHeight);
  }
}

//---------------------------
// Animate Various Things
//---------------------------


//---------------------------
// Place Various Things
//---------------------------
// Check if Too Close
function isTooClose(x, y, size) {
  for (let obj of objects) {
    let d = dist(x, y, obj.x, obj.y);
    if (d < (obj.size / 2 + size / 2 + 20)) {
      return true; // Too close to another object
    }
  }
  return false; // Not too close to any other objects
}

// Check if Mushroom Spots are Too Close
function isSpotTooClose(spots, x, y, size) {
  for (let spot of spots) {
    let d = dist(x, y, spot.x, spot.y);
    if (d < (spot.size / 2 + size / 2)) { // If distance is less than sum of radii, they overlap
      return true;
    }
  }
  return false;
}

// Place Mushroom
function placeMushroom() {
    let attempts = 0;
    let buffer = 60; //
    while (attempts < 100) { // Limit attempts to prevent infinite loops
        let x = random(width);
        let y = random(height);
        let size = max(random(30, 100), random(30, 60));

        // Check both for closeness to other objects
        if (!isTooClose(x, y, size)) {
            drawMushroom(x, y);
            objects.push({x, y, size});
            break; // Successfully placed the mushroom, exit the loop
        }
        attempts++;
    }
}

// Place Caterpillar
function placeCaterpillar() {
    let attempts = 0;
    while (attempts < 100) { // Limit attempts to prevent infinite loops
        let x = random(width);
        let y = random(height);
        // Define caterpillar dimensions roughly, considering its length and assuming a fixed height
        let caterpillarLength = 7 * 20 * 0.6; // Length based on your drawing logic
        let caterpillarHeight = 20; // An assumed height for simplicity

        if (!isTooClose(x, y, caterpillarLength)) {
            drawCaterpillar(x, y);
            // Add the caterpillar's position and size to the objects array to keep track
            objects.push({x, y, size: caterpillarLength}); 
            break; // Successfully placed the caterpillar, exit the loop
        }
        attempts++;
    }
}

//---------------------------
// Classes
//---------------------------
// Updated Firefly class for smoother movement
class Firefly {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(0.5, 2)); // Random speed
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.position.add(this.velocity);

    // Optional: Add some acceleration or change in velocity for more dynamic movement
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(random(0.1)); // Small acceleration
    this.velocity.add(this.acceleration);
    this.velocity.limit(2); // Limit speed

    // Wraparound logic to keep fireflies within the canvas
    if (this.position.x > width) { this.position.x = 0; }
    if (this.position.x < 0) { this.position.x = width; }
    if (this.position.y > height) { this.position.y = 0; }
    if (this.position.y < 0) { this.position.y = height; }
  }

  display() {
    // Your existing display logic for drawing the firefly
    fill(255, 255, 0, 150); // Yellow with some transparency
    noStroke();
    ellipse(this.position.x, this.position.y, 8, 8);
  }
}
