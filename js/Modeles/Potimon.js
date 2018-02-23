
class BasePotimon {
    constructor(id, name, hp, mana, attaque, defence, specialAttaque, specialDefence, speed, elementTypeId,
         evolution, evolutionLevel, experienceDonnee, futureSkills, tauxDeCapture, description){
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.mana = mana;
        this.attaque = attaque;
        this.defence = defence;
        this.specialAttaque = specialAttaque;
        this.specialDefence = specialDefence;
        this.speed = speed;
        this.elementTypeId = elementTypeId;
        this.evolution = evolution;
        this.evolutionLevel = evolutionLevel;
        this.experienceDonnee = experienceDonnee;
        this.src = getSrc(name);
        this.srcDos = getSrcDos(this.src);
        this.srcPortrait = getSrcPortrait(this.src);
        this.futureSkills = futureSkills;
        this.tauxDeCapture = tauxDeCapture;
        this.description = description;
    }
}

class Potimon extends BasePotimon {
    constructor(basePotimon, level, experience, currentHp, currentMana, gentil, skills, etat) {
        super(basePotimon.id, basePotimon.name, basePotimon.hp, basePotimon.mana, basePotimon.attaque,
             basePotimon.defence, basePotimon.specialAttaque, basePotimon.specialDefence, basePotimon.speed,
             basePotimon.elementTypeId, basePotimon.evolution, basePotimon.evolutionLevel, basePotimon.experienceDonnee,
             basePotimon.futureSkills, basePotimon.tauxDeCapture, basePotimon.description);
        this.hp = getStatHp(basePotimon.hp, level);
        this.mana = getStatMana(basePotimon.specialAttaque, basePotimon.specialDefence, level);
        this.attaque = getStat(basePotimon.attaque, level);
        this.defence = getStat(basePotimon.defence, level);
        this.specialAttaque = getStat(basePotimon.specialAttaque, level);
        this.specialDefence = getStat(basePotimon.specialDefence, level);
        this.speed = getStat(basePotimon.speed, level);
        this.level = level;
        this.experience = experience;
        this.experienceNextLevel = Math.pow(this.level, 3);
        this.currentHp = currentHp;
        this.currentMana = currentMana;
        this.gentil = gentil;
        this.skills = skills;
        this.etat = etat;
    }
}

function instancierInGamePotimon(name, level, gentil) {
    var inGamePotimon = {};
    var skills = [];
    var gentil = gentil;
    var basePotimon = getBasePotimonByName(name);
    inGamePotimon = new Potimon(basePotimon, level, 0, 0, 0, gentil, skills, null);
    inGamePotimon.currentHp = inGamePotimon.hp;
    inGamePotimon.currentMana = inGamePotimon.mana;
    inGamePotimon.id = guidGenerator();
    inGamePotimon.experience = 0;
    setSkillsByLevel(inGamePotimon, basePotimon);

    return inGamePotimon;
}

function setSkillsByLevel(potimon, basePotimon, learnedSkills) {
    var futureSkills = basePotimon.futureSkills;
    for (var i = 0; i < potimon.level; i++) {
        $.each(futureSkills, function(index){
            if (potimon.skills.filter(x=>x.id == futureSkills[index].skill.id).length == 0) {
                if (futureSkills[index].requiredLevel <= potimon.level) {
                    potimon.skills.push(futureSkills[index].skill);
                    if (learnedSkills) {
                        learnedSkills.push(futureSkills[index].skill.name);
                    }
                }
            }
        });
    }

    return potimon;
}

function incrementerLevel(potimon){
    var learnedSkills = [];
    var basePotimon = getBasePotimonByName(potimon.name);
    potimon.level += 1;
    var level = potimon.level;
    potimon.hp = getStatHp(basePotimon.hp, level);
    potimon.mana = getStatMana(basePotimon.specialAttaque, basePotimon.specialDefence, level);
    potimon.attaque = getStat(basePotimon.attaque, level);
    potimon.defence = getStat(basePotimon.defence, level);
    potimon.specialAttaque = getStat(basePotimon.specialAttaque, level);
    potimon.specialDefence = getStat(basePotimon.specialDefence, level);
    potimon.speed = getStat(basePotimon.speed, level);
    potimon.experience = 0;
    potimon.experienceNextLevel = Math.pow(potimon.level, 3);
    potimon.currentHp = potimon.hp;
    potimon.currentMana = potimon.mana;
    setSkillsByLevel(potimon, basePotimon, learnedSkills);
    if (isReadyToEvolve(potimon)) {
        evolution(potimon);
    }

    return learnedSkills;
}

function getSrc(name){
     return strPathImgMonstre + '/' + name + '.gif';
}

function getSrcDos(src){
    return src.replace(strPathImgMonstre, strPathImgMonstreDos);
}

function getSrcPortrait(src) {
    return src.replace(strPathImgMonstre, strPathImgMonstreProtrait);
}

function getBasePotimonByName(name) {
    return basePotimonList.find(x=>x.name == name);
}

function getStatHp(basePotimonHp, level) {
    return  Math.round(basePotimonHp*2*level/100 + level + 10);
}

function getStatMana(basePotimonSpecialAttaque, basePotimonSpecialDefence, level) {
    return Math.round(((basePotimonSpecialAttaque + basePotimonSpecialDefence)/2)*level/100 + level + 10);
}

function getStat(basePotimonStat, level) {
    return  Math.round(basePotimonStat*2*level/100 + 5);
}

class ViewModelVictoirePlayer {
    constructor (player) {
        this.id = player.id
        this.Nom = player.name;
        this.ExperienceActuelle = player.experience;
        this.ExperienceSuivant = player.experienceNextLevel;
        this.Niveau = player.level;
        this.Portrait = player.srcPortrait;
    }
}

class ViewModelInfoPlayer {
    constructor (player) {
        this.id = player.id
        this.Nom = player.name;
        this.Hp = player.hp;
        this.CurrentHp = player.currentHp;
        this.Mana = player.mana;
        this.CurrentMana = player.currentMana;
        this.Niv = player.level;
    }
}

function isReadyToEvolve(player) {
    if (player.evolution) {
        if (player.level >= player.evolutionLevel) {
            return true;
        }
    }

    return false;
}

function evolution(potimon) {
    var level = potimon.level;
    var basePotimon = getBasePotimonByName(potimon.evolution);
    potimon.name = basePotimon.name;
    potimon.hp = getStatHp(basePotimon.hp, level);
    potimon.mana = getStatMana(basePotimon.specialAttaque, basePotimon.specialDefence, level);
    potimon.attaque = getStat(basePotimon.attaque, level);
    potimon.defence = getStat(basePotimon.defence, level);
    potimon.specialAttaque = getStat(basePotimon.specialAttaque, level);
    potimon.specialDefence = getStat(basePotimon.specialDefence, level);
    potimon.speed = getStat(basePotimon.speed, level);
    potimon.src = getSrc(basePotimon.name);
    potimon.srcDos = getSrcDos(basePotimon.src);
    potimon.srcPortrait = getSrcPortrait(basePotimon.src);
    potimon.elementTypeId = basePotimon.elementTypeId;
    potimon.evolution = basePotimon.evolution;
    potimon.evolutionLevel = basePotimon.evolutionLevel;
    potimon.description = basePotimon.description;
    if (potimon.gentil) {
        initialiserEvolutionMenu(potimon);
    }
    GetMonstresCapture().push(potimon.name);

    return potimon
}
