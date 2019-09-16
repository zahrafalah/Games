const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//Create the unit

const box = 32;

//load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImage = new Image();
foodImage.src = "img/food.png";

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

//create the food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 17 + 1) * box
};

//create the score var
let score = 0;

//draw everything to the canves
function draw() {
  //   console.log("Hi");
  ctx.drawImage(ground, 0, 0);
}

//call draw function every 100 ms
let game = setInterval(draw, 100);
