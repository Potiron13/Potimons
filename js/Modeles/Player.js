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
        this.Hp = player.hp + '/' + player.currentHp;
    }
}

function mapPlayerViewModel (Equipe) {
    var result = [];
    $.each(Equipe, function(index) {
        result.push(new MainMenuViewModel(Equipe[index]))
    });

    return result;
}


function instancierPlayer(nom, level, gentil) {
    result = {};
    var src = 'Images/' + nom + '.png';
    var experienceNextLevel = level*10;
    var experience = 0;
    var hp;
    var force;
    var magie;
    var gentil = gentil;
    var experienceDonnee;
    var skills = [];
    var catClass;
    var evolution;
    var evolutionLevel;            
    switch (nom) {
        case 'Potitata':
            hp = 10 + 2*level;
            force = 2 + level;
            magie = 1 + level;
            experienceDonnee = 3 + level;
            skills = gentil ? [fetchSkill('griffe')] : [new EnnemieSkill('griffe', 1)];
            catClass = 'normal';
            evolution = 'Potitatac';
            evolutionLevel = 5;
            break;
        case 'Potitatac':
            hp = 10 + 3*level;
            force = 5 + level;
            magie = 2 + level;
            experienceDonnee = 5 + level;
            skills = gentil ? fetchSkills(['griffe', 'morsure']) : [new EnnemieSkill('griffe', 0.6), new EnnemieSkill('morsure', 0.4)];
            catClass = 'normal';
            break;
        case 'Potipuce':
            hp = 20 + level*2;
            force = 4 + level;
            magie = 6 + level*2;
            experienceDonnee = 6 + level*2;
            skills =  gentil ? fetchSkills(['griffe', 'aquaBall']) : [new EnnemieSkill('griffe', 0.7), new EnnemieSkill('aquaBall', 0.3)];
            catClass = 'eau';
            break;
        default:
        console.log('cant find in list nom mth instancierEnnemie');
    }
    result = new Player(nom + guidGenerator(), nom, level, experience, experienceNextLevel, hp, hp, force, magie, gentil, experienceDonnee, src, skills, catClass, evolution, evolutionLevel);

    return result;
}


function incrementerLevel(player) {
    var experienceNextLevel;
    var hp;
    var force;
    var magie;
    var griffe = fetchSkill('griffe');
    var fireBall = fetchSkill('fireBall')
    var futureSkills;
    switch (player.name) {
    case "Potiron":
        futureSkills = [new FutureSkill(griffe, 2), new FutureSkill(fireBall, 5)];
        experienceNextLevel = player.experienceNextLevel + player.level*10;
        hp = player.hp + player.level*5;
        force = player.force + 5;
        magie = player.magie + 5;
        break;
    case "Potitata":
        experienceNextLevel = player.experienceNextLevel + player.level*3;
        hp = player.hp + player.level*2;
        force = player.force + 2;
        magie = player.magie + 1;
        break;
    case "Potitatac":
        experienceNextLevel = player.experienceNextLevel + player.level*3;
        hp = player.hp + player.level*3;
        force = player.force + 4;
        magie = player.magie + 1;
        break;
    case "Potipuce":
        experienceNextLevel = player.experienceNextLevel + player.level*5;
        hp = player.hp + player.level*3;
        force = player.force + 2;
        magie = player.magie + 3;
        break;
    default:
        alert("Hero non trouvé lors du level up");
    }
    player.level += 1;
    player.experience = 0;
    player.experienceNextLevel += experienceNextLevel;
    player.currentHp = hp;
    player.hp = hp;
    player.force = force;
    player.magie = magie;
    $.each(futureSkills, function(index){
        if (player.skills.filter(x=>x.name == futureSkills[index].skill.name).length == 0) {
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
