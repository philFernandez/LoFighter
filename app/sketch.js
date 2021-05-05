const groundHeight = 60;
let ground, runningPlayer, idlePlayer;
let counter = 0;
let spriteDataRun;
let spriteSheetRun;
let spriteDataIdle;
let spriteSheetIdle;
let playerIsIdle = true;

function preload() {
    spriteDataRun = loadJSON("../sprites/run/run.json");
    spriteSheetRun = loadImage("../sprites/run/run.png");

    spriteDataIdle = loadJSON("../sprites/idle/idle.json");
    spriteSheetIdle = loadImage("../sprites/idle/idle.png");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 1);
    ground = new Ground(groundHeight, "forestgreen");
    runningPlayer = new Player(spriteSheetRun, spriteDataRun);
    idlePlayer = new Player(spriteSheetIdle, spriteDataIdle);
    obby = new Obstacle("purple");
    noLoop();
}

function keyPressed() {
    if (key === " ") {
        if (playerIsIdle) {
            idlePlayer.jump();
        } else {
            runningPlayer.jump();
        }
    }
    if (key === "u") {
        loop();
    }
    if (key === "p") {
        noLoop();
    }
    console.log(keyCode);
}

let obbies = [];
function newObbie() {
    const obbyColors = ["purple", "pink", "black", "green", "blue", "tomato"];
    let color = obbyColors[Math.floor(Math.random() * obbyColors.length)];
    obbies.push(new Obstacle(color));
}

// d = 68
// a = 65
function draw() {
    background("skyblue");
    ground.show();
    counter++;
    if (keyIsDown(68)) {
        playerIsIdle = false;
        runningPlayer.show();
        runningPlayer.move();
        if (random() <= 0.005 && counter >= 75) {
            newObbie();
            counter = 0;
        }
        obbies.forEach((obby) => obby.show());
    } else {
        playerIsIdle = true;
        idlePlayer.show();
        idlePlayer.move();
    }
}
