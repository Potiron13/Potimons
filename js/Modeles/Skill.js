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

class EnnemieSkill {
    constructor(id, chance) {
        this.skill = fetchSkill(id);
        this.chance = chance;
    }
}

class ViewModelSkill {
    constructor (skill) {
        this.id = skill.id;
        this.name = skill.name;
        this.type = skill.type;
    }
}

AllSkills = [new Skill('griffe', 'griffe', 1, 'corpsACorps', 500),
            new Skill('morsure', 'morsure', 2, 'corpsACorps', 500),
            new Skill('fireBall', 'fireBall', 2, 'magie', 1000, 100),
            new Skill('aquaBall', 'aquaBall', 2, 'magie', 1000, 100),
            new Skill('charge', 'charge', 10, 'corpsACorps', 250),
            new Skill('capture', 'capture', 0, 'dressage', 1000)];

function mapSkillViewModel (skills) {
    var result = [];
    $.each(skills, function(index) {
        result.push(new ViewModelSkill(skills[index]))
    });

    return result;
}

function fetchSkills(skillsId) {
    result = [];
    $.each(skillsId, function(index) {
        result.push(AllSkills.find(x=>x.id == skillsId[index]));
    });

    return result;
}

function fetchSkill(skillId) {
    return AllSkills.find(x=>x.id == skillId);
}
