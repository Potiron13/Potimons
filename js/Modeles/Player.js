class Player {
    constructor(id, name, level, experience, experienceNextLevel, currentHp, hp, force, magie, gentil, experienceDonnee, src, skills) {
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
        this.skills = skills;
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
        result.push(new ViewModelPlayer(Equipe[index]))
    });

    return result;
}

function incrementerLevel(player) {
    var experienceNextLevel;
    var hp;
    var force;
    var magie;
    var griffe = new Skill('griffe', 'griffe', 1, 'corpsACorps', 500);
    var fireBall = new Skill('fireBall', 'fireBall', 2, 'magie', 1000, 100);
    var futureSkills;
    switch (player.name) {
    case "Potiron":
        futureSkills = [new FutureSkill(griffe, 2), new FutureSkill(fireBall, 5)];
        experienceNextLevel = player.experienceNextLevel + player.level*10;
        hp = player.hp + player.level*5;
        force = player.force + 5;
        magie = player.magie + 5;
        break;
    case "Rat":
        experienceNextLevel = player.experienceNextLevel + player.level*3;
        hp = player.hp + player.level*2;
        force = player.force + 2;
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

    return player;
}
