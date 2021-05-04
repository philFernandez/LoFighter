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
    }

    show() {
        fill(this.color);
        circle(this.x, this.y, this.diameter);
    }
}
