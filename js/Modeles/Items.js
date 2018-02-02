class Item {
    constructor(id, name, usableInMenu, usableInCombat, quantity, effectInMenu, effectInCombat, category, amount) {
        this.id = id;
        this.name = name;
        this.usableInMenu = usableInMenu;
        this.usableInCombat = usableInCombat;
        this.quantity = quantity;
        this.effectInMenu = effectInMenu;
        this.effectInCombat= effectInCombat;
        this.category = category;
        this.amount = amount
    }
}

class ViewModelItem {
    constructor(item) {
        this.id = item.id;
        this.Objet = item.name;
        this.Quantite = item.quantity;
        this.usableInMenu = item.usableInMenu;
        this.effectInMenu = item.effectInMenu;
        this.category = item.category;
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
    return new Item(item.id + guidGenerator(), item.name, item.usableInMenu, item.usableInCombat, item.quantity, item.effectInMenu, item.effectInCombat, item.category, item.amount);
}

var AllItems = [
    new Item('smallPotion', 'petite potion', true, true, 1, potionHeal, potionHeal, 'Hp', 20),
    new Item('mediumPotion', 'potion moyenne', true, true, 1, potionHeal, potionHeal, 'Hp', 40),
    new Item('smallManaPotion', 'petite potion de mana', true, true, 1, potionMana, potionMana, 'Mana', 20),
]

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

function mapPotionMenuViewModel(listEquipe) {
    var result = [];
    $.each(listEquipe, function(index) {
        result.push(new MainMenuViewModel(this))
    });

    return result;
}

function potionHeal(itemName, playerId, progressBar) {
    var potionUsed = Items.find(x=>x.name == itemName);
    potionUsed.quantity = potionUsed.quantity - 1;
    var playerToHeal = Equipe.find(x => x.id == playerId);
    if (playerToHeal.hp - playerToHeal.currentHp > potionUsed.amount) {
        playerToHeal.currentHp += potionUsed.amount;
    }else {
        playerToHeal.currentHp = playerToHeal.hp;
    }
    updateProgressBar(progressBar, playerToHeal.currentHp, playerToHeal.hp);
}

function potionMana(itemName, playerId, progressBar) {
    var potionUsed = Items.find(x=>x.name == itemName);
    potionUsed.quantity = potionUsed.quantity - 1;
    var playerToHeal = Equipe.find(x => x.id == playerId);
    if (playerToHeal.mana - playerToHeal.currentMana > potionUsed.amount) {
        playerToHeal.currentMana += potionUsed.amount;
    }else {
        playerToHeal.currentMana = playerToHeal.mana;
    }
    updateProgressBar(progressBar, playerToHeal.currentMana, playerToHeal.mana);
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

    return listToFormat;
}
