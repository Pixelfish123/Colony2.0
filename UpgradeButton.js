class UpgradeButton {
    constructor(name,x,y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    show() {
        rect(this.x, this.y - 50, this.width, this.height);
        text("Upgrade", this.x, this.y - 50 + this.height/2);
    }
    clicked(mouseX, mouseY) {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y - 50 && mouseY < this.y - 50 + this.height) {
            // console.log("Upgrade " + this.name);
            return this.name;
        }
        return false;
    }
    hover(mouseX, mouseY) {
        // EMPTY
    }

}