class HUD{
    constructor(population, capacity, gold, food){
        this.population = population;
        this.capacity = capacity;
        this.available = population;
        this.gold = gold;
        this.round = 1;
        this.food = food;
        this.knowledge = 0;
    }

    show() {
        rect(700, 0, 100, 25);
        text("Round: " + this.round, 725, 15);

        rect(700, 25, 100, 25);
        text("End Turn", 725, 40);

        rect(750, 50, 50, 50);
        text("Open \n Tree", 750, 75);

        rect(0, 475, 200, 25);
        text("Population: " + this.population + "/" + this.capacity, 10, 490);
        
        rect(150, 475, 150, 25);
        text("Free Workers: " + this.available, 160, 490);
        rect(300, 475, 100, 25);
        text("Money: " + this.gold, 310, 490);

        rect(400, 475, 100, 25);
        text("Food: " + this.food, 410, 490);   

        rect(500, 475, 125, 25);
        text("Knowledge: " + this.knowledge, 510, 490);

    }

    clicked(mouseX, mouseY) {
        if (mouseX > 700 && mouseX < 800 && mouseY > 25 && mouseY < 50) {
            return [this.population, this.capacity, this.gold, this.food];
        }else if (mouseX > 750 && mouseX < 800 && mouseY > 50 && mouseY < 100) {
            return ["Open Tree"];
        }
    }

    hover(mouseX, mouseY) {
        // NONE
    }

    


}