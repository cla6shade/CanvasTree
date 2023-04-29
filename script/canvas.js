import Drawer from "./drawer.js";

class TreeCanvas {
    constructor() {
        this.canvas = document.getElementById("tree-canvas");
        if (this.canvas.getContext)
            this.ctx = this.canvas.getContext("2d");
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        let pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.clientWidth = document.body.clientWidth;
        this.clientHeight = document.body.clientHeight;

        this.width = this.canvas.width = this.clientWidth * pixelRatio;
        this.height = this.canvas.height = this.clientHeight * pixelRatio;

        this.ctx.scale(pixelRatio, pixelRatio);

        let drawer = new Drawer(this);
        drawer.draw();
    }
}

window.onload = () => {
    let treeCanvas = new TreeCanvas();
}