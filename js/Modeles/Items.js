class Item {
    constructor(id, name, usable, quantity, effect) {
        this.id = id;
        this.name = name;
        this.usable = usable;
        this.quantity = quantity;
        this.effect = effect;
    }
}

class ViewModelItem {
    constructor(item) {
        this.id = item.id;
        this.name = item.name;
        this.quantity = item.quantity;
        this.usable = item.usable;
        this.effect = item.effect;
    }
}

function mapItemViewModel(listItem) {
    var result = [];
    $.each(listItem, function(index) {
        result.push(new ViewModelItem(listItem[index]))
    });

    return result;
}

function smallPotionHeal(id) {
    potionHeal(id, 20);
}

function potionHeal(id, healingAmount) {
    var playerToHeal = Equipe.find(x => x.id == id);
    if (playerToHeal.hp - playerToHeal.currentHp > healingAmount) {
        playerToHeal.currentHp += healingAmount;
    }else {
        playerToHeal.currentHp = playerToHeal.hp;
    }
}
