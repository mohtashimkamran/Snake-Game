function init(){
    // console.log("In init")
    var canvas = document.getElementById('mycanvas')
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d')
    game_over = false;
    cs = 66;
    score = 5;
    //create image for food object
    food_img = new Image();
    food_img.src = "Assets/apple.png";

    trophy_img = new Image();
    trophy_img.src= "Assets/trophy.png"

    food = getRandomfood();

    snake = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake : function(){
            for(var i = this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake : function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
            }
        },
        updateSnake : function(){
            //console.log("updating Snake according to direction");
            //check if the snake has eaten food , incase the length of the snake and
            //generate new food object
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if(headX==food.x && headY==food.y){
                console.log("food eaten");
                food=getRandomfood();
                score++;
            }
            else{
                this.cells.pop();
            }
            
            this.cells.push()
            
            var headX = this.cells[0].x;
			var headY = this.cells[0].y;
            var nextX,nextY;


            if(this.direction=="right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX = headX -1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY +1;
            }
            else{
                nextX = headX;
                nextY = headY -1;
            }

            this.cells.unshift({x:nextX,y:nextY});
            
            var lastX = Math.round(W/cs);
            var lastY = Math.round(H/cs);
            
            if(this.cells[0].y<0 || this.cells[0].x<0||this.cells[0].x>lastX||this.cells[0].y>lastY){
                game_over=true;
            }

        }
    };
    snake.createSnake();
    //adding event litseners

    function keyPressed(e){
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else {
            snake.direction="up";
        }
        console.log(snake.direction);
    }

    document.addEventListener('keydown',keyPressed);
	
}

function draw(){

    //erase old screen
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy_img,20,20,cs,cs);

    pen.fillStyle= "blue";
    pen.font="25px Roboto"
    pen.fillText(score,50,50);

    

}

function update(){
    snake.updateSnake();
}
function getRandomfood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodX,
        y:foodY,
        color:"red"
    }
    return food;
}
function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("GameOver");
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop,100);
