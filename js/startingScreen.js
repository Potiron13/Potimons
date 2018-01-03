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
    var startingPotiron = { 'id' : 'Potiron', 'level': 1, 'catClass': 'chat', 'experience' : 0, 'experienceNextLevel' : 9, 'currentHp' : 25 };
    var startingSword = {'id' : 'EpeeDeBois', 'name': 'EpeeDeBois', 'attaque':4};
    var startingArmor = {'id' : 'ArmurDeCarton', 'name': 'ArmurDeCarton', 'defence':5};
    var startingCollar = {'id' : 'CollierSimple', 'name': 'CollierSimple', 'attaque':1, 'defence':2};
    var equipementList = new EquipementList(startingSword, startingArmor, startingCollar);
    potiron = new Player('Potiron', 'Potiron', 1, 0, 10, 50, 50, 5, 5, true, 0, 'Images/CombatPotironStandar.png')
    potiron.skills = [new Skill('charge', 'charge', 10, 'corpsACorps', 250), new Skill('capture', 'capture', 0, 'dressage', 1000)];
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

function loadGame(gameId) {
    var data = loadDataFromLocalStorage(gameId);
    $.each(data, function(i){
        var player = new Player(data[i].data.id, data[i].data.name, data[i].data.level, data[i].data.experience, data[i].data.experienceNextLevel, data[i].data.currentHp, data[i].data.hp, data[i].data.force, data[i].data.magie, data[i].data.gentil, data[i].data.experienceDonnee, data[i].data.src, data[i].data.skills);
        if (data[i].dataType == 'playerInfo') {
            Equipe.push(player);
        }else if (data[i].dataType == 'reserveInfo') {
            Reserve.push(player);
        }
    });

    initialiserWorldMap(Equipe);
}
