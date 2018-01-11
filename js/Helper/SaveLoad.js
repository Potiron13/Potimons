function sauvegarder(saveId ) {
    var gameData = [];
    $.each(Equipe, function(index) {
        gameData.push({'dataType' : 'playerInfo', 'data' : Equipe[index]});
    });
    $.each(Reserve, function(index) {
        gameData.push({'dataType' : 'reserveInfo', 'data' : Reserve[index]});
    });
    $.each(Items, function(index) {
        gameData.push({'dataType' : 'itemInfo', 'data' : Item[index]});
    })
    gameData.push({'dataType' : 'gameInfo', 'data' : (new Date()).toLocaleString()});
    gameData.push({'dataType' : 'saveId', 'data' : saveId});
    localStorage.setItem(saveId, JSON.stringify(gameData));
    initialiserSaveMenu();

    return saveId
}

function loadDataFromLocalStorage(saveId) {
    var result;
    if (localStorage.getItem(saveId)) {
        retrievedObject = localStorage.getItem(saveId);
        result = JSON.parse(retrievedObject);
    } else {
        alert('sauvegarde non trouvé')
    }

    return result;
}
