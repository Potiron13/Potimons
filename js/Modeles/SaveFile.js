
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
