export default class Branch {
    constructor(ctx, startX, startY, angle, width, height, color, step){
        this.ctx = ctx;
        this.startX = startX;
        this.startY = startY;

        this.angle = angle;
        this.width = width;
        this.height = height;

        this.color = color;

        this.step = step;

        this.calculateEndXY();
    }

    draw(){
        this.drawBar();
        this.drawBranchEnd();
    }

    calculateEndXY(){
        let rad = this.deg2rad(this.angle);
        this.endX = this.startX + (this.height * Math.cos(rad));
        this.endY = this.startY + (this.height * Math.sin(rad));
    }

    getEndXY(){
        return [this.endX, this.endY];
    }

    drawBranchEnd(){
        let ctx = this.ctx;
        ctx.beginPath();
        let width = this.width / 2;
        ctx.arc(this.endX, this.endY, width, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.closePath();
    }

    drawBar() {
        let ctx = this.ctx;
        ctx.lineWidth = this.width;

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        ctx.beginPath();

        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);

        ctx.stroke();
        ctx.fill();

        ctx.closePath();
    }

    deg2rad(angle){
        return angle / 180 * Math.PI;
    }
}