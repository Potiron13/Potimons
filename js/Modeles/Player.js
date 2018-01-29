class Player {
    constructor(id, name, level, experience, experienceNextLevel, currentHp, hp, currentMana, mana, force, magie, gentil, experienceDonnee, skills, catClass, evolution, evolutionLevel, loot, etat) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.experience = experience;
        this.experienceNextLevel = experienceNextLevel;
        this.currentHp = currentHp;
        this.hp = hp;
        this.currentMana = currentMana;
        this.mana = mana;
        this.force = force;
        this.magie = magie;
        this.gentil = gentil;
        this.experienceDonnee = experienceDonnee;
        this.src = strPathImgMonstre + '/' + name + '.png';
        this.srcDos = this.src.replace(strPathImgMonstre, strPathImgMonstreDos);
        this.srcPortrait = this.src.replace(strPathImgMonstre, strPathImgMonstreProtrait);
        this.skills = skills;
        this.catClass = catClass;
        this.evolution = evolution;
        this.evolutionLevel = evolutionLevel;
        this.etat = etat;
    }
}

class PlayerMonsterData {
    constructor(name, hpLevelOne, manaLevelOne, forceLevelOne, magieLevelOne,hp, force, magie, experienceNextLevel, experienceDonnee, catClass, evolution, evolutionLevel, futureSkills, loot) {
        this.name = name;
        this.hpLevelOne = hpLevelOne;
        this.manaLevelOne = manaLevelOne;
        this.forceLevelOne = forceLevelOne;
        this.magieLevelOne = magieLevelOne;
        this.hp = hp;
        this.force = force;
        this.magie = magie;
        this.experienceNextLevel = experienceNextLevel
        this.experienceDonnee = experienceDonnee
        this.catClass = catClass;
        this.evolution = evolution;
        this.evolutionLevel = evolutionLevel
        this.futureSkills = futureSkills;
        this.loot = loot;
    }
}

class EquipementList {
    constructor(arme, armure, collier) {
        this.arme = arme;
        this.armure = armure;
        this.collier = collier;
    }
}

class ViewModelPlayer {
    constructor (player) {
        this.id = player.id;
        this.Nom = player.name;
        this.Niveau = player.level;
        this.HpMax = player.hp;
        this.curHp = player.currentHp;
        this.Force = player.force;
        this.Magie = player.magie;
        this.Exp = player.experience;
        this.ExpNext = player.experienceNextLevel;
        this.catClass = player.catClass;        
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
    }
}

function instancierPlayer(name, level, gentil) {
    result = {};
    var skills = [];
    var gentil = gentil;
    var playerData = getPlayerDataFromMonsterList(name);
    result = new Player(name + guidGenerator(), name, 0, 0, 0, playerData.hpLevelOne, playerData.hpLevelOne, playerData.manaLevelOne, playerData.manaLevelOne,
                        playerData.forceLevelOne, playerData.magieLevelOne, gentil, 0, skills, playerData.catClass, playerData.evolution,
                        playerData.evolutionLevel);
    for (var i = 0; i < level; i++) {
        result = incrementerLevel(result);
    }

    return result;
}

function incrementerLevel(player) {
    var playerData = getPlayerDataFromMonsterList(player.name);
    var futureSkills;
    player.level += 1;
    player.experience = 0;
    player.experienceNextLevel += player.level*playerData.experienceNextLevel;
    player.experienceDonnee += player.level*playerData.experienceDonnee;
    player.hp += playerData.hp;
    player.currentHp = player.hp;
    player.mana += playerData.magie;
    player.currentMana = player.mana;
    player.force += playerData.force;
    player.magie += playerData.magie;
    futureSkills = playerData.futureSkills;
    $.each(futureSkills, function(index){
        if (player.skills.filter(x=>x.id == futureSkills[index].skill.id).length == 0) {
            if (futureSkills[index].requiredLevel <= player.level) {
                player.skills.push(futureSkills[index].skill);
            }
        }
    });
    if (isReadyToEvolve(player)) {
        evolution(player);
    }

    return player;
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
    player.src = strPathImgMonstre + '/' + player.name + '.png';
    player.srcDos = player.src.replace(strPathImgMonstre, strPathImgMonstreDos);
    player.srcPortrait = player.src.replace(strPathImgMonstre, strPathImgMonstreProtrait);
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

function getPlayerDataFromMonsterList(name) {
    return monsterList.find(x=>x.name == name);
}
