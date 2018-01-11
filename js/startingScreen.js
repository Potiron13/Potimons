var saveId;

$('document').ready(function(){
    document.body.style.backgroundImage =  "url(Images/startingScreen.png)";;
    var newGameContainer = displayElementOnParent('div', 'newGameContainer', 'container container-table', '', $('body'));
    var startingGameRow = displayElementOnParent('div', 'newGameRow', 'vertical-center-row', '', newGameContainer);
    initialiserLoadMenu();
    displayButtons ('btnNewGame', 'NEWGAME', 'btn col-sm-4 col-sm-offset-4', newGame, startingGameRow);
    displayButtons ('btnContinue', 'Continue', 'btn col-sm-4 col-sm-offset-4', openLoadMenu, startingGameRow)

});

function newGame() {
    potiron = instancierPlayer(strPotiron, 5, true)
    saveId = '1';
    Equipe = [potiron];
    initialiserWorldMap(Equipe);
}

function initialiserLoadMenu() {
    var savesViewModels = getSavesViewModels();
    var modalBody = creerMenuDeChargement('loadGameModal', savesViewModels, 'Continue');
}

function openLoadMenu() {
    $('#loadGameModal').modal();
}

function intaciatePlayerFromData(playerData) {
    return new Player(playerData.data.id, playerData.data.name, playerData.data.level, playerData.data.experience, playerData.data.experienceNextLevel, playerData.data.currentHp, playerData.data.hp, playerData.data.force, playerData.data.magie, playerData.data.gentil, playerData.data.experienceDonnee, playerData.data.src, playerData.data.skills,
         playerData.data.catClass, playerData.data.evolution, playerData.data.evolutionLevel);
}

function loadGame(gameId) {
    var data = loadDataFromLocalStorage(gameId);
    $.each(data, function(i){
        if (data[i].dataType == 'playerInfo') {
            Equipe.push(intaciatePlayerFromData(data[i]));
        }else if (data[i].dataType == 'reserveInfo') {
            Reserve.push(intaciatePlayerFromData(data[i]));
        }
    });
    initialiserWorldMap(Equipe);
}
