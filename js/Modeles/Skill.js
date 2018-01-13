class Skill {
    constructor(id, name, power, type, animation, animationType, duration) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.type = type;
        this.src = 'Images/' + name + '.png';
        this.animation = animation;
        this.animationType = animationType;
        this.duration = duration
    }
}

class FutureSkill {
    constructor(id, requiredLevel) {
        this.skill = fetchSkill(id);
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

var AllSkills = [new Skill(strGriffe, strGriffe, 1, 'corpsACorps', animateGriffe, '', 1000),
            new Skill(strCharge, strCharge, 1, 'corpsACorps', animateCharge, '', 1000),
            new Skill(strMorsure, strMorsure, 2, 'corpsACorps', 500),
            new Skill(strFireBall, strFireBall, 2, 'magie', animateProjectil, strProjectil, 1000),
            new Skill(strAquaBall, strAquaBall, 2, 'magie', 1000, 100),
            new Skill(strChanter, strChanter, 2, 'corpsACorps', 5000),
            new Skill(strHypercut, strHypercut, 3, 'corpsACorps', 5000),
            new Skill(strCapture, strCapture, 0, 'dressage', animateProjectil, strProjectil, 1000)];

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
