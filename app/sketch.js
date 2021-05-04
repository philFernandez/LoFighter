const groundHeight = 60;
let ground, player;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    ground = new Ground(groundHeight, "forestgreen");
    player = new Player("blue");
}

function draw() {
    background("skyblue");
    ground.show();
    player.show();
}
