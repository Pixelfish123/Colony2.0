let visible = [];
let bts = [];
let skillTree;
let hud;
function setup() {
  createCanvas(800, 500);
  let upgradeEfficiency = [0, 1.0, 1.25, 1.5, 1.8, 2.2, 2.6];
  let upgradeEfficiencyCity = [0, 50, 100, 150, 200, 250, 300];
  // Mines
  visible.push(new Building("Mines", 100, 100, 50, 50, upgradeEfficiency));

  // Farm
  visible.push(new Building("Farm", 100, 300, 50, 50, upgradeEfficiency));

  // Research
  visible.push(new Building("Research", 500, 100, 50, 50, upgradeEfficiency));

  // City
  visible.push(new Building("City", 500, 300, 50, 50, upgradeEfficiencyCity));

  // HUD
  hud = new HUD(population = 40, capacity=50, money = 100, food = 100);
  visible.push(hud);

  skillTree = new SkillTree();
}

function draw() {
  background(220);
  skillTree.knowledge = hud.knowledge;
  for (let i = 0; i < visible.length; i++) {
    visible[i].show();
    visible[i].hover(mouseX, mouseY);
  }
  checkWin();


  
}
function mouseClicked(){
  for (let i = 0; i < visible.length; i++) {

    // If building is clicked: show upgrade buttons
    if (visible[i] instanceof Building) {

      if (visible[i].clicked(mouseX, mouseY)) {
        if (visible[i].selected) {
          visible[i].selected = false;
          // remove upgrade buttons
          visible = visible.filter((element) => {
            return !(element instanceof AddButton || element instanceof UpgradeButton);
          });
        } else {
          visible[i].selected = true;

          // remove upgrade buttons from other buildings too
          visible = visible.filter((element) => {
            return !(element instanceof AddButton || element instanceof UpgradeButton);
          });
          visible[i].clicked(mouseX, mouseY).forEach((element) => {
            visible.push(element);
          });
        }
      
      } 
    }

    // If Upgrade Button
    if (visible[i] instanceof UpgradeButton) {
      if (visible[i].clicked(mouseX, mouseY)) {
        let targetedBuilding = visible.find((element) => {
          return (element.name == visible[i].name && element instanceof Building);
        });
        let hud = visible.find((element) => {
          return (element instanceof HUD);
        });
        if (targetedBuilding.level < targetedBuilding.upgrades.length && hud.gold >= targetedBuilding.upgrades[targetedBuilding.level - 1]) {
          hud.gold -= targetedBuilding.upgrades[targetedBuilding.level];
          console.log("Upgraded " + targetedBuilding.name);
          if (targetedBuilding.name == "City") {
            hud.capacity = targetedBuilding.efficiency[targetedBuilding.level];
          }
          targetedBuilding.level++;

        }
      }
    }

    // If Add Button
    if (visible[i] instanceof AddButton) {
      if (visible[i].clicked(mouseX, mouseY)) {
        let targetedBuilding = visible.find((element) => {
          return (element.name == visible[i].name && element instanceof Building);
        })
        let hud = visible.find((element) => {
          return (element instanceof HUD);
        });
        if (hud.available >= 10 && keyIsDown(SHIFT)) {
          hud.available-=10;
          targetedBuilding.workers+=10;
        } else if (hud.available > 0) {
          hud.available--;
          targetedBuilding.workers++;
        }
      }
    }

    // HUD
    if (visible[i] instanceof HUD) {

      // OPEN TREE
      if (visible[i].clicked(mouseX, mouseY) && visible[i].clicked(mouseX, mouseY)[0] == "Open Tree") {
        console.log("Open Tree");
        bts = visible;
        visible = [skillTree];
        skillTree.skills.forEach(skill => {
          visible.push(skill);
        });
      }

      // END TURN
      else if (visible[i].clicked(mouseX, mouseY)) {
        let mines = visible.find((element) => {
          return (element.name == "Mines" && element instanceof Building);
        });
        let farms = visible.find((element) => {
          return (element.name == "Farm" && element instanceof Building);
        });
        let research = visible.find((element) => {
          return (element.name == "Research" && element instanceof Building);
        });
        let city = visible.find((element) => {
          return (element.name == "City" && element instanceof Building);
        });

        visible[i].round++;

        // Gold gained from mines
        visible[i].gold += Math.floor(mines.workers * mines.efficiency[mines.level]);
        // Knowledge gained from research
        visible[i].knowledge += Math.floor(research.workers * research.efficiency[research.level]);
        // Food gained from farms
        visible[i].food += Math.floor(farms.workers * farms.efficiency[farms.level]);
        
        // Population growth
        if (visible[i].food > visible[i].population) {
          console.log("Growing population")
          let extraFood = visible[i].food - visible[i].population;
          let newPeople = Math.min(visible[i].capacity - visible[i].population,Math.floor(extraFood / 4)); // Grow population by 1/4 of the extra food
          visible[i].available += newPeople;
          visible[i].population = mines.workers + farms.workers + research.workers + visible[i].available;
        } else if (visible[i].food < visible[i].population) {
          console.log("Starving population")
          let missingFood = visible[i].population - visible[i].food;
          
          // Percent of people who will die
          let deathRate = (missingFood / visible[i].population);
          mines.workers -= Math.floor(mines.workers * deathRate);
          farms.workers -= Math.floor(farms.workers * deathRate);
          research.workers -= Math.floor(research.workers * deathRate);
          visible[i].available -= Math.floor(visible[i].available * deathRate);
          visible[i].population = mines.workers + farms.workers + research.workers + visible[i].available;
        }

        // Deplete food
        visible[i].food -= visible[i].population;

      }

      
      
    }

    // Skill Tree
    if (visible[i] instanceof SkillTree) {
      if (visible[i].clicked(mouseX, mouseY)) {
        console.log("Close Tree");
        visible = bts;
      }
    }

    // Unlock Skill
    if (visible[i] instanceof Skill) {
      let skill = visible[i];
      if (skill.clicked(mouseX, mouseY)) {
        let skillTier = skill.tier;
        if (!skillTree.unlocked[skillTier-1] && hud.knowledge >= skill.cost && skill.parent.some((parent) => {return parent.unlocked;})) {
          console.log("Unlock " + skill.name)

          skillTree.unlocked[skillTier-1] = true;
          skill.unlocked = true;
          hud.knowledge -= skill.cost;
     
        }
      }
    }

  }
}

function checkWin() {
  if (visible[0] instanceof SkillTree) {
    return;
  }
  let hud = visible.find((element) => {
    return (element instanceof HUD);
  });
  if (hud.population <= 0) {
    console.log("Game over");
  }
  if (skillTree.unlocked[skillTree.unlocked.length - 1]) {
    console.log("You win!");
  }
}
