var selectedEnnemie;
var listPlayer = [];
var listEnnemies = [];
var listEnnemiesTotal = [];

function combat(carte) {
        listPlayer = [];
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
        var equipeCol = displayElementOnParent('div', 'equipeCol', 'col-sm-4', "", mainRow);
        displayPlayerList(Equipe, equipeCol);
        displayEquipeInfo();
        displayElementOnParent('div', "espaceMilieu", "col-sm-1", "", mainRow);
        selectedEnnemie = listEnnemies[0];
        var colonneEnnemies = displayElementOnParent('div', "colonneEnnemies", "col-sm-7 colonneEnnemies", "", mainRow);
        var rowEnnemies = displayElementOnParent('div', "rowEnnemies", "row", "", colonneEnnemies);
        displayPlayerList(listEnnemies, rowEnnemies);
        var elementSelector = document.createElement('div');
        elementSelector.id = "selectorCol"
        elementSelector.className = 'col-sm-' + 12 + " selector";
        $('#' + "colonne" + listEnnemies[0].id).prepend(elementSelector);
        selectedEnnemie = listEnnemies[0];
        var btnCol = displayElementOnParent('div', "buttonCol", "col-sm-6", "", bottomRow);
        $.each(Equipe, function(index){
            var btnRow = displayElementOnParent('div', "buttonRow" + Equipe[index].id, "row", "", btnCol);
            displaySkillsButtons(Equipe[index].skills, Equipe[index], selectedEnnemie, listPlayer, btnRow);
            btnRow.hide();
        });
        displayEnnemieInfo();
        gererTourParTour(Equipe);
        document.addEventListener('keydown', deplacerSelector);
}

function animation(id, animationClass, time) {
    $('#' + id).addClass(animationClass);
    setTimeout(function() {
        $('#' + id).removeClass(animationClass);
       document.getElementById(id).className = "col-sm-12 colonneIdle";
    }, time);
}

function attaque(source, cible, skill) {
    if (skill.id == 'capture') {
        ajouterEnnemieEquipe(sortirEnnemieCombat(selectedEnnemie));
    }
    if (source.gentil == true) {
        cible = selectedEnnemie;
    }
    if (skill.type == "magie") {
        animation(source.id, skill.name, skill.duration);
        var imgMagie = document.createElement('img');
        imgMagie.src = skill.src;
        imgMagie.id = skill.name + "Img"
        imgMagie.style="position:absolute";
        imgMagie.style.zIndex = "10";
        imgMagie.style.height = "300px";
        $("#topRow").append(imgMagie);
        var ciblePos = $('#' + cible.id).offset();
        var sourcePos = $('#' + source.id).offset();
        animateMagie(imgMagie, sourcePos.left, skill.startingPosY, ciblePos.left, 150, skill.duration);
    }else {
        animation(source.id, skill.name, skill.duration);
    }
    var intervalAttaqueDelay = setTimeout(function() {
        if (skill.type == "magie") {
            $("#" + skill.name + "Img").remove();
            cible.currentHp = cible.currentHp - source.magie*skill.power/2;
        }else {
            cible.currentHp = cible.currentHp - source.force*skill.power;
        }
        if( cible.currentHp > 0 ) {
                document.getElementById('valueHpInfo' + cible.id).innerHTML = cible.currentHp + '/' + cible.hp;
        }
        else {
                document.getElementById('valueHpInfo' + cible.id).innerHTML = "";
                if (cible.gentil == false) {
                    sortirEnnemieCombat(selectedEnnemie);
                }else {
                    listPlayer.splice(listPlayer.findIndex(x => x.id == cible.id), 1);
                }
        }
        listPlayer.push(listPlayer.shift());
        gererTourParTour(listPlayer);
        clearInterval(intervalAttaqueDelay);
    }, skill.duration);
}

function ajouterEnnemieEquipe(ennemie) {
    var reformatedSkills = [];
    ennemie.gentil = true;
    ennemie.src = ennemie.src.replace('.png', 'Dos.png');
    $.each(ennemie.skills, function(index) {
        reformatedSkills.push(ennemie.skills[index].skill);
    })
    ennemie.skills = reformatedSkills;
    if (Equipe.length <= 2) {
        Equipe.push(ennemie);
    }else if(Reserve.length <= 10) {
        Reserve.push(ennemie);
    }else {
        alert('La réserve est pleine, le monstre est relaché.');
    }
}

function sortirEnnemieCombat(ennemie) {
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

function victoire() {
    var expertienceGagnee = 0;
    $.each(listEnnemiesTotal, function(index) {
         expertienceGagnee += listEnnemiesTotal[index].experienceDonnee;
    });

    incrementerExperience(Equipe, expertienceGagnee);

    $('div').each(function(i){
        if (this.id != 'potironWolrdMap' && this.id != 'cristalSauvegarde') {
            this.remove();
        }
    })

    displayElementOnParent('div', "headRow", "row", "", $("body"));
    displayElementOnParent('h1', "colonneVictoire", "col-sm-12", "VICTOIRE !", $('#headRow'));
    displayElementOnParent('div', "colonneExperience", "col-sm-6 hp text-center", "Experience gagnee : " + expertienceGagnee, $('#headRow'));
    displayButtons ("PASSER", "col-sm-1 btn btn-success", function(){initialiserWorldMap(Equipe)}, $("body"))

    document.removeEventListener('keydown', deplacerSelector);
}

function incrementerExperience(Equipe, expertienceGagnee) {
    $.each(Equipe, function(index) {
        Equipe[index].experience += expertienceGagnee;
        if (Equipe[index].experience >= Equipe[index].experienceNextLevel) {
            Equipe[index] = incrementerLevel(Equipe[index]);
        }
    });
}

function animateMagie(imgMagie, startingPosX, startingPosY, endingPosX, endingPosY, duration) {
    var posX = startingPosX;
    var posY = startingPosY;
    imgMagie.style.top = startingPosY + 'px';
    var id = setInterval(frame, 1);

    function frame() {
        if (posX == endingPosX || ( startingPosX != startingPosY && posY == endingPosY )) {
            clearInterval(id);
        } else {
            posX += (endingPosX - startingPosX)/(duration/20);
            posY += (endingPosY - startingPosY)/(duration/20);
            imgMagie.style.top = posY + 'px';
            imgMagie.style.left = posX + 'px';
        }
    }
}

function gameOver() {
    document.body.innerHTML = "";
    document.body.innerHTML = "GAME OVER";
    document.body.style.height = "600px";
    document.body.style.fontSize = "200px";
    document.body.style.marginTop = "200px";
    document.body.style.textAlign = "center";
}
