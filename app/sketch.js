let ground;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    ground = new Ground(60, "forestgreen");
}

function draw() {
    background("skyblue");
    ground.show();
}
