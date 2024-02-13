let visible = [];
let bts = [];
let skillTree;
let hud;
function setup() {
  createCanvas(800, 500);
  let upgradeEfficiency = [0, 1.0, 1.25, 1.5, 1.8, 2.2, 2.6, 3.0];
  let upgradeEfficiencyCity = [0, 50, 100, 150, 200, 250, 300, 400];
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
  skillTree.activeSkills.forEach(skill => {
    let keys = Object.keys(skill.multipliers);
    keys.forEach(key => {
      if (skill.multipliers[key] > 1.0) {
        hud[key] *= skill.multipliers[key];
      } else {
        hud[key] /= skill.multipliers[key];
      }
    });
  });
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
        if (targetedBuilding.level < targetedBuilding.upgrades.length && hud.gold >= targetedBuilding.upgrades[targetedBuilding.level]) {
          hud.gold -= targetedBuilding.upgrades[targetedBuilding.level];
          console.log("Upgraded " + targetedBuilding.name);
          targetedBuilding.level++;
          if (targetedBuilding.name == "City") {
            hud.capacity = targetedBuilding.efficiency[targetedBuilding.level];
          }

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
        visible[i].gold += Math.floor(mines.workers * mines.efficiency[mines.level] * skillTree.multipliers["Efficiency"]);
        // Knowledge gained from research
        visible[i].knowledge += Math.floor(research.workers * research.efficiency[research.level] * skillTree.multipliers["Intelligence"]);
        // Food gained from farms
        let numFarmers = farms.workers;
        
        // Population growth

        let foodNeeded = visible[i].population * skillTree.multipliers["Food Consumption"];
        if (foodNeeded < visible[i].food) {
          console.log("Growing population")
          let extraFood = visible[i].food - foodNeeded;
          let newPeople = Math.min(visible[i].capacity - visible[i].population,Math.floor(3* extraFood / 10) * skillTree.multipliers["Fecundity"]); // Grow population by 30% of the extra food
          visible[i].available += newPeople;
          visible[i].population = mines.workers + farms.workers + research.workers + visible[i].available;
        } else if (foodNeeded > visible[i].food) {
          console.log("Starving population")
          let missingFood = foodNeeded - visible[i].food;
          console.log(missingFood);
          // Percent of people who will die
          let deathRate = (missingFood / visible[i].population)/2;
          console.log(deathRate);
          mines.workers -= Math.ceil(mines.workers * deathRate);
          farms.workers -= Math.ceil(farms.workers * deathRate);
          research.workers -= Math.ceil(research.workers * deathRate);
          visible[i].available -= Math.ceil(visible[i].available * deathRate);
          visible[i].population = mines.workers + farms.workers + research.workers + visible[i].available;
          foodNeeded -= missingFood;
        }

        // Deplete food
        visible[i].food -= foodNeeded;

        // Now gain food
        visible[i].food += Math.floor(numFarmers* farms.efficiency[farms.level] * skillTree.multipliers["Productivity"]);

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
          skillTree.activeSkills.push(skill);
          if (skill.name == "King Crab") {
            console.log("You WIN!");
          }
        }
      }
    }

  }
}

function checkWin() {
  if (visible[0] instanceof SkillTree) {
    return;
  }
  if (hud.population <= 0) {
    console.log("Game over");
  }
  // if (skillTree.unlocked[skillTree.unlocked.length - 1]) {
  //   console.log("You win!");
  // }
}
