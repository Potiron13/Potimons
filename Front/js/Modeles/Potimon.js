
class BasePotimon {
    constructor(id, name, experienceDonnee,hp, attaque, defence, specialAttaque, specialDefence, speed, elementTypeId,
         evolution, evolutionLevel, futureSkills, tauxDeCapture, description, height){
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.attaque = attaque;
        this.defence = defence;
        this.specialAttaque = specialAttaque;
        this.specialDefence = specialDefence;
        this.speed = speed;
        this.elementTypeId = elementTypeId;
        this.evolution = evolution;
        this.evolutionLevel = evolutionLevel;
        this.experienceDonnee = experienceDonnee;
        this.src = getSrc(id);
        this.srcDos = getSrcDos(this.src);
        this.srcPortrait = getSrcPortrait(this.src);
        this.futureSkills = futureSkills;
        this.tauxDeCapture = tauxDeCapture;
        this.description = description;
        this.height = height;
    }
}

class Potimon extends BasePotimon {
    constructor(basePotimon, level, experience, currentHp, currentMana, gentil, skills, etat) {
        super(basePotimon.id, basePotimon.name, basePotimon.experienceDonnee, basePotimon.hp,
             basePotimon.attaque, basePotimon.defence, basePotimon.specialAttaque, basePotimon.specialDefence, 
             basePotimon.speed, basePotimon.elementTypeId, basePotimon.evolution, basePotimon.evolutionLevel, 
             basePotimon.futureSkills, basePotimon.tauxDeCapture, basePotimon.description, basePotimon.height);
        this.hp = getStatHp(basePotimon.hp, level);
        this.mana = getStatMana(basePotimon.specialAttaque, basePotimon.specialDefence, level);
        this.attaque = getStat(basePotimon.attaque, level);
        this.defence = getStat(basePotimon.defence, level);
        this.specialAttaque = getStat(basePotimon.specialAttaque, level);
        this.specialDefence = getStat(basePotimon.specialDefence, level);
        this.speed = getStat(basePotimon.speed, level);
        this.level = level;
        this.experience = experience;
        this.experienceNextLevel = Math.pow(level + 1, 3);
        this.currentHp = currentHp;
        this.currentMana = currentMana;
        this.gentil = gentil;
        this.skills = skills;
        this.etat = etat;
        this.baseId = basePotimon.id;
    }
}

function instancierInGamePotimon(id, level, gentil) {
    var inGamePotimon = {};
    return getPotimonById(id).then(function(potimon){        
        var basePotimon = mapBasePotimon(potimon);
        inGamePotimon = new Potimon(basePotimon, level, 0, 0, 0, gentil, [], null);        
        inGamePotimon.currentHp = inGamePotimon.hp;
        inGamePotimon.currentMana = inGamePotimon.mana;
        inGamePotimon.id = guidGenerator();
        setSkillsByLevel(inGamePotimon, basePotimon);

        return inGamePotimon;
    });
}

function instancierMultipleInGameEnnemiePotimon(data, controllerCombat) {    
    var requests = [];
    var levels = [];
    for (let i = 0; i < data.length; i++) {
        requests.push(getPotimonById(data[i].id));   
        levels.push(data[i].level);                     
    }
    $.when.apply($, requests).done(function () {        
        $.each(arguments, function (i, data) {
            var inGamePotimon = {};
            var basePotimon = mapBasePotimon(data);
            inGamePotimon = new Potimon(basePotimon, levels[i], 0, 0, 0, false, [], null);        
            inGamePotimon.currentHp = inGamePotimon.hp;
            inGamePotimon.currentMana = inGamePotimon.mana;
            inGamePotimon.id = guidGenerator();    
            setSkillsByLevel(inGamePotimon, basePotimon);
            controllerCombat.listPlayer.push(inGamePotimon);
            controllerCombat.listEnnemies.push(inGamePotimon);
            controllerCombat.listEnnemiesTotal.push(inGamePotimon);
            controllerCombat.listPlayer.sort(function(a, b){ return b.speed - a.speed});
            controllerCombat.listEnnemies.sort(function(a, b){ return b.speed - a.speed});
            controllerCombat.listEquipe.sort(function(a, b){ return b.speed - a.speed});                     
        });
        controllerCombat.combat();
    });
}

function setSkillsByLevel(potimon, basePotimon, learnedSkills) {    
    var futureSkills = basePotimon.futureSkills;     
    for (var i = 0; i < potimon.level; i++) {              
        $.each(futureSkills, function(index){                
            if (potimon.skills.filter(x=>x.id == futureSkills[index].skill.id).length === 0) {
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
    
    return getPotimonById(potimon.baseId).then(function(potimonDb){
        var basePotimon = mapBasePotimon(potimonDb);
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
            evolution(potimon).then(function(){
                // do stuff
            });
        }
    
        return learnedSkills;
    });
}

function getSrc(id){
     return strPathImgMonstre + '/' + id + '.gif';
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
        this.Etat = player.etat;
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
    return getPotimonById(potimon.evolution).then(function(potimonDb){
        var basePotimon = mapBasePotimon(potimonDb);
        potimon.name = basePotimon.name;
        potimon.hp = getStatHp(basePotimon.hp, level);
        potimon.mana = getStatMana(basePotimon.specialAttaque, basePotimon.specialDefence, level);
        potimon.attaque = getStat(basePotimon.attaque, level);
        potimon.defence = getStat(basePotimon.defence, level);
        potimon.specialAttaque = getStat(basePotimon.specialAttaque, level);
        potimon.specialDefence = getStat(basePotimon.specialDefence, level);
        potimon.speed = getStat(basePotimon.speed, level);
        potimon.src = getSrc(basePotimon.id);
        potimon.srcDos = getSrcDos(basePotimon.src);
        potimon.srcPortrait = getSrcPortrait(basePotimon.src);
        potimon.elementTypeId = basePotimon.elementTypeId;
        potimon.evolution = basePotimon.evolution;
        potimon.evolutionLevel = basePotimon.evolutionLevel;
        potimon.description = basePotimon.description;
        if (potimon.gentil) {
            initialiserEvolutionMenu(potimon);
        }
        AddPotimonCapture(potimon.baseId);        
    });
}
