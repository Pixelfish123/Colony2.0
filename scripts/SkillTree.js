class SkillTree {
  constructor() {
    this.unlocked = [false, false, false, false, false, false, false];


    // Modal content
    // let modalContent = createDiv('This is a p5.js modal! Click the close button to close it.');
    // modalContent.class('modal-content');
    // this.modal.child(modalContent);

   

    
  }

  show() {
    fill(255);
    rect(0, 0, 800, 500);
    

    // Close Button
 
    fill(255);
    rect(780, 0, 20, 20);
    fill(0);
    text("x", 788, 12 );

    
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
    // EMPTY
  }
}