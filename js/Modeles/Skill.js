class Skill {
    constructor(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, effect) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.type = type;
        this.src = 'Images/Skills/' + name + '.png';
        this.animation = animation;
        this.animationType = animationType;
        this.duration = duration;
        this.manaCost = manaCost;
        this.multiTarget = multiTarget;
        this.effect = effect;
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
        this.manaCost = skill.manaCost;
        this.multiTarget = skill.multiTarget ? 'Multi target' : 'Single target';
        this.effect = skill.effect;
    }
}

var AllSkills = [new Skill(strGriffe, strGriffe, 1, 'corpsACorps', animateCorpsACorps, '', 1000, 0, false),
            new Skill(strCharge, strCharge, 3, 'corpsACorps', animateCharge, '', 1000, 0, false),
            new Skill(strMorsure, strMorsure, 2, 'corpsACorps', animateCorpsACorps, '', 1000, 0, false),
            new Skill(strFireBall, strFireBall, 2, 'magie', animateProjectil, strProjectil, 1000, 10, false),
            new Skill(strLanceFlame, strLanceFlame, 2, 'magie', animateProjectil, strProjectil, 1000, 1, true),
            new Skill(strLanceFeuille, strLanceFeuille, 3, 'magie', animateProjectil, strProjectil, 1000, 10, false),
            new Skill(strAquaBall, strAquaBall, 2, 'magie', animateProjectil, strProjectil, 1000, 10, false),
            new Skill(strChanter, strChanter, 2, 'corpsACorps', animateProjectil, strProjectil, 5000, 20, false),
            new Skill(strHypercut, strHypercut, 3, 'corpsACorps', animateCorpsACorps, '', 5000, 0, false),
            new Skill(strCapture, strCapture, 0, 'corpsACorps', animateProjectil, strProjectil, 1000, 0, false, 'Capture'),
            new Skill(strPoison, strPoison, 0, 'corpsACorps', animateProjectil, strProjectil, 1000, 0, false, strPoison)];

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
