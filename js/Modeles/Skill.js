class Skill {
    constructor(id, name, power, type, duration, startingPosY) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.type = type;
        this.src = 'Images/' + name + '.png';
        this.duration = duration;
        this.startingPosY = startingPosY;
    }
}

class FutureSkill {
    constructor(skill, requiredLevel) {
        this.skill = skill;
        this.requiredLevel = requiredLevel;
    }
}

class ViewModelSkill {
    constructor (skill) {
        this.id = skill.id;
        this.name = skill.name;
        this.type = skill.type;
    }
}

function mapSkillViewModel (skills) {
    var result = [];
    $.each(skills, function(index) {
        result.push(new ViewModelSkill(skills[index]))
    });

    return result;
}
