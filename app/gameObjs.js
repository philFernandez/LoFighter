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
class Obstacle {
    constructor(color) {
        this.color = color;
        this.x = width;
        this.diameter = 90;
        this.y = height - groundHeight - this.diameter / 2;
        this.velocityX = -5;
    }

    show() {
        fill(this.color);
        circle(this.x, this.y, this.diameter);
        this.x -= 4;
    }
}

class Player {
    constructor(color) {
        this.color = color;
        this.x = 90;
        this.diameter = 70;
        this.y = height - groundHeight - this.diameter / 2;
        this.velocityY = 0;
        this.playerSprite = new Sprite(
            spriteSheet,
            spriteData,
            0.2,
            this.x,
            this.y,
            this.diameter,
            this.diameter
        );
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
        this.playerSprite.setY(this.y);
    }

    show() {
        ellipseMode(CORNER);
        noFill();
        stroke("black");
        strokeWeight(5);
        circle(this.x, this.y, this.diameter);
        this.playerSprite.show();
        this.playerSprite.animate();
    }
}

class Sprite {
    constructor(spriteSheet, spriteData, animationSpeed, xpos, ypos, w, h) {
        this.animation = [];
        spriteData.frames.forEach((frame) => {
            let pos = frame.frame;
            let img = spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
            this.animation.push(img);
        });
        this.frames = this.animation.length;
        this.animationSpeed = animationSpeed;
        this.xpos = xpos;
        this.ypos = ypos;
        this.w = w;
        this.h = h;
        this.index = 0;
    }

    show() {
        image(
            this.animation[Math.floor(this.index) % this.frames],
            this.xpos,
            this.ypos,
            this.w,
            this.h
        );
    }

    animate() {
        this.index += this.animationSpeed;
    }

    setX(xpos) {
        this.xpos = xpos;
    }

    setY(ypos) {
        this.ypos = ypos;
    }

    setpos(xpos, ypos) {
        this.setX(xpos);
        this.setY(ypos);
    }
}
