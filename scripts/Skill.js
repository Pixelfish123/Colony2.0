class Skill{
    constructor(name, cost, tier, x, y, multipliers){
        this.name = name;
        this.cost = cost;
        this.tier = tier;
        this.x = x;
        this.y = y;
        this.r = 25;
        this.multipliers = multipliers;
        this.children = [];
        this.parent = [];
        this.unlocked = false;
        if (name == "Fish") {
            this.unlocked = true;
        }
    }
    show() {
        this.children.forEach(child => {
            line(this.x, this.y, child.x, child.y);
        });
        if (!this.unlocked) {
            fill(255);
        } else {
            fill(50, 50,200);
        }
        circle(this.x, this.y, this.r);
        text(this.name, this.x, this.y + this.height / 2);
        text("Cost: " + this.cost, this.x, this.y + this.height + 12);

       
    }
    clicked(mouseX, mouseY) {
        if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
            return true;
        }
        return false;
    }
    hover(mouseX, mouseY) {
        if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
            fill(255);
            rect(650, 350, 150, 150);
            fill(0);
            let multiplierText = "";
            for (let key in this.multipliers) {
                if (this.multipliers[key] > 1.0) {
                    multiplierText += key + ":  +" + 100*(this.multipliers[key]-1.0) + "%\n";
                } else {
                    multiplierText += key + ": " + Math.trunc(100*(this.multipliers[key]),2) + "%\n";
                }
                
            }
            this.description =
                "" + this.name + "\n---------------------\n" +
                "Tier: " + this.tier + "\n" +
                "Cost: " + this.cost + "\n" +
                "---------------------\n" +
                multiplierText;
            text(this.description, 660, 365);
            return true;
        }
    }
    addChildren(skill) {
        skill.forEach(child => {
            this.children.push(child);
            child.parent.push(this);
        });
    }
    addParent(skill) {
        this.parent = skill;
    }
}