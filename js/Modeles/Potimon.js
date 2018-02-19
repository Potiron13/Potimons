
class BasePotimon {
    constructor(id, name, hp, mana, attaque, defence, specialAttaque, specialDefence, speed, type,
         evolution, evolutionLevel, experienceDonnee, futureSkills){
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.mana = mana;
        this.attaque = attaque;
        this.defence = defence;
        this.specialAttaque = specialAttaque;
        this.specialDefence = specialDefence;
        this.speed = speed;
        this.type = type;
        this.evolution = evolution;
        this.evolutionLevel = evolutionLevel;
        this.experienceDonnee = experienceDonnee;
        this.src = getSrc(name);
        this.srcDos = getSrcDos(this.src);
        this.srcPortrait = getSrcPortrait(this.src);
        this.futureSkills = futureSkills;
    }
}

class Potimon extends BasePotimon {
    constructor(basePotimon, level, experience, currentHp, currentMana, gentil, skills, etat) {
        super(basePotimon.id, basePotimon.name, basePotimon.hp, basePotimon.mana, basePotimon.attaque,
             basePotimon.defence, basePotimon.specialAttaque, basePotimon.specialDefence, basePotimon.speed,
             basePotimon.type, basePotimon.evolution, basePotimon.evolutionLevel, basePotimon.experienceDonnee,
             basePotimon.futureSkills);
        this.hp = getStatHp(basePotimon.hp, level);
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
    result = {};
    var skills = [];
    var gentil = gentil;
    var basePotimon = getBasePotimonByName(name);
    result = new Potimon(basePotimon, level, 0, 0, 0, gentil, skills, null);
    result.currentHp = result.hp;
    result.currentMana = result.mana;
    result.id = guidGenerator();
    for (var i = 0; i < level; i++) {
        result = incrementerLevel(result);
    }

    return result;
}

function incrementerLevel(potimon, learnedSkills) {
    var basePotimon = getBasePotimonByName(potimon.name);
    var futureSkills = basePotimon.futureSkills;
    potimon.experience = 0;
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
    if (isReadyToEvolve(potimon)) {
        evolution(potimon);
    }

    return potimon;
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

function evolution(player) {
    var level = player.level;
    var playerData = getPlayerDataFromMonsterList(player.evolution);
    player.id = playerData.name + guidGenerator()
    player.level = 0;
    player.experience = 0;
    player.experienceNextLevel = 0;
    player.name = playerData.name;
    player.hp = playerData.hpLevelOne;
    player.currentHp = playerData.hpLevelOne;
    player.mana = playerData.manaLevelOne;
    player.currentMana = playerData.manaLevelOne;
    player.force = playerData.forceLevelOne;
    player.magie = playerData.magieLevelOne;
    player.src = getSrc(player.name);
    player.srcDos = getSrcDos(player.src);
    player.srcPortrait = getSrcPortrait(player.src);
    player.catClass = playerData.catClass;
    player.evolution = playerData.evolution;
    player.evolutionLevel = playerData.evolutionLevel;
    for (var i = 0; i < level; i++) {
        incrementerLevel(player);
    }
    if (player.gentil) {
        initialiserEvolutionMenu(player);
    }

    return player
}
