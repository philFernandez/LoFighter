const groundHeight = 60;
let ground, runningPlayer, idlePlayer;
let counter = 0;
let playerSprites;
let player;
let gamePaused = false;
let cloudSprite;
let clouds;
let mountainSprite;
let mountain;
let backingTrack;
let slimeSprite;
let playerPoints = 0;
let obbies = [];
const gameOver = document.querySelector("div");

function preload() {
    soundFormats("ogg");
    backingTrack = loadSound("../assets/sounds/backing.ogg");
    playerSprites = {
        run: {
            sheet: loadImage("../assets/sprites/player/run/run.png"),
            data: loadJSON("../assets/sprites/player/run/run.json"),
        },
        idle: {
            sheet: loadImage("../assets/sprites/player/idle/idle.png"),
            data: loadJSON("../assets/sprites/player/idle/idle.json"),
        },
    };
    cloudSprite = loadImage("../assets/sprites/clouds/clouds.png");
    mountainSprite = loadImage("../assets/sprites/mountains/mtn1.png");
    slimeSprite = {
        sheet: loadImage("../assets/sprites/badguy/idle/slime_idle.png"),
        data: loadJSON("../assets/sprites/badguy/idle/slime_idle.json"),
    };
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 1);
    ground = new Ground(groundHeight, "forestgreen");
    player = new Player(playerSprites);
    // obby = new Obstacle(slimeSprite);
    clouds = new Clouds(cloudSprite);
    mountain = new Mountain(mountainSprite);
}

function canvasPressed() {
    backingTrack.play();
}

function keyPressed() {
    if (!backingTrack.isPlaying()) {
        canvasPressed();
    }
    if (key === " ") {
        player.jump();
    }
    if (key === "p") {
        gamePaused = !gamePaused;
        if (gamePaused) {
            noLoop();
        } else {
            loop();
        }
    }
}

function newObbie() {
    obbies.push(new Obstacle(slimeSprite));
}

// d = 68
// a = 65
function draw() {
    background("skyblue");
    ground.show();
    counter++;
    let deadObbies = [];
    mountain.show();
    // player is running
    if (keyIsDown(68)) {
        player.showRunning();
        if (random() <= 0.005 && counter >= 75) {
            newObbie();
            counter = 0;
        }
        obbies.forEach((obby, idx) => {
            obby.show();
            obby.move();
            let obbyPos = obby.getPos();
            let playerPos = player.getPos();
            if (
                collideCircleCircle(
                    playerPos.x,
                    playerPos.y,
                    playerPos.d,
                    obbyPos.x + 20,
                    obbyPos.y + 20,
                    obbyPos.d + 20
                )
            ) {
                noCanvas();
                gameOver.style.display = "flex";
                document.body.style.backgroundColor = "black";
                noLoop();
            }
            if (obbyPos.x < -40) {
                deadObbies.push(idx);
            }
        });
        clouds.show();
        clouds.move(0.8);
        mountain.move(0.2);
    } else {
        player.showIdle();
        obbies.forEach((obby) => {
            obby.show();
            let obbyPos = obby.getPos();
            let playerPos = player.getPos();
            if (
                collideCircleCircle(
                    playerPos.x,
                    playerPos.y,
                    playerPos.d,
                    obbyPos.x + 20,
                    obbyPos.y + 20,
                    obbyPos.d + 20
                )
            ) {
                noCanvas();
                gameOver.style.display = "flex";
                document.body.style.backgroundColor = "black";
                noLoop();
            }
        });
        clouds.show();
        clouds.move(0.1);
    }
    player.move();
    // leading obbie jumps at random
    if (obbies.length && random() <= 0.005) obbies[0].jump();
    // Remove obbies that are no longer on screen
    deadObbies.forEach((deadObby) => {
        obbies.splice(deadObby, 1);
    });

    if (obbies.length && obbies[0].getPos().x === player.getPos().x) {
        playerPoints++;
        console.log(playerPoints);
    }
}
