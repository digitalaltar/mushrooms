//---------------------------
// Variables
//---------------------------
let objects = []; // Store {x, y, size} of both rocks and mushrooms
let bees = []; // Array to store bees positions
let fireflies = []; // Array to store firefly positions
let numFireflies = 10; // Number of fireflies
let currentGradient = 0; // 3 Gradients
let staticCanvas; // For static elements like background, mushrooms, rocks
let dynamicCanvas; // For dynamic elements like fireflies

//---------------------------
// Set Up
//---------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  staticCanvas = createGraphics(width, height);
  dynamicCanvas = createGraphics(width, height);

  let seed = floor(random(10000));
  randomSeed(seed);
  drawStaticElements(staticCanvas); // Draws once on staticCanvas

  // Populate bees and fireflies arrays with initial positions
  for (let i = 0; i < 10; i++) {
    bees.push({ x: random(100, width - 100), y: random(100, height - 100) });
    fireflies.push({ x: random(100, width - 100), y: random(100, height - 100) });
  }
}

//---------------------------
// Main Draw Function
//---------------------------
function draw() {
  clear(dynamicCanvas);
  image(staticCanvas, 0, 0); // Draw static elements
  image(dynamicCanvas, 0, 0); // Overlay dynamic elements without clearing static background

  animate(dynamicCanvas);
}


//---------------------------
// Main Animate Function
//---------------------------
function animate(canvas) {
  if (currentGradient === 0) {
    animateBees(canvas);
  } else if (currentGradient === 2) {
    animateFireflies(canvas); // Pass dynamicCanvas as an argument
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
  } else if (currentGradient === 1) {
    placeCaterpillar();
  } else if (currentGradient === 2) {
  }
}

// Draw the Background
function drawBackground(gradientIndex) {
  for (let i = 0; i < staticCanvas.height; i++) {
    let inter = map(i, 0, staticCanvas.height, 0, 1);
    let c;
    if (gradientIndex === 0) {
      c = lerpColor(staticCanvas.color(112, 249, 255), staticCanvas.color(0, 190, 65), inter);
    } else if (gradientIndex === 1) {
      c = lerpColor(staticCanvas.color(255, 220, 70), staticCanvas.color(92, 190, 0), inter);
    } else if (gradientIndex === 2) {
      c = lerpColor(staticCanvas.color(40, 60, 85), staticCanvas.color(0, 57, 36), inter);
    }
    staticCanvas.stroke(c);
    staticCanvas.line(0, i, staticCanvas.width, i);
  }
}

// Draw the Caterpillar
function drawCaterpillar(x, y) {
  let segments = 7; // Number of body segments
  let segmentSize = 20; // Size of each segment
  let caterpillarColor = staticCanvas.color(20, 120, 20); // A subdued green for the body

  // Draw the body segments
  for (let i = 0; i < segments; i++) {
    let segmentX = x + (i - segments / 2) * segmentSize * 0.6;
    let segmentY = y + sin(i * PI / 3) * 5; // Add undulation to the body

    staticCanvas.fill(caterpillarColor);
    staticCanvas.noStroke();
    staticCanvas.ellipse(segmentX, segmentY, segmentSize, segmentSize); // Body segments

    // Shading for 3D effect on segments
    staticCanvas.fill(0, 0, 0, 20); // Semi-transparent black for shadow
    staticCanvas.ellipse(segmentX - segmentSize / 4, segmentY, segmentSize / 1.5, segmentSize / 1.5);

    // Draw one spot on each segment
    drawSpotOnSegment(segmentX, segmentY, segmentSize);
  }

  // Simplified head without facial features for realism
  let headX = x + (-(segments / 2) * segmentSize * 0.6);
  staticCanvas.fill(caterpillarColor);
  staticCanvas.ellipse(headX, y, segmentSize, segmentSize); // Head

  // Simple antennae
  staticCanvas.stroke(20, 120, 20);
  staticCanvas.strokeWeight(2);
  staticCanvas.noFill();
  staticCanvas.arc(headX, y - segmentSize / 2, segmentSize / 2, segmentSize / 2, PI - QUARTER_PI, PI + QUARTER_PI);
}

// Draw Caterpillar's spots
function drawSpotOnSegment(x, y, size) {
  let spotSize = 6; // Size of the spot

  staticCanvas.fill(255, 204, 0); // Bright color for the spot
  staticCanvas.noStroke();
  staticCanvas.ellipse(x - 2, y - 3, spotSize, spotSize);
}

// Draw Bees dynamically
function drawBees() {
  for (let i = 0; i < 10; i++) {
    let beeX = random(100, width - 100);
    let beeY = random(100, height - 100);
    drawBee(beeX, beeY, dynamicCanvas); // Pass dynamicCanvas as an argument
  }
}

// Adjusted Draw a Bee function to accept canvas as parameter
function drawBee(x, y, canvas) {
  // Random angle for a slight tilt
  let angle = random(-PI / 12, PI / 12); // +/- 15 degrees

  canvas.push(); // Isolate transformations
  canvas.translate(x, y);
  canvas.rotate(angle);

  // Body of the bee
  canvas.fill(255, 200, 0); // Yellow
  canvas.noStroke();
  canvas.ellipse(0, 0, 30, 15); // Adjusted position due to translate
  canvas.noStroke();

  // Bee's stripes
  canvas.fill(0); // Black
  canvas.noStroke();
  canvas.rect(3, -8, 4, 15, 2);
  canvas.rect(-4, -8, 4, 15, 2);
  canvas.rect(-11, -7, 4, 13, 2);
  canvas.noStroke();

  // Wings
  canvas.fill(255, 255, 255, 150); // Semi-transparent white
  canvas.ellipse(-8, -12, 30, 15); // Left wing
  canvas.ellipse(0, -12, 30, 15); // Right wing
  canvas.noStroke();

  canvas.pop(); // Reset transformation state
}

// Draw Fireflies dynamically
function drawFireflies() {
  for (let i = 0; i < 10; i++) {
    let fireflyX = random(100, width - 100);
    let fireflyY = random(100, height - 100);
    drawFirefly(fireflyX, fireflyY, dynamicCanvas); // Pass dynamicCanvas as an argument
  }
}

// Adjusted Draw a Firefly function to accept canvas as parameter
function drawFirefly(x, y, canvas) {
  let bodyColor = canvas.color(255, 255, 0, 100); // Translucent yellow for the body
  let lightColor = canvas.color(255, 255, 0, 50); // Translucent yellow for the light
  let glowColor = canvas.color(255, 255, 0, 20); // Very translucent yellow for glow

  // Draw firefly's body
  canvas.fill(bodyColor);
  canvas.noStroke();
  canvas.ellipse(x, y, 10, 5);
  canvas.noStroke();

  // Draw firefly's light with a glowing effect
  for (let i = 0; i < 10; i++) {
    let glowSize = random(20, 30); // Random size for the glow
    let glowX = random(-5, 5); // Random position within a range
    let glowY = random(-5, 5); // Random position within a range
    canvas.fill(glowColor);
    canvas.noStroke();
    canvas.ellipse(x + glowX, y + glowY, glowSize, glowSize);
    canvas.noStroke();
  }

  // Draw the core light
  canvas.fill(lightColor);
  canvas.noStroke();
  canvas.ellipse(x + 5, y - 2, 10, 10);
  canvas.noStroke();
}

// Draw Rocks
function drawRocks(amount) {
  for (let i = 0; i < amount; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(10, 25);
    
    // Only add rock if it doesn't overlap with existing objects
    if (!isTooClose(x, y, size)) {
      staticCanvas.fill(125, 125, 125, 200); // Specify color on staticCanvas
      staticCanvas.noStroke(); // No border on staticCanvas
      staticCanvas.ellipse(x, y, size, size * random(0.5, 0.8)); // Draw ellipse on staticCanvas
      objects.push({x, y, size}); // Store object information for collision detection or other logic
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
    drawGrass(grassX, y + stemHeight, grassHeight, grassWidth, staticCanvas);
  }

    drawDirt(x + 5, y + stemHeight, 5, staticCanvas);

  // Stem
  staticCanvas.fill(204, 102, 0, 150);
  staticCanvas.noStroke();
  staticCanvas.rect(x, y, 10, stemHeight);

  // Gills
  drawGills(x + 5, y - 5, capWidth / 1.2, stemHeight / 10, staticCanvas);

  // Soft Cap with Blended Edges
  let capBaseColor = staticCanvas.color(random(100, 255), 0, 0, 150);
  for (let i = 0; i < 5; i++) {
    let thisCapColor = lerpColor(staticCanvas.color(255, 100, 100, 50), capBaseColor, i * 0.2);
    staticCanvas.fill(thisCapColor);
    staticCanvas.noStroke();
    staticCanvas.arc(x + 5, y, capWidth * (1 + i * 0.1), capHeight * (1 + i * 0.1), PI, 0, OPEN);
  }

    // Draw spots on cap
  drawSpots(x + 5, y, capWidth, capHeight, staticCanvas);
}

// Draw Spots on Mushroom Caps
function drawSpots(x, y, capWidth, capHeight, canvas) {
  let spots = []; // Store {x, y, size} of spots for current mushroom
  let spotCount = int(random(5, 15)); // Random number of spots

  for (let i = 0; i < spotCount; i++) {
    let attempts = 0;
    while (attempts < 50) { // Limit attempts to avoid infinite loop
      let spotX = random(x - capWidth / 2, x + capWidth / 2);
      let spotY = random(y - capHeight / 2, y);
      let spotSize = random(2, 7); // Random spot size

      if (!isSpotTooClose(spots, spotX, spotY, spotSize)) {
        canvas.fill(255, 255, 255, 200); // White spots
        canvas.noStroke();
        canvas.ellipse(spotX, spotY, spotSize, spotSize);
        spots.push({x: spotX, y: spotY, size: spotSize}); // Add spot to array
        break; // Exit loop after successful placement
      }
      attempts++;
    }
  }
}

// Draw Mushroom Gills
function drawGills(centerX, startY, capWidth, gillLength, canvas) {
  let gillSpacing = 4; // Space between each gill line
  let gillCount = capWidth / gillSpacing;
  canvas.stroke(120, 60, 0, 100);
  canvas.strokeWeight(2);

  for (let i = 0; i < gillCount; i++) {
    let xOffset = i * gillSpacing - capWidth / 2;
    let gillStartX = centerX + xOffset;
    let gillEndX = centerX + xOffset * 0.8; // Adjust for slight angle
    let gillEndY = startY + gillLength;
    canvas.line(gillStartX, startY, gillEndX, gillEndY);
  }
}

// Draw Grass around Mushroom Stems
function drawGrass(x, baseY, height, width, canvas) {
  canvas.push(); // Save the current drawing style settings and transformations
  canvas.strokeWeight(width);
  canvas.stroke(34, 139, 34, 100); // Semi-transparent green color for a subtle look
  canvas.noFill();
  // Drawing a simple line for now, can be adjusted for more complexity
  canvas.line(x, baseY, x, baseY - height);
  canvas.pop(); // Restore the original drawing style settings and transformations
}

// Draw Dirt around Mushroom Stems
function drawDirt(x, y, amount, canvas) {
  for (let i = 0; i < amount; i++) {
    // Position each rock near the base of a mushroom
    let dirtX = x + random(-20, 20);
    let dirtY = y + random(0, 10);
    let dirtWidth = random(3, 7);
    let dirtHeight = dirtWidth * random(0.5, 1);

    canvas.fill(123, 85, 77, 150);
    canvas.noStroke();
    canvas.ellipse(dirtX, dirtY, dirtWidth, dirtHeight);
  }
}

//---------------------------
// Animate Various Things
//---------------------------
function animateBees(canvas) {
  canvas.clear(); // Clear the dynamicCanvas
  for (let bee of bees) {
    // Update bee's position by a small random amount
    bee.x += random(-3, 3);
    bee.y += random(-3, 3);
    
    // Ensure bee stays within canvas bounds
    bee.x = constrain(bee.x, 0, width);
    bee.y = constrain(bee.y, 0, height);

    // Redraw bee at its new position
    drawBee(bee.x, bee.y, canvas);
  }
}

function animateFireflies(canvas) {
  canvas.clear(); // Clear the dynamicCanvas
  for (let firefly of fireflies) {
    // Apply a small random movement to each firefly
    firefly.x += random(-2, 2);
    firefly.y += random(-2, 2);

    // Ensure the firefly stays within the bounds of the canvas
    firefly.x = constrain(firefly.x, 0, width);
    firefly.y = constrain(firefly.y, 0, height);

    // Draw the firefly in its new position
    drawFirefly(firefly.x, firefly.y, canvas);
  }
}

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