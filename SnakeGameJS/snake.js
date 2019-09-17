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

//controlling the snake
let d;

document.addEventListener("keydown", direction);

function direction(event) {
  // console.log("here");
  if (event.keyCode == 37) {
    d = "LEFT";
    // console.log(event);
  } else if (event.keyCode == 38) {
    d = "Up";
  } else if (event.keyCode == 39) {
    d = "RIGHT";
  } else if (event.keyCode == 40) {
    d = "DOWN";
  }
}

//draw everything to the canves
function draw() {
  //   console.log("Hi");
  ctx.drawImage(ground, 0, 0);
  //looping over snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImage, food.x, food.y) + "Hi";

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //remove the tail
  snake.pop();
  // which direction
  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  //add new Head
  let newHead = {
    x: snakeX,
    y: snakeY
  };
  //unshift it to the snake array
  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px change one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

//call draw function every 100 ms
let game = setInterval(draw, 100);
