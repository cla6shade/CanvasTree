class Drawer {
    constructor(treeCanvas) {
        this.treeCanvas = treeCanvas;
        this.ctx = treeCanvas.ctx;

        this.width = treeCanvas.width;
        this.height = treeCanvas.height;

        this.stemWidth = 80;
        this.stemHeight = 700;

        this.color = "rgba(0,0,0,1)";
    }

    draw() {
        this.drawGround();
        let [endX, endY] = this.drawStem(Math.floor(this.width / 2), this.height - 200);
    }

    drawGround() {
        this.ctx.fillRect(0, this.height - 200, this.width, 200);
    }

    drawStem(startX, startY) {
        //줄기를 그리고 나서 끝부분 좌표 리턴
        let endY = startY - this.stemHeight;
        this.stroke(this.stemWidth, startX, startY, startX, endY);
        return [startX, endY]
    }

    drawBranch(startX, startY, radOffset, step) {
        let branchWidth = this.getBranchWidth(step);
        let branchHeight = this.getBranchHeight(step);
    }

    getRandomRadian(radOffset){
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

    getBranchWidth(step) {
        return this.stemWidth * Math.pow(0.66667, step);
    }

    getBranchHeight(step) {
        return this.stemHeight * Math.pow(0.5, step);
    }
}

export default Drawer;