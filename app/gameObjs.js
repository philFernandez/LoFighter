class Ground {
    constructor(groundHeight, color) {
        this.groundHeight = groundHeight;
        this.color = color;
    }

    show() {
        // x, y, w, h
        rect(0, height - this.groundHeight, width, this.groundHeight);
        noStroke();
        fill(this.color);
    }

    getGroundHeight() {
        return this.groundHeight;
    }
}
