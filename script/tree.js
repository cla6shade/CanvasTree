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

        this.depth = this.getRandomNumber(8, 10);

        this.branches = [];

        this.color = "rgba(0,0,0,1)";
        this.endpointColor = "rgba(255, 171, 196, 0.8)";
    }

    init() {
        this.addBranch(this.offsetX, this.height - 200, -90, this.stemWidth,
            this.stemHeight, 0);
    }


    addBranch(startX, startY, angle, width, height, step) {
        let rad = angle / 180 * Math.PI;

        if (step > this.depth) {
            return;
        }

        ++step;
        height = step === 1 ? this.stemHeight : this.getNextHeight(height, step);
        width = step === 1 ? this.stemWidth : this.getNextWidth(width, step);

        let branch = new Branch(this.ctx, startX, startY, angle, width, height, this.color, step);
        branch.draw();
        let [endX, endY] = branch.getEndXY();

        this.branches.push(branch);

        this.addBranch(endX, endY, angle - this.getRandomAngle(step),
            width, height, step);
        this.addBranch(endX, endY, angle + this.getRandomAngle(step),
            width, height, step);

        if(this.getRandomNumber(0, 1) === 0){
            this.addBranch(endX, endY, angle + this.getRandomAdditionalAngle(),
                width, height, step);
        }
    }

    getNextWidth(width, step) {
        if (step < 4) {
            return width * 0.7;
        } else if (step < 8){
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

    getRandomAdditionalAngle(){
        return this.getRandomNumber(-7, 7);
    }

    getRandomNumber(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

}

export default Tree;