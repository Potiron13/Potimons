class Skill {
    constructor(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, effect, difficulty, elementTypeId) {
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
        this.difficulty = difficulty;
        this.elementTypeId = elementTypeId;
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

var AllSkills = [new Skill(strGriffe, strGriffe, 40, 'corpsACorps', animateCorpsACorps, '', 1000, 0, false, null, 1, 10),
            new Skill(strBalayage, strBalayage, 1, 'corpsACorps', animateCorpsACorps, '', 1000, 0, true, null, 3, 10),
            new Skill(strCharge, strCharge, 3, 'corpsACorps', animateCharge, '', 1000, 0, false, null, 2, 10),
            new Skill(strMorsure, strMorsure, 2, 'corpsACorps', animateCorpsACorps, '', 1000, 0, false, null, 2, 10),
            new Skill(strFireBall, strFireBall, 40, 'magie', animateProjectil, strProjectil, 1000, 10, false, null, 1, 7),
            new Skill(strLanceFlame, strLanceFlame, 2, 'magie', animateProjectil, strProjectil, 1000, 20, true, null, 2, 7),
            //new Skill(strLanceFeuille, strLanceFeuille, 3, 'magie', animateProjectil, strProjectil, 1000, 10, false, null, 1),
            new Skill(strAquaBall, strAquaBall, 40, 'magie', animateProjectil, strProjectil, 1000, 10, false, null, 1, 4),
            new Skill(strPotiball, strPotiball, 0, 'corpsACorps', animateProjectil, strProjectil, 1000, 0, false, 'Capture', 2),
            //new Skill(strJetDeVenin, strJetDeVenin, 0, 'magie', animateProjectil, strProjectil, 1000, 8, true, strPoison, 2),
            //new Skill(strPoison, strPoison, 0, 'magie', animateProjectil, strProjectil, 1000, 4, false, strPoison, 1)];
        ];

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
