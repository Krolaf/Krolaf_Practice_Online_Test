
//snakeBoard
var blockSize = 25;
var rows = 20;
var cols = 20;
var snakeBoard;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

//variable score
var score = 0;

//variable game over
var gameOver = false;

window.onload = function() {
    snakeBoard = document.getElementById("snakeBoard");
    snakeBoard.height = rows * blockSize;
    snakeBoard.width = cols * blockSize;
    context = snakeBoard.getContext("2d"); //used for drawing on the snakeBoard

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        showGameOverMenu();
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, snakeBoard.width, snakeBoard.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++; // Incrémenter le score
    }
    

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize -1 || snakeY < 0 || snakeY > rows*blockSize -1) {
        gameOver = true;
        
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            
        }
    }
}

function changeDirection(e) {
    
    if (gameOver && e.code === "Enter") {
        // Réinitialise les variables du jeu
        snakeX = blockSize * 5;
        snakeY = blockSize * 5;
        velocityX = 0;
        velocityY = 0;
        snakeBody = [];
        score = 0;
        gameOver = false;
    
        // Réaffiche le canvas du jeu
        context.clearRect(0, 0, snakeBoard.width, snakeBoard.height);
        placeFood();
        update();
    }

    if (e.code === "ArrowUp"&& velocityY !==1 || e.code === "KeyW" && velocityY !==1 ) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code === "ArrowDown" && velocityY !== -1 || e.code === "KeyS" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code === "ArrowLeft" && velocityX !== 1 || e.code === "KeyA" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code === "ArrowRight" && velocityX !== -1 || e.code === "KeyD" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}



function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function showGameOverMenu() {
    // Efface le contenu du canvas
    context.clearRect(0, 0, snakeBoard.width, snakeBoard.height);

    // Affiche le texte du menu
    context.fillStyle = "red";
    context.font = "30px Arial";
    context.fillText("Game Over", 150, 200);
    context.fillText("Score: " + score, 170, 250);
    context.fillText("Press Enter to Replay", 100, 300);

    // // Récupère l'élément du menu de fin de partie
    // var gameOverMenu = document.getElementById("gameOverMenu");

    // Affiche le texte du menu avec les styles CSS
    gameOverMenu.innerHTML = "last score " + score ;
}
