
class Building{
    constructor(name, x, y, width, height,efficiency){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.upgrades =     [0, 25, 50, 100, 150, 250];
        this.efficiency =   efficiency; 
        this.selected = false;
        this.level = 1;
        this.workers = 0;
        this.addButton = new AddButton(this.name, this.x, this.y);
        this.upgradeButton = new UpgradeButton(this.name, this.x, this.y);
    }
    show(){
        fill(255);
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        text(this.name, this.x, this.y + this.height / 2);
        text("Level: " + this.level, this.x, this.y + this.height + 12);
        text("Workers: " + this.workers, this.x, this.y + this.height + 24);
    }
    clicked(mouseX, mouseY) {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            if (this.name == "City") {
                return [this.upgradeButton];
            } else {
                
                return [this.addButton, this.upgradeButton];
            }
        }
        return false;
    }
    hover(mouseX, mouseY) {
        if (this.name == "City" && mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            fill(255);
            rect(650, 350, 150, 150);
            fill(0);
            this.description =
                "" + this.name + "\n---------------------\n" +
                "Upgrade Bonus:\n" + (this.efficiency[this.level + 1]) + "Cap.\n" +
                "Upgrade cost: " + this.upgrades[this.level] + "\n\n";
            text(this.description, 660, 360);
            return true;

        }
        else if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            fill(255);
            rect(650, 350, 150, 150);
            fill(0);
            this.description =
                "" + this.name + "\n---------------------\n" +
                "Production per round:\n" + this.efficiency[this.level] * this.workers + "\n" +
                "---------------------\n" +
                "Level: " + this.level + "\n" +
                "Workers: " + this.workers + "\n" +
                "Upgrade Bonus: +" + 100*(this.efficiency[this.level+1]-1) + "%\n" +
                "Upgrade Cost: " + this.upgrades[this.level] + "\n\n"
            text(this.description, 660, 360);
            return true;
        }
        return false;
    }
    
}
 