class SkillTree {
  constructor() {
    this.unlocked = [false, false, false, false, false, false, false];
  }

  addSkill(skill) {
    this.skills.push(skill);
  }

  getSkills() {
    return this.skills;
  }
}