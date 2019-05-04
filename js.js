let GameBoard = new function () {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext('2d');
};


let Ball = new function () {
    this.x = GameBoard.canvas.width / 2;
    this.y = GameBoard.canvas.height / 2;
    this.dx = 2;
    this.dy = -2;
    this.radius = 10;
    let self = this;
    this.drawBall = function () {
        GameBoard.ctx.beginPath();
        GameBoard.ctx.arc(self.x, self.y, self.radius, 0, Math.PI * 2);
        GameBoard.ctx.fillStyle = "red";
        GameBoard.ctx.fill();
        GameBoard.ctx.closePath();

    };

    this.moveTheBall = function () {
        self.drawBall();
        self.x += self.dx;
        self.y += self.dy;
        self.checkCollision();
    };


    this.checkCollision = function () {
        if (self.x + self.dx > GameBoard.canvas.width - self.radius || self.x + self.dx < self.radius) {
            self.dx = -self.dx;
        }
        if (self.y + self.dy < self.radius) {
            self.dy = -self.dy;
        } else if (self.y + self.dy > GameBoard.canvas.height - Paddle.paddleHeight) {
            if (self.x > Paddle.paddleX && self.x < Paddle.paddleX + Paddle.paddleWidth) {
                self.dy = -self.dy;
            } else {
                alert("GAME OVER " + "Your score : " + Math.floor(Score.score));
                self.x = 200;
                self.y = 200;
                begin();
            }
        }
    };

};
let Paddle = new function () {
    this.paddleHeight = 15;
    this.paddleWidth = 80;
    this.paddleX = (GameBoard.canvas.width - this.paddleWidth) / 2;
    let self = this;
    document.addEventListener("keydown", function (e) {
        switch (e.which) {
            case 37:
                if (self.paddleX > 0) {
                    self.paddleX -= 25;
                }
                break;
            case 39:
                if (self.paddleX < GameBoard.canvas.width - self.paddleWidth)
                    self.paddleX += 25;
                break;
        }

    });

    this.drawPaddle = function () {
        GameBoard.ctx.beginPath();
        GameBoard.ctx.rect(self.paddleX, GameBoard.canvas.height - self.paddleHeight, self.paddleWidth, self.paddleHeight);
        GameBoard.ctx.fillStyle = "#0095DD";
        GameBoard.ctx.fill();
        GameBoard.ctx.closePath();
    };
};
let Bricks = new function () {
    this.brickRowCount = 5;
    this.brickColumnCount = 9;
    this.brickWidth = 40;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    for (let i = 0; i < this.brickColumnCount; i++) {
        this.bricks[i] = [];
        for (let j = 0; j < this.brickRowCount; j++) {
            this.bricks[i][j] = {x: 0, y: 0, status: 1};
        }
    }

    let self = this;
    this.drawBricks = function () {
        for (let i = 0; i < self.brickColumnCount; i++) {
            for (let j = 0; j < self.brickRowCount; j++) {
                if (self.bricks[i][j].status == 1) {
                    var brickX = (i * (self.brickWidth + self.brickPadding)) + self.brickOffsetLeft;
                    var brickY = (j * (self.brickHeight + self.brickPadding)) + self.brickOffsetTop;
                    self.bricks[i][j].x = brickX;
                    self.bricks[i][j].y = brickY;
                    GameBoard.ctx.beginPath();
                    GameBoard.ctx.rect(brickX, brickY, self.brickWidth, self.brickHeight);
                    GameBoard.ctx.fillStyle = "green";
                    GameBoard.ctx.fill();
                    GameBoard.ctx.closePath();
                }
            }
        }
        self.checkBrickCollision();
    };
    this.checkBrickCollision = function () {
        for (let i = 0; i < self.brickColumnCount; i++) {
            for (let j = 0; j < self.brickRowCount; j++) {
                var b = self.bricks[i][j];
                if (b.status == 1) {
                    if (Ball.x > b.x && Ball.x < b.x + self.brickWidth && Ball.y > b.y && Ball.y < b.y + self.brickHeight) {
                        Ball.dy = -Ball.dy;
                        b.status = 0;
                        Score.score += 10;
                    }
                }
            }

        }
    }
};
let Score = new function () {
    this.score = 0;
    let self = this;
    this.drawScore = function () {
        GameBoard.ctx.font = "16px Arial";
        GameBoard.ctx.fillStyle = "#0095D";
        GameBoard.ctx.fillText("Score: " + Math.floor(self.score),8,20)

    }
    this.countScore = function () {
        self.score+= 0.01;
    }
}


function start() {
    GameBoard.ctx.clearRect(0, 0, GameBoard.canvas.width, GameBoard.canvas.height);
    Ball.moveTheBall();
    Paddle.drawPaddle();
    Bricks.drawBricks();
    Score.drawScore();
    document.getElementById('btnPlay').style.display = 'none';
    setTimeout(Score.countScore,1000);
}

Ball.drawBall();
Paddle.drawPaddle();
Bricks.drawBricks();
Score.drawScore();

function begin() {
    document.location.reload();
};


