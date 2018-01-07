class Player {
    constructor(id, name, level, experience, experienceNextLevel, currentHp, hp, force, magie, gentil, experienceDonnee, src, skills, catClass, evolution, evolutionLevel) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.experience = experience;
        this.experienceNextLevel = experienceNextLevel;
        this.currentHp = currentHp;
        this.hp = hp;
        this.force = force;
        this.magie = magie;
        this.gentil = gentil;
        this.experienceDonnee = experienceDonnee;
        this.src = src;
        this.srcDos = src.replace('.png', 'Dos.png');
        this.skills = skills;
        this.catClass = catClass;
        this.evolution = evolution;
        this.evolutionLevel = evolutionLevel
    }
}

class PlayerMonsterData {
    constructor(name, hpLevelOne, forceLevelOne, magieLevelOne,hp, force, magie, experienceNextLevel, experienceDonnee, catClass, evolution, evolutionLevel, futureSkills) {
        this.name = name;
        this.hpLevelOne = hpLevelOne;
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
        this.Nom = player.name;
        this.Hp = player.currentHp + '/' + player.hp;
    }
}

function mapPlayerViewModel (Equipe) {
    var result = [];
    $.each(Equipe, function(index) {
        result.push(new MainMenuViewModel(Equipe[index]))
    });

    return result;
}


function instancierPlayer(name, level, gentil) {
    result = {};
    var src = 'Images/' + name + '.png';
    var skills = [];
    var gentil = gentil;
    /*var evolution;
    var evolutionLevel;
    var hp;
    var force;
    var magie;
    switch (nom) {
        case strPotitata:
            hp = 10;
            force = 5;
            magie = 1;
            catClass = 'normal';
            evolution = strPotitatac;
            evolutionLevel = 5;
            break;
        case strPotitatac:
            hp = 20;
            force = 10;
            magie = 2;
            experienceDonnee = 5 + level;
            catClass = 'normal';
            break;
        case strPotipuce:
            hp = 12;
            force = 5;
            magie = 5;
            catClass = 'eau';
            break;
        case strPotidoudou:
            hp = 12;
            force = 6;
            magie = 7;
            catClass = 'terre';
            break;
        default:
        console.log('cant find in list nom mth instancierPlayer');
    }*/
    var playerData = getPlayerDataFromMonsterList(name);
    result = new Player(name + guidGenerator(), name, 0, 0, 0, playerData.hpLevelOne, playerData.hpLevelOne, playerData.forceLevelOne, playerData.magieLevelOne, gentil, 0, src, skills, playerData.catClass, playerData.evolution, playerData.evolutionLevel);
    for (var i = 0; i < level; i++) {
        result = incrementerLevel(result);
    }

    return result;
}


function incrementerLevel(player) {
    playerData = getPlayerDataFromMonsterList(player.name);
    var futureSkills;
    /*var experienceNextLevel;
    var hp;
    var force;
    var magie;
    switch (player.name) {
    case strPotiron:
        futureSkills = [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 5)];
        experienceNextLevel = player.experienceNextLevel + player.level*10;
        hp = player.hp + player.level*5;
        force = player.force + 5;
        magie = player.magie + 5;
        break;
    case strPotitata:
        futureSkills = [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 5)];
        experienceNextLevel = player.experienceNextLevel + player.level*3;
        hp = player.hp + player.level*2;
        force = player.force + 2;
        magie = player.magie + 1;
        break;
    case strPotitatac:
        futureSkills = [new FutureSkill(strGriffe, 1), new FutureSkill(strMorsure, 5)];
        experienceNextLevel = player.experienceNextLevel + player.level*3;
        hp = player.hp + player.level*3;
        force = player.force + 4;
        magie = player.magie + 1;
        break;
    case strPotipuce:
        futureSkills = [new FutureSkill(strGriffe, 1), new FutureSkill(strAquaBall, 5)];
        experienceNextLevel = player.experienceNextLevel + player.level*5;
        hp = player.hp + player.level*3;
        force = player.force + 2;
        magie = player.magie + 3;
        break;
    case strPotidoudou:
        futureSkills = [new FutureSkill(strCharge, 1), new FutureSkill(strChanter, 3), new FutureSkill(strHypercut, 5)];
        experienceNextLevel = player.experienceNextLevel + player.level*5;
        hp = player.hp + player.level*3;
        force = player.force + 2;
        magie = player.magie + 3;
        break;
    default:
        alert("Hero non trouvé lors du level up");
    }*/
    player.level += 1;
    player.experience = 0;
    player.experienceNextLevel += player.level*playerData.experienceNextLevel;
    player.experienceDonnee += player.level*playerData.experienceDonnee;
    player.hp += playerData.hp;
    player.currentHp = player.hp;
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
        player = evolution(player);
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
    player = instancierPlayer(player.evolution, player.level, true);
    initialiserEvolutionMenu(player);
    displayEvoltionResult();

    return player
}

function getPlayerDataFromMonsterList(name) {
    return monsterList.find(x=>x.name == name);
}
