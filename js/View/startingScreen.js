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
    saveId = '1';
    var startingPotion = cloneItem(fetchItem('smallPotion'));
    startingPotion.quantity = 5;
    Items = [startingPotion];
    Equipe = [instancierPlayer(strPotiron, 5, true), instancierPlayer(strPotipuce, 5, true)];
    initialiserWorldMap(Equipe);
}

function initialiserLoadMenu() {
    var savesViewModels = getSavesViewModels();
    var modalBody = creerMenuDeChargement('loadGameModal', savesViewModels, 'Continue');
}

function openLoadMenu() {
    $('#loadGameModal').modal();
}

function instanciatePlayerFromData(playerData) {
    var ids = [];
    $.each(playerData.data.skills, function(index){
        ids.push(playerData.data.skills[index].id)
    });
    var reformatedSkills = fetchSkills(ids);
    return new Player(playerData.data.id, playerData.data.name, playerData.data.level, playerData.data.experience,
         playerData.data.experienceNextLevel, playerData.data.currentHp, playerData.data.hp, playerData.data.force,
         playerData.data.magie, playerData.data.gentil, playerData.data.experienceDonnee, playerData.data.src,
         reformatedSkills, playerData.data.catClass, playerData.data.evolution, playerData.data.evolutionLevel);
}

function instanciateItemFromData(itemData) {
    return new Item(itemData.data.id, itemData.data.name, itemData.data.usableInMenu, itemData.data.usableInCombat, itemData.data.quantity, fetchItemByName(itemData.data.name).effectInMenu, fetchItemByName(itemData.data.name).effectInCombat);
}

function loadGame(gameId) {
    var data = loadDataFromLocalStorage(gameId);
    $.each(data, function(i){
        if (data[i].dataType == 'playerInfo') {
            Equipe.push(instanciatePlayerFromData(data[i]));
        }else if (data[i].dataType == 'reserveInfo') {
            Reserve.push(instanciatePlayerFromData(data[i]));
        }else if (data[i].dataType == 'itemInfo') {
            Items.push(instanciateItemFromData(data[i]));
        }
    });
    initialiserWorldMap(Equipe);
}
