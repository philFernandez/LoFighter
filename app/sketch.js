const groundHeight = 60;
let ground, runningPlayer, idlePlayer;
let counter = 0;
let playerSprites;
let player;

function preload() {
    playerSprites = {
        run: {
            sheet: loadImage("../sprites/run/run.png"),
            data: loadJSON("../sprites/run/run.json"),
        },
        idle: {
            sheet: loadImage("../sprites/idle/idle.png"),
            data: loadJSON("../sprites/idle/idle.json"),
        },
    };
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 1);
    ground = new Ground(groundHeight, "forestgreen");
    player = new Player(playerSprites);
    obby = new Obstacle("purple");
}

function keyPressed() {
    if (key === " ") {
        player.jump();
    }
    if (key === "u") {
        loop();
    }
    if (key === "p") {
        noLoop();
    }
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
        player.showRunning();
        if (random() <= 0.005 && counter >= 75) {
            newObbie();
            counter = 0;
        }
        obbies.forEach((obby) => {
            obby.show();
            obby.move();
        });
    } else {
        player.showIdle();
        obbies.forEach((obby) => {
            obby.show();
        });
    }
    player.move();
}
