class ViewModelDetails {
    constructor (potimon) {
        this.id = potimon.id;
        this.Nom = {label: 'Nom', value: potimon.name};
        this.Niveau = {label: 'Niveau', value: potimon.level};
        this.HpMax = {label: 'Hp', value: potimon.hp};
        this.curHp = {label: 'Hp actuel', value: potimon.currentHp};
        this.ManaMax = {label: 'Mana', value: potimon.mana};
        this.curMana = {label: 'Mana actuelle', value: potimon.currentMana};
        this.attaque = {label: 'Attaque', value: potimon.attaque};
        this.defence = {label: 'Défense', value: potimon.defence};
        this.specialAttaque = {label: 'Attaque spéciale', value: potimon.specialAttaque};
        this.specialDefence = {label: 'Defense spéciale', value:potimon.specialDefence};
        this.speed = {label: 'Vitesse', value: potimon.speed};
        this.Exp = {label: 'Expérience', value: potimon.experience};
        this.ExpNext = {label: 'Expérience nécessaire', value: potimon.experienceNextLevel};
        this.type = {label: 'Type', value:getViewModelElementType(potimon.elementTypeId)};
        this.src = potimon.src;
    }
}

function getViewModelElementType(elementsTypeIds) {
    var viewModel = '';
    $.each(elementsTypeIds, function(index) {
        var type = AllTypes.find(x=>x.id === this.id).identifier;
        if (index != 0) {
            viewModel += '/';
        }
        viewModel += type;
    });

    return viewModel;
}