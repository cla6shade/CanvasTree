import Tree from "./tree.js";

class TreeCanvas {
    constructor() {
        this.canvasElement = document.getElementById("tree-canvas");
        if (this.canvasElement.getContext)
            this.ctx = this.canvasElement.getContext("2d");
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
        this.canvasElement.addEventListener("click", this.onClickCanvas.bind(this));
    }

    resize() {
        let pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.clientWidth = document.body.clientWidth;
        this.clientHeight = document.body.clientHeight;

        this.width = this.canvasElement.width = this.clientWidth * pixelRatio;
        this.height = this.canvasElement.height = this.clientHeight * pixelRatio;

        this.ctx.scale(pixelRatio, pixelRatio);

        this.drawGround();
    }

    onClickCanvas(e){
        let offsetX = e.offsetX;
        let tree = new Tree(offsetX, this);
        tree.init();
    }

    drawGround(){
        this.ctx.fillRect(0, this.height - 200, this.width, 200);
    }
}

window.onload = () => {
    let treeCanvas = new TreeCanvas();
}