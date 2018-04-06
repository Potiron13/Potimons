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
    new Skill(44, strMorsure, 60, strCorpsACorps, animateOverHead, '', 1000, 0, false,  2, 1, 1, 1),
    new Skill(55, strPistoletAO, 40, strMagie, animateOverHead, '', 1500, 5, false,  1, 11, 1, 1),
    new Skill(56, strHydroCanon, 110, strMagie, animateRay, '', 1000, 20, false,  3, 10, 0.8, 1),
    new Buff(110, strRepli, 0, strCorpsACorps, animateOverHeadWithSequence, '', 1000, 0, false,  2, 1, 1, 0, 'defence', 0.1),
    new Skill(130, strCoupDeTete, 130, strCorpsACorps, animateOverHead, '', 1000, 0, false,  2, 1, 1, 1),
    new Debuff(145, strBulleDO, 40, strMagie, animateProjectil, '', 1000, 0, false,  2, 11, 1, 1, 'specialAttaque', 0.1),
    //salameche
    new Skill(10, strGriffe, 40, strCorpsACorps, animateOverHead, '', 1000, 0, false,  1, 1, 1, 1),
    new Debuff(43, strGrozyeux, 0, strCorpsACorps, animateOverHead, '', 1000, 0, false,  1, 1, 1, 1, 'defence', 0.1),
    new Debuff(45, strRugissement, 0, strCorpsACorps, animateProjectil, '', 1000, 0, false,  1, 1, 1, 1, 'attaque', 0.1),
    new Skill(52, strFlammeche, 40, strMagie, animateOverHead, '', 1500, 5, false,  1, 10, 1, 1),
    new Skill(53, strLanceFlame, 90, strMagie, animateRay, '', 1000, 10, false,  2, 10, 1, 1),
    new Skill(83, strDanceFlamme, 110, strMagie, animateProjectilWithSequence, '', 1000, 20, false,  3, 10, 0.85, 1),
    //new Skill(83, strDanceFlamme, 110, strMagie, animateProjectil, '', 1000, 20, false,  3, 10, 0.85, 1),
    new Skill(99, strCoupDeQueue, 55, strCorpsACorps, animateOverHead, '', 1000, 0, false,  2, 1, 1, 1),
    new Skill(163, strTranche, 70, strCorpsACorps, animateOverHead, '', 1000, 0, false,  3, 1, 1, 1),
    //bulbizar
    new EffectAlteration(73, strVampiGraine, 0, strMagie, animateProjectil, '', 1000, 10, false, 1, 12, 0.9, 1, 2),
    new Skill(22, strFouetLiane, 45, strMagie, animateOverHead, '', 1500, 5, false,  1, 12, 1, 1),
    new EffectAlteration(77, strPourdreDePoison, 0, strMagie, animateOverHead, '', 1000, 5, false,  2, 4, 0.75, 1, 1),
    new Skill(75, strTrancheHerbe, 55, strMagie, animateProjectil, '', 1000, 10, false,  2, 12, 0.95, 1),
    new Buff(74, strCroissance, 0, strMagie, animateOverHeadWithSequence, '', 1000, 5, false,  1, 1, 1, 0, 'specialAttaque', 0.1),
    new EffectAlteration(79, strPoudreDodo, 0, strMagie, animateOverHead, '', 1000, 10, false, 2, 1, 0.75, 1, 3),
    new Skill(76, strLanceSoleil, 110, strMagie, animateRay, '', 1000, 20, false,  3, 12, 0.8, 1),
    //ratata
    new Debuff(98, strViveAttaque, 40, strCorpsACorps, animateOverHead, '', 1000, 0, false,  1, 1, 1, 1, 'specialDefence', 0.1),
    new Buff(116, strPuissance, 0, strCorpsACorps, animateOverHeadWithSequence, '', 1000, 0, false,  2, 1, 1, 0, 'attaque', 0.1),
    new Debuff(158, strCrocDeMort, 80, strCorpsACorps, animateOverHead, '', 1000, 0, false,  2, 1, 0.9, 1, 'defence', 0.1),
    new Skill(162, strCrocFatal, 110, strCorpsACorps, animateOverHead, '', 1000, 0, false,  2, 10, 1, 1),   
    // roucool
    new Skill(16, strTornade, 40, strCorpsACorps, animateProjectil, '', 1000, 0, false,  2, 3, 1, 1),
    new Skill(17, strCruAile, 60, strCorpsACorps, animateOverHead, '', 1000, 0, false,  2, 3, 1, 1),
    new Debuff(18, strCyclone, 40, strMagie, animateProjectil, '', 1000, 20, true,  2, 10, 1, 1, 'evasion', 0.1),
    new Debuff(28, strJetDeSable, 0, strMagie, animateOverHead, '', 1000, 10, false,  2, 10, 1, 1, 'accuracy', 0.1),   
    new Buff(97, strHate, 0, strMagie, animateOverHeadWithSequence, '', 1000, 20, false,  2, 10, 1, 0, 'accuracy', 0.2),
    new Buff(119, strMiroir, 0, strMagie, animateOverHead, '', 1000, 30, true,  2, 10, 1, 0, 'specialDefence', 0.2),     
    // chenipan
    new Debuff(81, strSecretion, 0, strCorpsACorps, animateProjectil, '', 1000, 0, false,  1, 10, 1, 1, 'evasion', 0.1),
    new Buff(106, strArmure, 0, strCorpsACorps, animateOverHead, '', 1000, 0, false,  1, 1, 1, 0, 'defence', 0.1),
    new EffectAlteration(48, strSuperSonic, 0, strMagie, animateOverHead, '', 1000, 10, false, 2, 1, 0.55, 1, 4),
    new EffectAlteration(60, strRafalePsy, 65, strMagie, animateRay, '', 1000, 10, false, 2, 14, 1, 1, 5),
    new EffectAlteration(78, strParaSpore, 0, strMagie, animateOverHead, '', 1000, 10, false, 2, 12, 1, 1, 6),
    new EffectAlteration(93, strChocMental, 50, strMagie, animateOverHead, '', 1000, 0, false, 2, 14, 1, 1, 5),
    // aspicot
    new EffectAlteration(40, strDardVenin, 15, strCorpsACorps, animateCharge, '', 1000, 0, false, 1, 4, 1, 1, 7),
    new Skill(31, strFurie, 60, strCorpsACorps, animateProjectil, '', 1000, 0, false, 2, 1, 1, 1),   
    new EffectAlteration(41, strDoubleDard, 50, strCorpsACorps, animateCharge, '', 1000, 0, false, 1, 4, 1, 1, 8),
    new Skill(42, strDardNuee, 90, strCorpsACorps, animateProjectil, '', 1000, 0, true, 3, 7, 1, 1),
    // pikachu
    new EffectAlteration(84, strEclair, 40, strCorpsACorps, animateOverHead, '', 1000, 0, false, 1, 13, 1, 1, 9),
    new EffectAlteration(86, strCageEclair, 0, strMagie, animateOverHead, '', 1000, 10, false, 2, 13, 1, 1, 6),
    new EffectAlteration(87 , strTonnerre, 110, strCorpsACorps, animateOverHead, '', 1000, 20, false, 1, 13, 0.7, 1, 9),
    new Skill(129, strMeteor, 60, strMagie, animateProjectil, '', 1000, 10, true, 2, 1, 1, 1),
    // racaillou
    new Skill(88, strJetPierre, 50, strCorpsACorps, animateProjectil, '', 1000, 0, false, 1, 6, 0.9, 1),   
    new Skill(89, strSecousse, 100, strMagie, animateOverHead, '', 1000, 20, false, 1, 5, 1, 1),   
    new Buff(111, strBouleArmure, 0, strMagie, animateOverHead, '', 1000, 5, false,  2, 1, 1, 0, 'defence', 0.2),
    new Skill(120, strDestruction, 200, strCorpsACorps, animateOverHead, '', 1000, 0, false,  3, 1, 1, 1),
    new Skill(153, strExplosion, 250, strCorpsACorps, animateOverHead, '', 1000, 0, true,  3, 1, 1, 1),
    // onix
    new Skill(20, strConstriction, 50, strCorpsACorps, animateOverHead, '', 1000, 0, false, 1, 1, 0.8, 1),
    new Debuff(103, strHurlement, 0, strMagie, animateOverHead, '', 1000, 10, false,  2, 1, 0.85, 1, 'defence', 0.2),
    new Skill(21, strPlaquage, 80, strCorpsACorps, animateCharge, '', 1000, 0, false, 1, 1, 0.75, 1),
    // nosferapti
    new Skill(141, strAbsorb, 80, strCorpsACorps, animateLeech, '', 1000, 0, false, 1, 7, 1, 1),
    new EffectAlteration(109, strRayonFolie, 0, strMagie, animateRay, '', 1000, 10, false, 2, 8, 1, 1, 4),
    new Skill(114, strBrume, 0, strMagie, animateOverHead, '', 1000, 0, false, 1, 15, 1, 1),
    //divers
    new Skill(250, strLeech, 40, strMagie, animateLeech, '', 1000, 0, false,  1, 1, 1, 1),
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
