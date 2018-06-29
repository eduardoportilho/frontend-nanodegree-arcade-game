// Constants
var LEFT = 'left';
var UP = 'up';
var RIGHT = 'right';
var DOWN = 'down';
var MAX_COL = 4;
var MAX_ROW = 5;
var PLAYER_INITIAL_COL = 2;
var PLAYER_INITIAL_ROW = 5;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var TILE_OFFSET_Y = 20;
var SCREEN_WIDTH = 505;
var COLLISION_MARGIN = 50;

/**
 * Generate a random integer between min and max.
 * @param {number} min 
 * @param {number} max 
 */
function random(min, max) {
    return Math.floor(Math.random() * max) + min  
}

/**
 * Enemy character.
 * @constructor
 * @param {number} row - Starting row for the enemy, from 0 to MAX_ROW.
 * @param {number} speed - Enemy speed.
 */
var Enemy = function(row, speed) {
    // Enemy is outside of the screen?
    this.isOutOfScreen = false;

    // Enemy speed.
    this.speed = speed;

    // Enemy x position on the canvas.
    this.x = -TILE_WIDTH;
    
    // Enemy y position on the canvas.
    this.y = row * TILE_HEIGHT - TILE_OFFSET_Y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images.
    this.sprite = 'images/enemy-bug.png';
};

/**
 * Update the enemy's position, required method for game.
 * @param {number} dt - a time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
    var delta = this.speed * dt;
    this.x += delta;
    this.isOutOfScreen = this.x  > SCREEN_WIDTH;
};

/**
 * Draw the enemy on the screen, required method for game.
 */
Enemy.prototype.render = function() {
    this.isOutOfScreen || ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * Player character.
 * @constructor
 */
var Player = function() {
    // Player x position on the canvas.
    this.x = 0;
    
    // Player y position on the canvas.
    this.y = 0;

    // Player column position on the canvas.
    this.col = PLAYER_INITIAL_COL;

    // Player row position on the canvas.
    this.row = PLAYER_INITIAL_ROW;

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images.
    this.sprite = 'images/char-boy.png';
};

/**
 * Update the player's position, required method for game.
 * @param {number} dt - a time delta between ticks.
 */
Player.prototype.update = function(dt) {
    this.x = this.col * TILE_WIDTH;
    this.y = this.row * TILE_HEIGHT - TILE_OFFSET_Y;
};

/**
 * Handle keybord input and update player row and column.
 * @param {string} key - Which key was pressed (LEFT, UP, RIGHT, or DOWN).
 */
Player.prototype.handleInput = function(key) {
    if(key === LEFT)
        this.col = Math.max(0, this.col - 1);
    else if(key === RIGHT)
        this.col = Math.min(MAX_COL, this.col + 1);
    else if(key === UP)
        this.row = Math.max(0, this.row - 1);
    else if(key === DOWN)
        this.row = Math.min(MAX_ROW, this.row + 1);
};

/**
 * Draw the player on the screen, required method for game.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Check if the player is on a position that causes a collision with the enemy.
 * @param {Enemy} enemy 
 */
Player.prototype.isColliding = function(enemy) {
    var dx = Math.abs(this.x - enemy.x);
    var dy = Math.abs(this.y - enemy.y);
    return dx <= COLLISION_MARGIN && dy <= COLLISION_MARGIN;
}

/**
 * Reset the player to the initial position.
 */
Player.prototype.reset = function() {
    this.col = PLAYER_INITIAL_COL;
    this.row = PLAYER_INITIAL_ROW;
}

// Player instance.
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: LEFT,
        38: UP,
        39: RIGHT,
        40: DOWN
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
