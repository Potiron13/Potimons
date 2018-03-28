class Skill {
    constructor(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, difficulty, elementTypeId, accuracy, targetId) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.type = type;
        this.src = 'Images/Skills/' + id + '.gif';
        this.animation = animation;
        this.animationType = animationType;
        this.duration = duration;
        this.manaCost = manaCost;
        this.multiTarget = multiTarget;
        this.difficulty = difficulty;
        this.elementTypeId = elementTypeId;
        this.accuracy = accuracy;
        this.targetId = targetId;
    }
}

class EffectAlteration extends Skill {
    constructor(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, difficulty, elementTypeId, accuracy, targetId, effect) {
        super(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, difficulty, elementTypeId, accuracy, targetId)
        this.effect = effect;
    }
}

class Debuff extends Skill {
    constructor(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, difficulty, elementTypeId, accuracy, targetId, stat, percentage) {
        super(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, difficulty, elementTypeId, accuracy, targetId);
        this.stat = stat;
        this.percentage = percentage;
    }
}

class Buff extends Skill {
    constructor(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, difficulty, elementTypeId, accuracy, targetId, stat, percentage) {
        super(id, name, power, type, animation, animationType, duration, manaCost, multiTarget, difficulty, elementTypeId, accuracy, targetId);
        this.stat = stat;
        this.percentage = percentage;
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

var AllSkills = [
    //id, name, power, type, animation, animationType, duration, manaCost, multiTarget, difficulty, elementTypeId, accuracy, targetId
    //carapuce
    new Skill(33, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  1, 1, 1, 1),
    new Debuff(39, strMimiQueue, 0, strCorpsACorps, animateOverHeadWithSequence, '', 1000, 0, false,  1, 1, 1, 1, 'defence', 0.1),
    new Skill(44, strMorsure, 60, strCorpsACorps, animateCorpsACorps, '', 1000, 0, false,  2, 1, 1, 1),
    new Skill(55, strPistoletAO, 40, strMagie, animateOverHead, '', 1500, 5, false,  1, 11, 1, 1),
    new Skill(56, strHydroCanon, 110, strMagie, animateRay, '', 1000, 0, false,  3, 10, 0.8, 1),
    new Buff(110, strRepli, 0, strCorpsACorps, animateOverHeadWithSequence, '', 1000, 0, false,  2, 1, 1, 0, 'defence', 0.1),
    new Skill(130, strCoupDeTete, 130, strCorpsACorps, animateOverHead, '', 1000, 0, false,  2, 1, 1, 1),
    new Debuff(145, strBulleDO, 40, strMagie, animateProjectil, '', 1000, 0, false,  2, 11, 1, 1, 'speed', 0.1),
    //salameche
    new Skill(10, strGriffe, 40, strCorpsACorps, animateOverHead, '', 1000, 0, false,  1, 1, 1, 1),
    new Debuff(43, strGrozyeux, 0, strCorpsACorps, animateOverHead, '', 1000, 0, false,  1, 1, 1, 1, 'defence', 0.1),
    new Debuff(45, strRugissement, 0, strCorpsACorps, animateProjectil, '', 1000, 0, false,  1, 1, 1, 1, 'attaque', 0.1),
    new Skill(52, strFlammeche, 40, strMagie, animateOverHead, '', 1500, 5, false,  1, 10, 1, 1),
    new Skill(53, strLanceFlame, 90, strMagie, animateRay, '', 1000, 10, false,  2, 10, 1, 1),
    new Skill(83, strDanceFlamme, 110, strMagie, animateProjectil, '', 1000, 20, false,  3, 10, 1, 1),
    new Skill(99, strCoupDeQueue, 55, strCorpsACorps, animateOverHead, '', 1000, 0, false,  2, 1, 1, 1),
    new Skill(163, strTranche, 70, strCorpsACorps, animateOverHead, '', 1000, 0, false,  1, 1, 1, 1),

    //ratata
    new Skill(98, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),
    new Skill(116, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),
    new Skill(158, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),
    new Skill(162, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),   
    // roucool
    new Skill(16, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),
    new Skill(17, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),
    new Skill(18, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),
    new Skill(28, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),   
    new Skill(97, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),
    new Skill(119, strCharge, 40, strCorpsACorps, animateCharge, '', 1000, 0, false,  2, 10, 1, 1),        
    /*new Skill(strGriffe, strGriffe, 40, 'corpsACorps', animateCorpsACorps, '', 1000, 0, false, null, 1, 10),
    new Skill(strBalayage, strBalayage, 1, 'corpsACorps', animateCorpsACorps, '', 1000, 0, true, null, 3, 10),
    new Skill(strMorsure, strMorsure, 2, 'corpsACorps', animateCorpsACorps, '', 1000, 0, false, null, 2, 10),
    new Skill(strFireBall, strFireBall, 40, 'magie', animateProjectil, strProjectil, 1000, 10, false, null, 1, 7),
    new Skill(strLanceFlame, strLanceFlame, 2, 'magie', animateProjectil, strProjectil, 1000, 20, true, null, 2, 7),
    //new Skill(strLanceFeuille, strLanceFeuille, 3, 'magie', animateProjectil, strProjectil, 1000, 10, false, null, 1),
    new Skill(strAquaBall, strAquaBall, 40, 'magie', animateProjectil, strProjectil, 1000, 10, false, null, 1, 4),
    new Skill(strPotiball, strPotiball, 0, 'corpsACorps', animateProjectil, strProjectil, 1000, 0, false, 'Capture', 2),*/
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
