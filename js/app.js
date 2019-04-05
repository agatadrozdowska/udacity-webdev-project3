'use strict';

var Enemy = function (y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.move = function (dt) {
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -101;
    }
};

Enemy.prototype.collision = function () {
    // Checking for collision with the player. Adding padding of 30 pixels each side to make it more "fair" to the player
    if (this.y === player.y && ((player.x - 1) * 101 + 30 < this.x && this.x < (player.x + 1) * 101 - 30)) {
        player.reset();
    }
};


Enemy.prototype.update = function (dt) {
    this.move(dt);
    this.collision();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * 83 - 25);
};


class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.reset();
    }

    reset() {
        this.x = 2;
        this.y = 5;
    }

    update() {
        if (this.y === 0) {
            this.reset();
            alert("You won!");
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
    }

    // Moving player around and making sure that player is within the board boundaries
    handleInput(direction) {
        if (direction === 'down' && this.y < 5) {
            this.y += 1;
        } else if (direction === 'up' && this.y > 0) {
            this.y -= 1;
        } else if (direction === 'left' && this.x > 0) {
            this.x -= 1;
        } else if (direction === 'right' && this.x < 4) {
            this.x += 1;
        }

    }
}

const player = new Player();
const enemy1 = new Enemy(1, 600);
const enemy2 = new Enemy(2, 400);
const enemy3 = new Enemy(3, 300);
let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
