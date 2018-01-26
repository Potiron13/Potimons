//var saveId;
/*
function newGame() {
    saveId = '1';
    var startingPotion = cloneItem(fetchItem('smallPotion'));
    startingPotion.quantity = 5;
    Items = [startingPotion];
    Equipe = [instancierPlayer(strPotiron, 5, true), instancierPlayer(strPotipuce, 5, true)];
    initialiserWorldMap(Equipe);
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
}*/
