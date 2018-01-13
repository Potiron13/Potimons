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
        this.Objet = item.name;
        this.Quantite = item.quantity;
        this.usable = item.usable;
        this.effect = item.effect;
    }
}

class Loot {
    constructor(itemId, chance) {
        this.item = fetchItem(itemId);
        this.chance = chance;
    }
}

class ViewModelVictoireItem {
    constructor(item) {
        this.Objet = item.name;
        this.Quantite = item.quantity;
    }
}

function cloneItem(item) {
    return new Item(item.id + guidGenerator(), item.name, item.usable, item.quantity, item.effect);
}

var AllItems = [
    new Item('smallPotion', 'petite potion', true, 1, function(){initialiserPotionMenu('smallPotion', smallPotionHeal)}),
    new Item('mediumPotion', 'potion moyenne', true, 1, function(){initialiserPotionMenu('smallPotion', smallPotionHeal)})
]

function mapVictoireItemViewModel(listItem) {
    var result = [];
    if (listItem) {
        $.each(listItem, function(index) {
            result.push(new ViewModelVictoireItem(listItem[index]))
        });
    }

    return result;
}

function fetchItems(itemsId) {
    result = [];
    $.each(itemsId, function(index) {
        result.push(AllItems.find(x=>x.id == itemsId[index]));
    });

    return result;
}

function fetchItem(itemId) {
    return AllItems.find(x=>x.id == itemId);
}

function fetchItemByName(itemName) {
    return AllItems.find(x=>x.name == itemName);
}

function isLootObtain(loot) {
    if (Math.random() < loot.chance) {
        return true;
    }

    return false;
}

function mapItemViewModel(listItem) {
    var result = [];
    $.each(listItem, function(index) {
        result.push(new ViewModelItem(listItem[index]))
    });

    return result;
}

function smallPotionHeal(itemId, playerId, progressBar) {
    potionHeal(itemId, playerId, 20, progressBar);
}

function potionHeal(itemId, playerId, healingAmount, progressBar) {
    var playerToHeal = Equipe.find(x => x.id == playerId);
    if (playerToHeal.hp - playerToHeal.currentHp > healingAmount) {
        playerToHeal.currentHp += healingAmount;
    }else {
        playerToHeal.currentHp = playerToHeal.hp;
    }
    updateProgressBar(progressBar, playerToHeal.currentHp, playerToHeal.hp);
    var potionUsed = Items.find(x=>x.id == itemId);
    potionUsed.quantity = potionUsed.quantity - 1;
    initialiserItemsMenu();
    initialiserMainMenu(Equipe);
}

function reformateItems(listToFormat) {
    if (listToFormat.length > 0) {
        var itemsNames = AllItems.map(x=>x.name);
        $.each(itemsNames, function(index){
            var items = listToFormat.filter(x=>x.name == itemsNames[index]);
            if (items.length > 0) {
                var quantities = items.map(x=>x.quantity);
                var reformatedItem = cloneItem(fetchItemByName(itemsNames[index]));
                reformatedItem.quantity = quantities.reduce(getSum);
                $.each(items, function(index) {
                    remove(listToFormat, items[index])
                })
                listToFormat.push(reformatedItem);
            }
        });
    }
}
