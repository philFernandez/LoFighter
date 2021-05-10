// rect(10, groundHeight - 10, 200, 50, 20);
// fill("orange");
// textSize(32);
// text(`score: ${playerPoints}`, 20, groundHeight, 200, 50);

const groundHeight = 60;
const obbieGrace = 20;
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
let plusOnePointSound;
let slimeSprite;
let playerPoints = 0;
let obbies = [];
let ref;
const gameOverView = document.querySelector("div");
const finalPoints = document.querySelector("div > div > h4");

function preload() {
    soundFormats("ogg", "wav");
    backingTrack = loadSound("../assets/sounds/backing.ogg");
    plusOnePointSound = loadSound("../assets/sounds/coins.wav");
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
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCZqkyk1RHJ-yMJC2H1mHnBNhcB5yOi0aU",
        authDomain: "lofighter.firebaseapp.com",
        projectId: "lofighter",
        storageBucket: "lofighter.appspot.com",
        messagingSenderId: "679831163220",
        databaseURL: "https://lofighter-default-rtdb.firebaseio.com/",
        appId: "1:679831163220:web:cfb8d5a27807da9f71b8c1",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    ref = database.ref("scores");
    createCanvas(window.innerWidth, window.innerHeight - 1);
    ground = new Ground(groundHeight, "forestgreen");
    player = new Player(playerSprites);
    clouds = new Clouds(cloudSprite);
    mountain = new Mountain(mountainSprite);
}

function canvasPressed() {
    backingTrack.setVolume(0.1);
    backingTrack.loop();
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

function drawHud() {
    fill("gray");
    let rectWidth = 200;
    if (playerPoints > 9999) {
        rectWidth = 250;
    }
    let rectHeight = 70;
    let hudOffset = 20;
    rect(
        window.innerWidth - rectWidth - hudOffset,
        hudOffset,
        rectWidth,
        rectHeight,
        20
    );
    fill("orange");
    textSize(32);
    text(
        `score: ${playerPoints}`,
        window.innerWidth - rectWidth,
        hudOffset * 2,
        rectWidth,
        rectHeight
    );
}

function saveScore() {
    let playersName;
    const playersInput = document.querySelector("input#name");
    const submit = document.querySelector("button#submit-score");

    submit.addEventListener("click", () => {
        playersName = playersInput.value;
        if (playersName.trim() === "") {
            playersName = "j_doe";
        } else {
            playersName = playersName.replace(/ /g, "_");
        }
        playersInput.value = "";
        let data = {
            name: playersName,
            score: playerPoints,
        };
        ref.push(data);
        submit.disabled = true;
    });
    showHighScores();
}
function showHighScores() {
    const showHighScores = document.querySelector("button#high-scores");
    const scoresView = document.querySelector("div.scores");

    showHighScores.addEventListener("click", () => {
        ref.on(
            "value",
            (data) => {
                Object.values(data.val())
                    .sort((a, b) => b.score - a.score)
                    .forEach((scoreEntry) => {
                        scoresView.innerHTML += `<div><h3>${scoreEntry.name}</h3><h3>${scoreEntry.score}</h3></div>`;
                    });
            },
            (error) => {
                console.warn("ERROR!");
                console.error(error);
            }
        );
        gameOverView.style.display = "none";
        scoresView.style.display = "block";
    });
}

function checkForPoint() {
    if (obbies.length && obbies[0].getPos().x === player.getPos().x) {
        playerPoints++;
        plusOnePointSound.play();
    }
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
                    obbyPos.x + obbieGrace,
                    obbyPos.y + obbieGrace,
                    obbyPos.d + obbieGrace
                )
            ) {
                noCanvas();
                gameOverView.style.display = "flex";
                document.body.style.backgroundColor = "black";
                finalPoints.innerHTML = `score ${playerPoints}`;
                saveScore();
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
                    obbyPos.x + obbieGrace,
                    obbyPos.y + obbieGrace,
                    obbyPos.d + obbieGrace
                )
            ) {
                noCanvas();
                gameOverView.style.display = "flex";
                document.body.style.backgroundColor = "black";
                finalPoints.innerHTML = `score ${playerPoints}`;
                saveScore();
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

    checkForPoint();
    drawHud();
}
