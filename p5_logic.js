
// 1080p resolution
const w = 800;
const h = 600;

// graphics
let girl_svg = []
let explosion_svg = null;
let robot_svg = null;
let game_counter = 0;

// p5.js callback: load all graphics and set up
function preload(){
    robot_svg = loadImage("./graphics/robot.svg");
    girl_svg.push(loadImage("./graphics/girl1.svg"));
    girl_svg.push(loadImage("./graphics/girl2.svg"));
    girl_svg.push(loadImage("./graphics/girl3.svg"));
    explosion_svg = loadImage("./graphics/explosion.svg")
}

// p5.js callback: set up the game size and modes
function setup() {
    createCanvas(w, h);
    imageMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);
    frameRate(30);
    maze = null;
    generate_maze();
}

// p5 js callback - draw the world
function draw() {
    game_counter += 1;

    background(0);
    stroke(255)
    draw_maze()
    draw_player()

    player_keys()
}

