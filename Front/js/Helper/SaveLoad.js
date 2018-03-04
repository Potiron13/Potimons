
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

function getSavesViewModels () {
    var savesViewModels = [];
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        savesViewModels.push(mapViewModelSaveFile(JSON.parse(localStorage.getItem( localStorage.key( i )))));
    }

    return savesViewModels;
}

function mapViewModelSaveFile (LocalStorageArray) {
    var result = [];
    $.each(LocalStorageArray, function(index) {
        if(LocalStorageArray[index].dataType == strPlayerInfo) {
            result.push(new ViewModelSaveFileEquipe(LocalStorageArray[index].data, LocalStorageArray[index].dataType));
        }else if(LocalStorageArray[index].dataType == strGameInfo || LocalStorageArray[index].dataType == strSaveId) {
            result.push(new ViewModelSaveFileGameInfo(LocalStorageArray[index].data, LocalStorageArray[index].dataType));
        }
    });

    return result;
}
