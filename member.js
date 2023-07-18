function skillsMember() {
    var skills = ['HTML', 'CSS', 'JS', 'PHP', 'Python', 'Ruby', 'C#', 'C++', 'Java'];
    var totalSkills = skills.length;
    var randomSkill = Math.floor(Math.random() * totalSkills);
    var randomSkillName = skills[randomSkill];
    return randomSkillName;
}