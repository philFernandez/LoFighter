const groundHeight = 60;
let ground, player;
let counter = 0;
let spriteData;
let spriteSheet;

function preload() {
    // spriteData = loadJSON("../sprites/texture.json");
    // spriteSheet = loadImage("../sprites/texture.png");
    spriteData = loadJSON("../sprites/run/run.json");
    spriteSheet = loadImage("../sprites/run/run.png");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 1);
    ground = new Ground(groundHeight, "forestgreen");
    player = new Player();
    obby = new Obstacle("purple");
}

function keyPressed() {
    if (key === " ") {
        player.jump();
    }
}

let obbies = [];
function newObbie() {
    const obbyColors = ["purple", "pink", "black", "green", "blue", "tomato"];
    let color = obbyColors[Math.floor(Math.random() * obbyColors.length)];
    obbies.push(new Obstacle(color));
}

function draw() {
    background("skyblue");
    ground.show();
    player.show();
    player.move();
    counter++;
    if (random() <= 0.005 && counter >= 75) {
        newObbie();
        counter = 0;
    }
    obbies.forEach((obby) => obby.show());
}
