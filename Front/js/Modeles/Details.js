class ViewModelDetails {
    constructor (potimon) {
        this.id = potimon.id;
        this.Nom = potimon.name;
        this.Niveau = potimon.level;
        this.HpMax = potimon.hp;
        this.curHp = potimon.currentHp;
        this.ManaMax = potimon.mana;
        this.curMana = potimon.currentMana;
        this.attaque = potimon.attaque;
        this.defence = potimon.defence;
        this.specialAttaque = potimon.specialAttaque;
        this.specialDefence = potimon.specialDefence;
        this.speed = potimon.speed;
        this.Exp = potimon.experience;
        this.ExpNext = potimon.experienceNextLevel;
        this.type = getViewModelElementType(potimon.elementTypeId);
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