import Branch from "./branch.js";

class Tree {
    constructor(offsetX, treeCanvas) {
        this.treeCanvas = treeCanvas;
        this.ctx = treeCanvas.ctx;

        this.offsetX = offsetX;

        this.width = treeCanvas.width;
        this.height = treeCanvas.height;

        this.stemWidth = this.getRandomNumber(23, 27)
        this.stemHeight = this.getRandomNumber(140, 180);

        this.depth = this.getRandomNumber(9, 11);

        this.branches = [];

        this.color = "rgba(0,0,0,1)";

        this.drawStep = 0;
        this.stepAnimationEvent = 0;
    }

    init() {
        this.addBranch(this.offsetX, this.height - 200, -90, this.stemWidth,
            this.stemHeight, 0);
        this.stepAnimationEvent = window.requestAnimationFrame(this.draw.bind(this));
    }


    addBranch(startX, startY, angle, width, height, step) {
        if (step >= this.depth) {
            return;
        }

        height = step === 0 ? this.stemHeight : this.getNextHeight(height, step);
        height = Math.round(height);
        width = step === 0 ? this.stemWidth : this.getNextWidth(width, step);

        let branch = new Branch(this.ctx, startX, startY, angle, width, height, this.color, step);
        let [endX, endY] = branch.getEndXY();

        if (typeof this.branches[step] === "undefined")
            this.branches[step] = [];
        this.branches[step].push(branch);

        ++step;
        this.addBranch(endX, endY, angle - this.getRandomAngle(step),
            width, height, step);
        this.addBranch(endX, endY, angle + this.getRandomAngle(step),
            width, height, step);

        if (this.getRandomNumber(0, 1) === 0) {
            this.addBranch(endX, endY, angle + this.getRandomAdditionalAngle(),
                width, height, step);
        }
    }

    draw() {
        if(this.drawStep >= this.depth){
            window.cancelAnimationFrame(this.stepAnimationEvent);
            return;
        }
        let branches = this.branches[this.drawStep];
        let complete = true;
        for (let branch of branches) {
            complete = branch.drawBar();
        }
        if(complete){
            this.drawStep ++;
        }
        this.stepAnimationEvent = window.requestAnimationFrame(this.draw.bind(this));
    }


    getNextWidth(width, step) {
        if (step < 4) {
            return width * 0.7;
        } else if (step < 8) {
            return width * 0.7;
        }
        return width < 1 ? 0.5 : width * this.getRandomNumber(60, 70) / 100;
    }

    getNextHeight(height, step) {
        if (step > 8) {
            return height * this.getRandomNumber(50, 80) / 100;
        } else if (step > 4) {
            return height * this.getRandomNumber(60, 90) / 100
        } else return height * this.getRandomNumber(70, 80) / 100;
    }

    getRandomAngle(step) {
        return step > 2 ? this.getRandomNumber(12, 25) : this.getRandomNumber(10, 20);
    }

    getRandomAdditionalAngle() {
        return this.getRandomNumber(-7, 7);
    }

    getRandomNumber(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

}

export default Tree;