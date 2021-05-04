const GRAVITY = 0.3;
class Ground {
    constructor(groundHeight, color) {
        this.groundHeight = groundHeight;
        this.color = color;
    }

    show() {
        // x, y, w, h
        noStroke();
        fill(this.color);
        rect(0, height - this.groundHeight, width, this.groundHeight);
    }

    getGroundHeight() {
        return this.groundHeight;
    }
}

class Player {
    constructor(color) {
        this.color = color;
        this.x = 220;
        this.diameter = 70;
        this.y = height - groundHeight - this.diameter / 2;
        this.velocityY = 0;
    }

    jump() {
        if (this.y === height - groundHeight - this.diameter / 2)
            this.velocityY = -10;
    }

    move() {
        this.y += this.velocityY;
        this.velocityY += GRAVITY;
        this.y = constrain(
            this.y,
            0,
            height - groundHeight - this.diameter / 2
        );
    }

    show() {
        fill(this.color);
        circle(this.x, this.y, this.diameter);
    }
}
