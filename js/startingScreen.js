var saveId;

$('document').ready(function(){
    document.body.style.backgroundImage =  "url(Images/startingScreen.png)";;
    var newGameContainer = displayElementOnParent('div', 'newGameContainer', 'container container-table', '', $('body'));
    var startingGameRow = displayElementOnParent('div', 'newGameRow', 'vertical-center-row', '', newGameContainer);
    initialiserLoadMenu();
    displayButtons ('NEWGAME', 'btn col-md-4 col-md-offset-4', newGame, startingGameRow);
    displayButtons ('Continue', 'btn col-md-4 col-md-offset-4', openLoadMenu, startingGameRow)

});

function newGame() {
    var startingSword = {'id' : 'EpeeDeBois', 'name': 'EpeeDeBois', 'attaque':4};
    var startingArmor = {'id' : 'ArmurDeCarton', 'name': 'ArmurDeCarton', 'defence':5};
    var startingCollar = {'id' : 'CollierSimple', 'name': 'CollierSimple', 'attaque':1, 'defence':2};
    var equipementList = new EquipementList(startingSword, startingArmor, startingCollar);
    potiron = new Player('Potiron', 'Potiron', 1, 0, 10, 50, 50, 5, 5, true, 0, 'Images/CombatPotironStandar.png', fetchSkills(['charge', 'capture']), 'GrosChat');
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
