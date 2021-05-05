const groundHeight = 60;
let ground, player;
let counter = 0;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 1);
    ground = new Ground(groundHeight, "forestgreen");
    player = new Player("blue");
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
    // if (random() <= 0.005) {
    if (random() <= 0.005 && counter >= 75) {
        newObbie();
        counter = 0;
    }
    obbies.forEach((obby) => obby.show());
}

/*

let spriteData;
let spriteSheet;
const player1 = {
    player: {},
    xpos: 0,
};
const player2 = {
    player: {},
    xpos: 0,
};
let animation = [];
function preload() {
    spriteData = loadJSON("../sprites/texture.json");
    spriteSheet = loadImage("../sprites/texture.png");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    player1.player = new Sprite(
        spriteSheet,
        spriteData,
        0.2,
        player1.xpos,
        20,
        80,
        80
    );
    player2.player = new Sprite(
        spriteSheet,
        spriteData,
        0.3,
        player2.xpos,
        90,
        80,
        80
    );
}

let index = 0;
function draw() {
    background("skyblue");
    player1.player.show();
    player1.player.animate();
    player2.player.show();
    player2.player.animate();
    player1.xpos += 0.25;
    player2.xpos += 0.5;
    player1.player.setX(Math.floor(player1.xpos) % width);
    player2.player.setX(Math.floor(player2.xpos) % width);
}

*/
