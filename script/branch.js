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
        this.calculateFramePoints();
    }

    calculateEndXY(){
        this.rad = this.deg2rad(this.angle);
        this.endX = this.startX + (this.height * Math.cos(this.rad));
        this.endY = this.startY + (this.height * Math.sin(this.rad));
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

    calculateFramePoints() {
        this.framePoints = [];
        this.offsetX = this.startX;
        this.offsetY = this.startY;

        this.nowFrame = 0;
        let fragment = this.height / 8;

        for(let i=1;i<this.height;i+=fragment){
            let x = this.startX + (i * Math.cos(this.rad));
            let y = this.startY + (i * Math.sin(this.rad));
            this.framePoints.push([x, y]);
        }
        this.framePoints.push([this.endX, this.endY])
    }

    drawBar() {
        if(this.nowFrame >= this.framePoints.length){
            this.drawBranchEnd();
            return true;
        }
        let [x, y] = this.framePoints[this.nowFrame];
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.lineWidth = this.width;
        ctx.moveTo(this.offsetX, this.offsetY);
        ctx.lineTo(x, y);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.fill();
        ctx.stroke();

        this.nowFrame ++;
        return false;
    }

    deg2rad(angle){
        return angle / 180 * Math.PI;
    }
}