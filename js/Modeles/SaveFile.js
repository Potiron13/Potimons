
class ViewModelSaveFileEquipe {
    constructor (data, dataType) {
        this.dataType = dataType;
        this.id = data.id
        this.name = data.name;
        this.level = data.level;
    }
}

class ViewModelSaveFileGameInfo {
    constructor (data, dataType) {
            this.dataType = dataType
            this.value = data;
        }
}

function mapViewModelSaveFile(LocalStorageArray) {
    var result = [];
    $.each(LocalStorageArray, function(index) {
        if(LocalStorageArray[index].dataType == 'playerInfo') {
            result.push(new ViewModelSaveFileEquipe(LocalStorageArray[index].data, LocalStorageArray[index].dataType));
        }else if(LocalStorageArray[index].dataType == 'gameInfo' || LocalStorageArray[index].dataType == 'saveId') {
            result.push(new ViewModelSaveFileGameInfo(LocalStorageArray[index].data, LocalStorageArray[index].dataType));
        }
    });

    return result;
}
