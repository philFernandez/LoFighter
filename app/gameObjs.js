const GRAVITY = 0.25;
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

class Clouds {
    constructor(cloudImg) {
        this.x = width;
        this.y = random(0, height / 2);
        this.img = cloudImg;
    }
    move(speed) {
        this.x -= speed;
        if (this.x < -200) {
            this.x = width + 40;
            this.y = random(0, height / 2);
        }
    }
    show() {
        image(this.img, this.x, this.y);
    }
}

class Mountain {
    constructor(mountainImg) {
        this.img = mountainImg;
        this.x = width - this.img.width;
        this.y = height - this.img.height - groundHeight;
    }
    move(speed) {
        this.x -= speed;
        if (this.x < -this.img.width) {
            this.x = width;
        }
    }

    show() {
        image(this.img, this.x, this.y);
    }
}
class Obstacle {
    constructor(sprite) {
        this.circleX = width;
        this.diameter = 90;
        this.circleY = height - groundHeight - this.diameter / 2;
        this.x = this.circleX - this.diameter / 2;
        this.y = this.circleY - this.diameter / 2;
        this.velocityX = -5;
        this.velocityY = 0;
        this.slime = new Sprite(
            sprite.sheet,
            sprite.data,
            0.2,
            this.x,
            this.y,
            this.diameter,
            this.diameter
        );
    }

    jump() {
        if (this.circleY === height - groundHeight - this.diameter / 2)
            this.velocityY = -10;
    }

    move() {
        this.x += this.velocityX;
        this.slime.setX(this.x);
        this.circleX += this.velocityX;

        this.y += this.velocityY;
        this.circleY += this.velocityY;
        this.velocityY += GRAVITY;
        this.y = constrain(this.y, 0, height - groundHeight - this.diameter);
        this.circleY = constrain(
            this.circleY,
            0,
            height - groundHeight - this.diameter / 2
        );
        this.slime.setY(this.y);
    }

    show() {
        noFill();
        // stroke("black");
        circle(this.circleX, this.circleY, this.diameter);
        this.slime.show();
        this.slime.animate();
    }

    getPos() {
        return { x: this.circleX, y: this.circleY, d: this.diameter };
    }
}

/**
 * Only adjust the circleX and circleY when changing hardcoded values. Changing those will also make the needed
 * changes to x and y which the player sprites use.
 */
class Player {
    constructor(sprites) {
        this.circleX = 90;
        this.diameter = 70;
        this.circleY = height - groundHeight - this.diameter / 2;
        this.velocityY = 0;
        this.x = this.circleX - this.diameter / 2;
        this.y = this.circleY - this.diameter / 2;
        this.player = {
            running: new Sprite(
                sprites.run.sheet,
                sprites.run.data,
                0.2,
                this.x,
                this.y,
                this.diameter,
                this.diameter
            ),
            idle: new Sprite(
                sprites.idle.sheet,
                sprites.idle.data,
                0.2,
                this.x,
                this.y,
                this.diameter,
                this.diameter
            ),
        };
    }

    jump() {
        if (this.circleY === height - groundHeight - this.diameter / 2)
            this.velocityY = -11;
    }

    move() {
        this.y += this.velocityY;
        this.circleY += this.velocityY;
        this.velocityY += GRAVITY;
        this.y = constrain(this.y, 0, height - groundHeight - this.diameter);
        this.circleY = constrain(
            this.circleY,
            0,
            height - groundHeight - this.diameter / 2
        );
        // Always move both idle and running so mid-jump trasition between states is smooth
        this.player.idle.setY(this.y);
        this.player.running.setY(this.y);
    }

    showRunning() {
        noFill();
        // stroke("black");
        circle(this.circleX, this.circleY, this.diameter);
        this.player.running.show();
        this.player.running.animate();
    }

    showIdle() {
        noFill();
        // stroke("black");
        circle(this.circleX, this.circleY, this.diameter);
        this.player.idle.show();
        this.player.idle.animate();
    }

    getPos() {
        return { x: this.circleX, y: this.circleY, d: this.diameter };
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
