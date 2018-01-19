class Item {
    constructor(id, name, usableInMenu, usableInCombat, quantity, effectInMenu, effectInCombat) {
        this.id = id;
        this.name = name;
        this.usableInMenu = usableInMenu;
        this.usableInCombat = usableInCombat;
        this.quantity = quantity;
        this.effectInMenu = effectInMenu;
        this.effectInCombat= effectInCombat;
    }
}

class ViewModelItem {
    constructor(item) {
        this.id = item.id;
        this.Objet = item.name;
        this.Quantite = item.quantity;
        this.usableInMenu = item.usableInMenu;
        this.effectInMenu = item.effectInMenu;
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
    return new Item(item.id + guidGenerator(), item.name, item.usableInMenu, item.usableInCombat, item.quantity, item.effectInMenu, item.effectInCombat);
}

var AllItems = [
    new Item('smallPotion', 'petite potion', true, true, 1, function(){initialiserPotionMenu('petite potion', smallPotionHeal)}, smallPotionHeal),
    new Item('mediumPotion', 'potion moyenne', true, true, 1, function(){initialiserPotionMenu('potion moyenne', mediumPotionHeal)}, mediumPotionHeal)
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

function smallPotionHeal(itemName, playerId, progressBar) {
    potionHeal(itemName, playerId, 20, progressBar);
}

function mediumPotionHeal(itemId, playerId, progressBar) {
    potionHeal(itemName, playerId, 40, progressBar);
}

function potionHeal(itemName, playerId, healingAmount, progressBar) {
    var playerToHeal = Equipe.find(x => x.id == playerId);
    if (playerToHeal.hp - playerToHeal.currentHp > healingAmount) {
        playerToHeal.currentHp += healingAmount;
    }else {
        playerToHeal.currentHp = playerToHeal.hp;
    }
    updateProgressBar(progressBar, playerToHeal.currentHp, playerToHeal.hp);
    var potionUsed = Items.find(x=>x.name == itemName);
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
