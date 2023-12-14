//define html elements
//capture the board
const gameBorder1=document.getElementById('game-border-1');
const gameBorder2=document.getElementById('game-border-2');
const gameBorder3=document.getElementById('game-border-3');
const button1=document.getElementById('button1');
const button2=document.getElementById('button2');
const button3=document.getElementById('button3');
const button4=document.getElementById('button4');
const board=document.getElementById('game-board');
const logo=document.getElementById('logo');
const instructionText=document.getElementById('instruction-text');
let score=document.getElementById('score');
let highScore=document.getElementById('highScore');

//define game variables
//array of objects basically x and y coordinate of the snake 
let snake=[{x:10,y:10}];
let food=generateFood();
let direction='right';
let gameInterval;  
let gameSpeedDelay=200 ;
let gameStarted=false;
let highScore2=0;
function generateFood(){
    const x=Math.floor(Math.random()*20)+1;
    const y=Math.floor(Math.random()*20)+1;
    return {x:x, y:y};
}
//draw game map,snake,food
function draw(){
    board.innerHTML='';
    drawFood();
    drawSnake();
    updateScore();
}

//draw snake
function drawSnake(){
    snake.forEach(
        (segment)=>{
            const snakeElement=createGameElement('div','snake');
            setPosition(snakeElement,segment);
            board.appendChild(snakeElement);
        }
    );
}
function createGameElement(tag,className){
    const element=document.createElement(tag);
    element.className=className;
    return element;
}

//set position of snake or food
function setPosition(element,position){
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}

//draw food function 
function drawFood(){
    if(gameStarted){
        const foodElement=createGameElement('div','food');
        let backgroundColor=window.getComputedStyle(board).backgroundColor;
        if(backgroundColor=='rgb(171, 183, 138)'){
            foodElement.style.backgroundColor='#dedede';
            foodElement.style.borderColor='#999';
        }
        else if(backgroundColor=='rgb(240, 128, 128)'){
            foodElement.style.backgroundColor='#FBCEB1';
            foodElement.style.borderColor='#FF0800  ';
        }
        else if(backgroundColor=='rgb(240, 230, 140)'){
            foodElement.style.backgroundColor='#FFFF00';
            foodElement.style.borderColor='#FFD700';
        }
        else if(backgroundColor=='rgb(124, 185, 232)'){
            foodElement.style.backgroundColor='#dedede';
            foodElement.style.borderColor='#0039a6';
        }
        
        setPosition(foodElement,food);
        board.appendChild(foodElement);
    }
}
// draw();


//moving the snake
function move(){
    //shallow copy of our original object
    //     // Spread Method
    // let clone = { ...userDetails }

    // // Object.assign() Method
    // let clone = Object.assign({}, userDetails)

    // // JSON.parse() Method
    // let clone = JSON.parse(JSON.stringify(userDetails))
    const head= {...snake[0]};
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }
    //add the head element to the start of the snake array 
    //array.prototype.unshift function it is 

    snake.unshift(head);
    //when the snake head meets the food head 
    if(head.x===food.x&&head.y===food.y){
        food=generateFood();
        updateScore();
        increaseSpeed();
        clearInterval(gameInterval);//clear past interval
        gameInterval=
            setInterval(
                ()=>{
                    move();
                    checkCollision();
                    draw();
                },
                gameSpeedDelay
            );
        //add score also
    }
    else{
        snake.pop();
    }
}
function startGame(){
    gameStarted=true;
    instructionText.style.display='none';
    logo.style.display='none';
    gameInterval=
        setInterval(
            ()=>{
                move();
                checkCollision();
                draw();
            },
            gameSpeedDelay
        );
}
//event handler argument in the event listener
function handleKeyPressEvent(event){
        if((!gameStarted&&event.key===' ')||(!gameStarted&&event.code==='Space')){
            startGame();
        }
        else{
            switch (event.key) {
                case 'ArrowUp':
                    direction="up";
                    break;  
                case 'ArrowDown':
                    direction="down";
                    break;
                case 'ArrowRight':
                    direction="right";
                    break;
                case 'ArrowLeft':
                    direction="left";
                    break;
            
            }
        }
        //preventing the default behaviour of the keys 
        event.preventDefault();
    }
function checkCollision(){
    const head=snake[0];
    //collision with walls
    if(head.x<1||head.x>20||head.y<1||head.y>20){
        //collision happens 
        resetGame();
    }
    //collison with snake body
    for(let i=1;i<snake.length;i++){
        if((head.x===snake[i].x)&&(head.y===snake[i].y)){
            resetGame();
        }
    }
}
function increaseSpeed(){
    if(gameSpeedDelay>150){
        gameSpeedDelay-=5;
    }
    else if(gameSpeedDelay>100){
        gameSpeedDelay-=3;
    }
    else if(gameSpeedDelay>50){
        gameSpeedDelay-=2;
    }
    else if(gameSpeedDelay>25){
        gameSpeedDelay-=1;
    }

}
function resetGame(){
    updateHighScore();
    stopGame();
    snake=[{x:10,y:10}];
    food=generateFood();
    direction='right';  
    gameSpeedDelay=200;
    updateScore();

    // gameStarted=false;
}

function updateScore(){
    const currentScore=snake.length-1;
    score.textContent=currentScore.toString().padStart(3,'0');
}
function updateHighScore(){
    const currentScore=snake.length-1;
    if(currentScore>highScore2){
        highScore2=currentScore;
        highScore.textContent=highScore2.toString().padStart(3,'0');
    }
}
document.addEventListener('keydown',handleKeyPressEvent);
function stopGame(){
    clearInterval(gameInterval);
    gameStarted=false;
    instructionText.style.display='block';
    logo.style.display='block';
}
// const foodelem=document.querySelector('.food');
button1.addEventListener("click",()=>{
    gameBorder1.style.borderColor="#595f43";
    gameBorder1.style.boxShadow="inset 0 0 0 10px #595f43";

    gameBorder2.style.borderColor="#abb78a";
    gameBorder2.style.boxShadow="inset 0 0 0 10px #abb78a";

    gameBorder3.style.borderColor="#8b966c";
    // gameBorder3.style.boxShadow="inset 0 0 0 10px #8b966c";
    board.style.backgroundColor='#abb78a';
    score.style.color='#abb78a';
    button2.style.border='none';
    button3.style.border='none';
    button4.style.border='none';

    button1.style.border="5px solid azure";
});
button2.addEventListener("click",()=>{
    gameBorder1.style.borderColor="#7C0A02";
    gameBorder1.style.boxShadow="inset 0 0 0 10px #7C0A02";

    gameBorder2.style.borderColor="#F08080";
    gameBorder2.style.boxShadow="inset 0 0 0 10px #F08080";

    gameBorder3.style.borderColor="#D2122E";
    // gameBorder3.style.boxShadow="inset 0 0 0 10px #D2122E";
    board.style.backgroundColor='#F08080';
    score.style.color='#F08080';
    button1.style.border='none';
    button3.style.border='none';
    button4.style.border='none';
    button2.style.border="5px solid azure";
});
button3.addEventListener("click",()=>{
    gameBorder1.style.borderColor="#FEBE10";
    gameBorder1.style.boxShadow="inset 0 0 0 10px #FEBE10";

    gameBorder2.style.borderColor="#F0E68C";
    gameBorder2.style.boxShadow="inset 0 0 0 10px #F0E68C";

    gameBorder3.style.borderColor="#FFC72C";
    // gameBorder3.style.boxShadow="inset 0 0 0 10px #D2122E";
    board.style.backgroundColor='#F0E68C';
    score.style.color='#F0E68C';
    button1.style.border='none';
    button2.style.border='none';
    button4.style.border='none';
    button3.style.border="5px solid azure";
});
button4.addEventListener("click",()=>{
    gameBorder1.style.borderColor="#00308F";
    gameBorder1.style.boxShadow="inset 0 0 0 10px #00308F";

    gameBorder2.style.borderColor="#7CB9E8";
    gameBorder2.style.boxShadow="inset 0 0 0 10px #7CB9E8";

    gameBorder3.style.borderColor="#5072A7";
    // gameBorder3.style.boxShadow="inset 0 0 0 10px #D2122E";
    board.style.backgroundColor='#7CB9E8';
    score.style.color='#7CB9E8';
    button1.style.border='none';
    button2.style.border='none';
    button3.style.border='none';
    button4.style.border="5px solid azure";
});

// startGame();