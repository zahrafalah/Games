const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//Create the unit
const box = 32;

//load images
const ground = new Image();
ground.src = "img/ground.png";
const foodImage = new Image();
foodImage.src = "img/food.png";

//load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

//create the food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

//create the score var
let score = 0;

//controlling the snake
let d;

document.addEventListener("keydown", direction);
function direction(event) {
  // console.log("here");
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    down.play();
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
  ctx.drawImage(foodImage, food.x, food.y);

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //When the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    eat.play();
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
    //We dont remove the tail
  } else {
    //remove the tail
    snake.pop();
  }
  // which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  //add new Head
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  //Game over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    dead.play();
    clearInterval(game);
  }

  //check collision of head and tail of the snake
  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
    return false;
  }

  //unshift it to the snake array
  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px change one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

//restart
restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", gameRestart);
function gameRestart() {
  console.log("restart");
  document.location.reload(true);
}

//call draw function every 300 ms(spead of the snake)
let game = setInterval(draw, 300);
