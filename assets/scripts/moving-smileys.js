document.querySelector('.page').onpointerenter = (event) => {
	if (event.pointerType === 'mouse') {
    canvas.style.display = 'none'
		continueAnimating = false;
		loop();
	}
}
document.querySelector('.page').onpointerleave = (event) => {
	if (event.pointerType === 'mouse') {
    canvas.style.display = 'block'
		continueAnimating = true;
		loop();
	}
}
window.onload = loop;

// configure the canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const rows = Array.from(document.querySelectorAll('.grid .row'));
const lastRow = rows[rows.length - 1];
const width = canvas.width = lastRow.clientWidth;
const height = canvas.height = lastRow.clientHeight;
let continueAnimating = true;

// random number generation function
function random(min, max) {
	const num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

// determine the constructor of the smiley
function Smiley(x, y, velX, velY, size, src) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.size = size;
	this.src = src;
}

// define the draw method for the smiley
Smiley.prototype.draw = function() {
	var img = new Image();
	img.src = this.src;
	context.drawImage(img, this.x, this.y, 100, 100);
};

// define the update method for the smiley
Smiley.prototype.update = function() {
	if ((this.x + this.size) >= width) {
		this.velX = -(this.velX);
	}
	if ((this.x) <= 0) {
		this.velX = -(this.velX);
	}
	if ((this.y + this.size) >= height) {
		this.velY = -(this.velY);
	}
	if ((this.y) <= 0) {
		this.velY = -(this.velY);
	}
	this.x += this.velX;
	this.y += this.velY;
};

// define an array for storing smileys and fill it
let smileys = [];
for (let i = 0; i < 10; i++) {
	const size = 100;
	let smiley = new Smiley(
		random(0 + size, width - size),
		random(0 + size, height - size),
		random(3, 5),
		random(3, 5),
		size,
		`./assets/smileys/smiley (${i+1}).png`
	);
	smileys.push(smiley);
}
for (let i = 0; i < smileys.length; i++) {
	smileys[i].draw();
	smileys[i].update();
}
// determine the cycle of infinite redrawing of the scene
function loop() {
	context.clearRect(0, 0, width, height);
	if (!continueAnimating) return;
	for (let i = 0; i < smileys.length; i++) {
		smileys[i].draw();
		smileys[i].update();
	}
	requestAnimationFrame(loop);
}