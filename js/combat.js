var selectedEnnemie;
var listPlayer = [];
var listEnnemies = [];
var listEnnemiesTotal = [];
var listCapture = [];

function combat(carte) {
        listPlayer = [];
        listCapture = [];
        $.each(Equipe, function(index){
            listPlayer.push(Equipe[index]);
        });
        alimenterListeEnnemie(carte);
        document.body.style.backgroundImage =  "url(Images/plaine.png)";
        document.body.style.backgroundRepeat = "repeat-n";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.transform = "";
        var topRow = displayElementOnParent('div', "topRow", "row", "", $("body"));
        var mainRow = displayElementOnParent('div', "mainRow", "row", "", $("body"));
        var bottomRow = displayElementOnParent('div', "bottomRow", "row", "", $("body"));
        displayEnnemieInfo(topRow);
        var colonneEnnemies = displayElementOnParent('div', "colonneEnnemies", "col-sm-8 colonneEnnemies", "", topRow);
        var rowEnnemies = displayElementOnParent('div', "rowEnnemies", "row", "", colonneEnnemies);
        displayPlayerList(listEnnemies, rowEnnemies);
        selectedEnnemie = listEnnemies[0];
        deplacerSelectorPremierEnnemie(listEnnemies);
        var equipeCol = displayElementOnParent('div', 'equipeCol', 'col-sm-8', "", mainRow);
        displayPlayerList(Equipe, equipeCol);
        displayEquipeInfo(mainRow);
        var equipeBtnRow = displayElementOnParent('div', 'equipeBtnRow', "row", "", bottomRow);
        $.each(Equipe, function(index){
            var btnRow = displayElementOnParent('div', "buttonRow" + Equipe[index].id, "row", "", equipeBtnRow);
            displaySkillsButtons(Equipe[index].skills, Equipe[index], selectedEnnemie, listPlayer, btnRow);
            btnRow.hide();
        });
        gererTourParTour(Equipe);
        document.addEventListener('keydown', deplacerSelectorClavier);
        $.each($('#rowEnnemies').children(), function(index) {
            this.addEventListener('click', function (){selectedEnnemie = deplacerSelectorClick(this)});
        });
}

function animation(id, animationClass, time) {
    $('#' + id).addClass(animationClass);
    setTimeout(function() {
        $('#' + id).removeClass(animationClass);
       document.getElementById(id).className = "col-sm-12 colonneIdle text-center";
    }, time);
}

function attaque(source, cible, skill) {
    if (source.gentil == true) {
        cible = selectedEnnemie;
    }
    skill.animation(source, cible, skill);
    var intervalAttaqueDelay = setTimeout(function() {
        if (skill.animationType == strProjectil) {
            $("#" + skill.name + "Img").remove();
            cible.currentHp = cible.currentHp - source.magie*skill.power/2;
        }else {
            cible.currentHp = cible.currentHp - source.force*skill.power;
        }
        if( cible.currentHp > 0 ) {
                document.getElementById('valueHpInfo' + cible.id).innerHTML = cible.currentHp + '/' + cible.hp;
        }else {
                if (cible.gentil == false) {
                    sortirEnnemieCombat(selectedEnnemie);
                }else {
                    cible.currentHp = 0;
                    document.getElementById('valueHpInfo' + cible.id).innerHTML = 0 + '/' + cible.hp;
                    listPlayer.splice(listPlayer.findIndex(x => x.id == cible.id), 1);
                }
        }
        if (skill.id == 'capture' && captureReussie(cible)) {
            capturerEnnemie(sortirEnnemieCombat(selectedEnnemie));
        }
        listPlayer.push(listPlayer.shift());
        gererTourParTour(listPlayer);
        clearInterval(intervalAttaqueDelay);
    }, skill.duration);
}

function captureReussie(ennemie) {
    var rand = entierAleatoire(0, (ennemie.currentHp*100)/ennemie.hp)
    if (rand < 20) {
        return true;
    }

    return false;
}

function capturerEnnemie(ennemie) {
    ennemie.gentil = true;
    if (Reserve.length < 9) {
        listCapture.push(ennemie);
    }else {
        alert('La reserve est pleine, le monstre est relache.');
    }
}

function sortirEnnemieCombat(ennemie) {
    document.getElementById(ennemie.id + 'InfoRow').remove();
    document.getElementById('colonne' + ennemie.id).remove();
    var indexEnnemieDead = listEnnemies.findIndex(x => x.id == ennemie.id);
    var indexPlayerDead = listPlayer.findIndex(x => x.id == ennemie.id);
    listPlayer.splice(indexPlayerDead, 1);
    listEnnemies.splice(indexEnnemieDead, 1);
    if (listEnnemies.length > 0) {
        selectedEnnemie = deplacerSelectorPremierEnnemie(listEnnemies);
    }

    return ennemie;
}

function attaqueEnnemie(ennemie) {
    var skill = skillChoisi(ennemie.skills);
    var listPlayerAlive = listPlayer.filter(x => x.currentHp > 0 && x.gentil == true);
    var cible = listPlayerAlive[entierAleatoire(0, listPlayerAlive.length - 1)];
    attaque(ennemie, cible, skill);
}

function gererTourParTour(listPlayer){
    if(listEnnemies.length == 0) {
        victoire();
    }
    if(Equipe.filter(x => x.currentHp > 0).length == 0) {
        gameOver();
    }
    var player = listPlayer[0];
    if(player.gentil == true) {
        $("#buttonRow" + player.id).show();
    }else {
        var intervalAttaqueRatDelay = setTimeout(function() {
            attaqueEnnemie(player);
        }, 2000);
    }
}

function getExperienceGagnee() {
    var experienceGagnee = 0;
    $.each(listEnnemiesTotal, function(index) {
         experienceGagnee += listEnnemiesTotal[index].experienceDonnee;
    });

    return experienceGagnee;
}

function getLootedItems() {
    var lootedItems = [];
    $.each(listEnnemiesTotal, function(index) {
        var loot = fetchMonsterLoot(listEnnemiesTotal[index].name);
        $.each(loot, function(index) {
            if (isLootObtain(loot[index])) {
               lootedItems.push(cloneItem(fetchItem(loot[index].item.id)));
            }
        });
    });

    return lootedItems;
}

function victoire() {
    var experienceGagnee = getExperienceGagnee();
    $('div').each(function(i){
        if (this.id != 'potironWolrdMap' && this.id != 'cristalSauvegarde') {
            this.remove();
        }
    })
    var lootedItems = getLootedItems();
    reformateItems(lootedItems);
    Items = Items.concat(lootedItems);
    reformateItems(Items);
    initialiserVictoireMenu(experienceGagnee, mapVictoireItemViewModel(lootedItems));
    incrementerExperience(Equipe, experienceGagnee);
    $.each(listCapture, function(index) {
        if (Equipe.length <= 2 ) {
            Equipe.push(listCapture[index]);
        }else {
            Reserve.push(listCapture[index]);
        }
    });
    document.removeEventListener('keydown', deplacerSelectorClavier);
    $('#modalMenuVictoire').on('hidden.bs.modal', function () {
        initialiserWorldMap(Equipe);
    });
}

function incrementerExperience(Equipe, expertienceGagnee) {
    $.each(Equipe, function(index) {
        Equipe[index].experience += expertienceGagnee;
        if (Equipe[index].experience >= Equipe[index].experienceNextLevel) {
            Equipe[index] = incrementerLevel(Equipe[index]);
        }
    });
}

function gameOver() {
    document.body.innerHTML = "";
    document.body.innerHTML = "GAME OVER";
    document.body.style.height = "600px";
    document.body.style.fontSize = "200px";
    document.body.style.marginTop = "200px";
    document.body.style.textAlign = "center";
}
