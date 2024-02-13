class SkillTree {
  constructor() {
    this.unlocked = [false, false, false, false, false, false, false];
    this.multipliers = {
      "Heat Resistance": 1.0,
      "Cold Resistance": 1.0,
      "Efficiency": 1.0, // Mines
      "Productivity": 1.0, // Farm
      "Intelligence": 1.0, // Research
      "Fecundity": 1.0, // Population Growth
      "Food Consumption": 1.0,
      "Combat Strength": 1.0,
      "Immunity": 1.0
    }
    this.knowledge = 0;
    this.activeSkills = [];

    //Tier 0
    let fish = new Skill("Fish", 0, 0, 400, 25, {});

    // Tier 1
    let salamander = new Skill("Salamander", 50, 1, 150, 75, {"Heat Resistance": -0.25, "Cold Resistance": -0.25, "Food Consumption": -0.25});
    let eel = new Skill("Eel", 50, 1, 275, 75, {});
    let lizard = new Skill("Lizard", 50, 1, 350, 75, {});
    let turtle = new Skill("Turtle", 50, 1, 450, 75, {});
    let opossum = new Skill("Opossum", 50, 1, 650, 75, {});

    // Tier 2
    let worm = new Skill("Worm", 100, 2, 75, 125, {});
    let frog = new Skill("Frog", 100, 2, 175, 125, {});
    let snake = new Skill("Snake", 100, 2, 325, 125, {});
    let bird = new Skill("Bird", 100, 2, 400, 125, {});
    let hippo = new Skill("Hippo", 100, 2, 525, 125, {});
    let zebra = new Skill("Zebra", 100, 2, 650, 125, {});
    let rodent = new Skill("Rodent", 100, 2, 750, 125, {});

    // Tier 3
    let ant = new Skill("Ant", 200, 3, 50, 175, {});
    let moth = new Skill("Moth", 200, 3, 125, 175, {});
    let waterSnake = new Skill("Water Snake", 200, 3, 250, 175, {});
    let dinosaur = new Skill("Dinosaur", 200, 3, 325, 175, {});
    let penguin = new Skill("Penguin", 200, 3, 400, 175, {});
    let dolphin = new Skill("Dolphin", 200, 3, 475, 175, {});
    let seal = new Skill("Seal", 200, 3, 525, 175, {});
    let deer = new Skill("Deer", 200, 3, 600, 175, {});
    let bison = new Skill("Bison", 200, 3, 650, 175, {});
    let pangolin = new Skill("Pangolin", 200, 3, 700, 175, {});
    let monkey = new Skill("Monkey", 200, 3, 775, 175, {});
    // Tier 4
    let beetle = new Skill("Beetle", 400, 4, 50, 225, {});
    let dragonfly = new Skill("Dragonfly", 400, 4, 150, 225, {});
    let crocodile = new Skill("Crocodile", 400, 4, 275, 225, {});
    let chicken = new Skill("Chicken", 400, 4, 375, 225, {});
    let beakedDolphin = new Skill("Beaked Dolphin", 400, 4, 450, 225, {});
    let walrus = new Skill("Walrus", 400, 4, 550, 225, {});
    let sheep = new Skill("Sheep", 400, 4, 650, 225, {});
    let bat = new Skill("Bat", 400, 4, 700, 225, {});
    let chimpanzee = new Skill("Chimpanzee", 400, 4, 775, 225, {});
    // Tier 5
    let spider = new Skill("Spider", 800, 5, 100, 275, {});
    let komodoDragon = new Skill("Komodo Dragon", 800, 5, 250, 275, {});
    let lobster = new Skill("Lobster", 800, 5, 450, 275, {});
    let seaHorse = new Skill("Sea Horse", 800, 5, 525, 275, {});
    let horse = new Skill("Horse", 800, 5, 600, 275, {});
    let woolyBat = new Skill("Wooly Bat", 800, 5, 675, 275, {});
    let human = new Skill("Human", 800, 5, 750, 275, {});
    // Tier 6
    let spiderCrab = new Skill("Spider Crab", 1000, 6, 150, 325, {});
    let hermitCrab = new Skill("Hermit Crab", 1000, 6, 350, 325, {});
    let horseCrab = new Skill("Horse Crab", 1000, 6, 500, 325, {});
    let sheepCrab = new Skill("Sheep Crab", 1000, 6, 600, 325, {});
    let landCrab = new Skill("Land Crab", 1000, 6, 700, 325, {});
    // Tier 7
    let kingCrab = new Skill("King Crab", 1000, 7, 400, 375, {});


    // Connections
    // Tier 0
    fish.addChildren([salamander, eel, lizard, turtle, opossum])
    // Tier 1
    salamander.addChildren([worm, frog]);
    eel.addChildren([snake]);
    lizard.addChildren([snake]);
    turtle.addChildren([bird]);
    opossum.addChildren([hippo, zebra, rodent]);
    // Tier 2
    worm.addChildren([ant, moth]);
    frog.addChildren([waterSnake]);
    snake.addChildren([waterSnake, dinosaur]);
    bird.addChildren([dinosaur, penguin]);
    hippo.addChildren([dolphin, seal]);
    zebra.addChildren([deer, bison, pangolin]);
    rodent.addChildren([monkey]);
    // Tier 3
    ant.addChildren([beetle]);
    moth.addChildren([dragonfly]);
    waterSnake.addChildren([crocodile]);
    dinosaur.addChildren([crocodile, chicken]);
    penguin.addChildren([chicken, beakedDolphin]);
    dolphin.addChildren([beakedDolphin, walrus]);
    seal.addChildren([walrus]);
    deer.addChildren([walrus, sheep]);
    bison.addChildren([sheep]);
    pangolin.addChildren([bat]);
    monkey.addChildren([chimpanzee]);
    // Tier 4
    beetle.addChildren([spider]);
    dragonfly.addChildren([spider, komodoDragon]);
    crocodile.addChildren([komodoDragon]);
    chicken.addChildren([komodoDragon]);
    beakedDolphin.addChildren([lobster]);
    walrus.addChildren([seaHorse]);
    sheep.addChildren([horse,woolyBat]);
    bat.addChildren([woolyBat]);
    chimpanzee.addChildren([human]);
    // Tier 5
    spider.addChildren([spiderCrab]);
    komodoDragon.addChildren([hermitCrab]);
    lobster.addChildren([hermitCrab]);
    seaHorse.addChildren([horseCrab]);
    horse.addChildren([horseCrab]);
    woolyBat.addChildren([sheepCrab]);
    human.addChildren([landCrab]);
    // Tier 6
    spiderCrab.addChildren([kingCrab]);
    hermitCrab.addChildren([kingCrab]);
    horseCrab.addChildren([kingCrab]);
    sheepCrab.addChildren([kingCrab]);
    landCrab.addChildren([kingCrab]);

    this.skills = [
      fish, // Tier 0
      salamander, eel, lizard, turtle, opossum, // Tier 1
      worm, frog, snake, bird, hippo, zebra, rodent, // Tier 2
      ant, moth, waterSnake, dinosaur, penguin, dolphin, seal, deer, bison, pangolin, monkey, // Tier 3
      beetle, dragonfly, crocodile, chicken, beakedDolphin, walrus, sheep, bat, chimpanzee, // Tier 4
      spider, komodoDragon, lobster, seaHorse, horse, woolyBat, human, // Tier 5
      spiderCrab, hermitCrab, horseCrab, sheepCrab, landCrab, // Tier 6
      kingCrab // Tier 7
    ]
   

    
  }

  show() {

    fill(150);
    rect(0, 0, 800, 500);

    // Close Button
    fill(230);
    rect(780, 0, 20, 20);
    fill(0);
    text("x", 788, 12);
    
    //knowledge
    fill(255,255,255,100);
    rect(0, 474, 125, 25);
    fill(0);
    text("Knowledge: " + this.knowledge, 5, 490);

    //View Stats
    fill(255, 255, 255, 100);
    rect(125, 474, 75, 25);
    fill(0);
    text("Stats", 130, 490);
    
  }


  clicked(mouseX, mouseY) {
    // Close Tree
    if (mouseX > 775 && mouseX < 800 && mouseY > 0 && mouseY < 25) {
      return true;
    }
    return false;
  }
  addSkill(skill) {
    this.skills.push(skill);
  }

  getSkills() {
    return this.skills;
  }

  hover(mouseX, mouseY) {
    // View Stats
    if (mouseX > 125 && mouseX < 200 && mouseY > 474 && mouseY < 500) {
      fill(255);
      rect(650, 350, 300, 150);
      fill(0);
      let multiplierText = "";
      for (let key in this.multipliers) {
        if (this.multipliers[key] > 1.0) {
          multiplierText += key + ":  +" + 100 * (this.multipliers[key] - 1.0) + "%\n";
        } else {
          multiplierText += key + ": -" + Math.trunc(100 * (1 - this.multipliers[key]), 2) + "%\n";
        }

      }
      this.description =
        multiplierText;
      text(this.description, 660, 370);
      return true;
    }
  }
}