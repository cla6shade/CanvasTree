class Drawer {
    constructor(treeCanvas) {
        this.treeCanvas = treeCanvas;
        this.ctx = treeCanvas.ctx;

        this.width = treeCanvas.width;
        this.height = treeCanvas.height;

        this.stemWidth = this.getRandomNumber(23, 27)
        this.stemHeight = 160;

        this.depth = 10;

        this.endpoints = [];

        this.color = "rgba(0,0,0,1)";
    }

    init() {
        this.drawGround();
        this.drawBranch(Math.floor(this.width / 2), this.height - 200, -90, this.stemWidth,
            this.stemHeight, 0);
    }

    drawGround() {
        this.ctx.fillRect(0, this.height - 200, this.width, 200);
    }

    drawBranch(startX, startY, angle, width, height, step) {
        let rad = angle / 180 * Math.PI;

        if (step > this.depth) {
            this.endpoints.push([startX, startY]);
            return;
        }

        ++step;
        height = step === 1 ? this.stemHeight : this.getNextHeight(height, step);
        width = step === 1 ? this.stemWidth : this.getNextWidth(width, step);
        let endX = startX + (height * Math.cos(rad));
        let endY = startY + (height * Math.sin(rad));

        this.stroke(width, startX, startY, endX, endY)
        this.drawBranchEnd(endX, endY, width);

        this.drawBranch(endX, endY, angle - this.getRandomAngle(step),
            width, height, step);
        this.drawBranch(endX, endY, angle + this.getRandomAngle(step),
            width, height, step);

        if(this.getRandomNumber(0, 3) === 0){
            this.drawBranch(endX, endY, angle + this.getRandomAdditionalAngle(),
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
            return height * this.getRandomNumber(50, 90) / 100;
        } else if (step > 4) {
            return height * this.getRandomNumber(60, 90) / 100
        } else return height * this.getRandomNumber(70, 80) / 100;
    }

    getRandomAngle(step) {
        return step > 2 ? this.getRandomNumber(12, 25) : this.getRandomNumber(10, 20);
    }

    getRandomAdditionalAngle(){
        return this.getRandomNumber(-10, 10);
    }

    getRandomNumber(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    drawBranchEnd(x, y, branchWidth){
        let ctx = this.ctx;
        ctx.beginPath();
        let width = branchWidth / 2;
        ctx.arc(x, y, width, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.closePath();
    }

    stroke(lineWidth, startX, startY, endX, endY) {
        let ctx = this.ctx;
        ctx.lineWidth = lineWidth
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);

        ctx.stroke();
        ctx.fill();

        ctx.closePath();
    }

}

export default Drawer;