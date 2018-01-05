var potironPos = {X : 0, Y : 0}
var compteur;
var Equipe = [];
var Reserve = [];
var Fusion = [];
var ReserveFusion = [];
var carte;

function initialiserWorldMap(Equipe) {
    carte = new Carte(3, ['Potitata', 'Potipuce'], 1, 3);
    var potironWalking = new GamingElement('potironWolrdMap', 'potironWalkingDown');
    var cristalSauvegarde = new GamingElement('cristalSauvegarde', 'savePoint');
    var listGamingElements = [potironWalking, cristalSauvegarde];
    $.each($('body').children(), function(index, child){
        if (!listGamingElements.find( x => x.id == child.id )) {
            child.remove();
        }
    });
    compteur = entierAleatoire(50, 100);
    document.body.style.backgroundImage =  "url(Images/worldMap.png)";
    initialiserMainMenu(Equipe);
    initialiserSaveMenu();
    initialiserSkillsMenu();
    initialiserReserveMenu();
    initialiserFusionTwoMonstersMenu();
    initialiserEventWorldMap();
    displayListGamingElement(listGamingElements);
}

function alimenterListeEnnemie(carte) {
    listEnnemies = [];
    listEnnemiesTotal = [];
    var nombreEnnemieAuCombat = entierAleatoire(1, carte.nombreMaximumEnnemie);
    for (var i = 0; i < nombreEnnemieAuCombat; i++) {
        var level = entierAleatoire(carte.levelMin, carte.levelMax);
        var indexEnnemieGenere = entierAleatoire(0, carte.listNomEnnemiePossible.length - 1);
        var ennemie = instancierPlayer(carte.listNomEnnemiePossible[indexEnnemieGenere], level, false);
        listPlayer.push(ennemie);
        listEnnemies.push(ennemie);
        listEnnemiesTotal.push(ennemie);
    }
}

function displayListGamingElement(listGamingElements) {
    $.each(listGamingElements, function(index) {
        if ($('#' + listGamingElements[index].id).length) {
            $('#' + listGamingElements[index].id).show();
        }else {
            displayElementOnParent('div', listGamingElements[index]['id'], listGamingElements[index]['cssClass'], "", $('body'));
        }
    });
}

function initialiserEventWorldMap() {
    document.addEventListener('keydown', deplacement);
    document.addEventListener('keydown', toucheEntree);
}

function toucheEntree(event) {
    if (event.keyCode == 13 && overlapping($('#potironWolrdMap'), $('#cristalSauvegarde'))) {
        $('#modalMenuSave').modal();
    } else if (event.keyCode == 13 ) {
        $('#modalMenuStats').modal();
    }
}

function deplacement(event) {
    var potironElement = document.getElementById('potironWolrdMap');
    if(event.keyCode == 37) {
        potironElement.className = 'potironWalkingLeft';
        potironPos.X -= ( potironPos.X > 0 ) ? 5 : 0;
    }
    else if(event.keyCode == 38) {
        potironElement.className = 'potironWalkingUp';
        potironPos.Y -= ( potironPos.Y > 0 ) ? 5 : 0;
    }
    else if(event.keyCode == 39) {
        potironPos.X += 5;
        potironElement.className = 'potironWalkingRight';
    }
    else if(event.keyCode == 40) {
        potironElement.className = 'potironWalkingDown';
        potironPos.Y += 5;
    }
    if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
        potironElement.style.top = potironPos.Y + 'px';
        potironElement.style.left = potironPos.X + 'px';
        decrementerCompteurCombat();
    }
}

function decrementerCompteurCombat() {
    compteur -= 1;
    if (compteur <= 0) {
        document.removeEventListener("keydown", deplacement);
        document.removeEventListener('keydown', toucheEntree);
        var id = setInterval(frame, 1);
        var compteurTransition = 0;
        function frame() {
            if (compteurTransition*5 >= 715) {
                clearInterval(id);
                $('#potironWolrdMap').hide();
                $('#cristalSauvegarde').hide();
                document.getElementById("potironWolrdMap").style.transform = "";
                combat(carte);
            } else {
                document.getElementById("potironWolrdMap").style.transform = "rotate(" + compteurTransition*5 + "deg)";
                compteurTransition++;
            }
        }
        compteur = entierAleatoire(50, 100);
    }
}
