class Skill{
    constructor(name, cost){
        this.name = name;
        this.cost = cost;
    }
    show(){
        rect(this.x, this.y, this.width, this.height);
        text(this.name, this.x, this.y + this.height / 2);
        text("Cost: " + this.cost, this.x, this.y + this.height + 12);
    }
}