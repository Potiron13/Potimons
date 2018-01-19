var potironPos = {X : 0, Y : 0}
var compteur;
var Equipe = [];
var Items = [];
var Reserve = [];
var Fusion = [];
var ReserveFusion = [];
var carte;
var deplacementSouris_timeout;

function initialiserWorldMap(Equipe) {
    carte = new Carte(3, [strPotipuce, strPotitata], 1, 3);
    var potironWalking = new GamingElement('potironWolrdMap', 'potironWalkingDown');
    var cristalSauvegarde = new GamingElement('cristalSauvegarde', 'savePoint');
    var listGamingElements = [potironWalking, cristalSauvegarde];
    displayListGamingElement(listGamingElements);
    $.each($('body').children(), function(index, child){
        if (!listGamingElements.find( x => x.id == child.id )) {
            child.remove();
        }
    });
    compteur = entierAleatoire(100, 500);
    document.body.style.backgroundImage =  "url(Images/worldMap.png)";
    initialiserMainMenu(Equipe);
    initialiserSaveMenu();
    initialiserSkillsMenu();
    initialiserDetailsMenu();
    initialiserReserveMenu();
    initialiserItemsMenu();
    initialiserFusionTwoMonstersMenu();
    initialiserEventWorldMap();
    var btnMenu = displayButtons('btnOuvrirMainMenu', 'Menu', 'btn btn-primary btnMainMenu', displayMainMenu, $('body'));
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
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);
    $("#modalMenuSave").on('hidden.bs.modal', function () {
        document.addEventListener('keydown', deplacement);
        document.addEventListener('touchstart', handleStart);
        document.addEventListener('touchend', handleEnd);
   });
   $("#modalMenuStats").on('hidden.bs.modal', function () {
       document.addEventListener('keydown', deplacement);
       document.addEventListener('touchstart', handleStart);
       document.addEventListener('touchend', handleEnd);
  });
  document.getElementById('potironWolrdMap').addEventListener('click', function() {
      if (overlapping($('#potironWolrdMap'), $('#cristalSauvegarde'))) {
          displaySaveMenu();
      }
  });
}

function toucheEntree(event) {
    if (event.keyCode == 13 && overlapping($('#potironWolrdMap'), $('#cristalSauvegarde'))) {
        displaySaveMenu();
    } else if (event.keyCode == 13 ) {
        displayMainMenu();
    }
}

function handleStart(event) {
    var touches = event.changedTouches;
    deplacementSouris(touches[0].clientX, touches[0].clientY)
}

function handleEnd(event) {
      finDeplacementSouris();
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
        decrementerCompteurCombat(5);
    }
}

function deplacementSouris(clientX, clientY) {
    deplacerPotironAuxCoordonnees(clientX, clientY);
    deplacementSouris_timeout = setInterval(function(){deplacerPotironAuxCoordonnees(clientX, clientY)}, 10);
}

function finDeplacementSouris() {
    clearTimeout(deplacementSouris_timeout);
}

function deplacerPotironAuxCoordonnees(clientX, clientY) {
    var increment = 1;
    var potironElement = document.getElementById('potironWolrdMap');
    var roundClientX = Math.round(clientX);
    var roundClientY = Math.round(clientY);
    if (potironPos.X + 'px' != roundClientX || potironPos.Y + 'px' != roundClientY) {
        if(Math.abs(potironPos.X - roundClientX) > Math.abs(potironPos.Y - roundClientY))
        {
          if(potironPos.X - roundClientX > 0)
          {
              potironPos.X = potironPos.X - increment;
              potironElement.className = 'potironWalkingLeft';
          }
          else
          {
              potironPos.X = potironPos.X + increment;
              potironElement.className = 'potironWalkingRight';
          }

        }
        else if ( potironPos.X - roundClientX == potironPos.Y - roundClientY)
        {
            if(potironPos.X - roundClientX  > 0)
            {
                potironPos.X = potironPos.X - increment;
                potironPos.Y = potironPos.Y - increment;
                potironElement.className = 'potironWalkingNW';
            }
            else
            {
                potironPos.X = potironPos.X + increment;
                potironPos.Y = potironPos.Y + increment;
                potironElement.className = 'potironWalkingSE';
            }
        }
        else if (potironPos.X - roundClientX == -(potironPos.Y - roundClientY))
        {
            if(potironPos.X - roundClientX > 0)
            {
                potironPos.X = potironPos.X - increment;
                potironPos.Y = potironPos.Y + increment;
                potironElement.className = 'potironWalkingSW';
            }
            else
            {
                potironPos.X = potironPos.X + increment;
                potironPos.Y = potironPos.Y - increment;
                potironElement.className = 'potironWalkingNE';
            }
        }
        else
        {
          if(potironPos.Y - roundClientY > 0)
          {
              potironPos.Y = potironPos.Y - increment;
              potironElement.className = 'potironWalkingUp';
          }
          else
          {
              potironPos.Y = potironPos.Y + increment;
              potironElement.className = 'potironWalkingDown';
          }

        }
        potironElement.style.left = potironPos.X + 'px';
        potironElement.style.top = potironPos.Y + 'px';
        decrementerCompteurCombat(1);
    }
}

function decrementerCompteurCombat(decrement) {
    compteur -= decrement;
    if (compteur <= 0) {
        finDeplacementSouris();
        document.removeEventListener('touchstart', handleStart);
        document.removeEventListener('touchend', handleEnd);
        document.removeEventListener('keydown', deplacement);
        document.removeEventListener('keydown', toucheEntree);
        var id = setInterval(frame, 1);
        var compteurTransition = 0;
        function frame() {
            if (compteurTransition*5 >= 715) {
                clearInterval(id);
                $('#potironWolrdMap').hide();
                $('#cristalSauvegarde').hide();
                $('#btnOuvrirMainMenu').hide();
                document.getElementById("potironWolrdMap").style.transform = "";
                //combat(carte);
                var viewCombat = new CombatView();
                var controllerCombat = new CombatController(viewCombat, Equipe, Reserve, Items);
                controllerCombat.init(carte);
                controllerCombat.combat();
            } else {
                document.getElementById("potironWolrdMap").style.transform = "rotate(" + compteurTransition*5 + "deg)";
                compteurTransition++;
            }
        }
    }
}
