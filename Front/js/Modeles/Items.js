class Item {
    constructor(id, name, usableInMenu, usableInCombat, quantity, effectInMenu, effectInCombat, category, amount, price) {
        this.id = id;
        this.name = name;
        this.usableInMenu = usableInMenu;
        this.usableInCombat = usableInCombat;
        this.quantity = quantity;
        this.effectInMenu = effectInMenu;
        this.effectInCombat = effectInCombat;
        this.category = category;
        this.amount = amount;
        this.src = 'Images/Items/' + name + '.gif';
        this.price = price;
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
    new Item('smallPotion', 'petite potion', true, true, 1, potionHeal, potionHeal, 'Hp', 20, 200),
    new Item('mediumPotion', 'potion moyenne', true, true, 1, potionHeal, potionHeal, 'Hp', 40, 500),
    new Item('smallManaPotion', 'petite potion de mana', true, true, 1, potionMana, potionMana, 'Mana', 20, 350),
    new Item('antidote', 'antidote', false, true, 1, null, curePoison, strPoison, null, 150),
    new Item('reveille', 'reveille', false, true, 1, null, cureSleep, strDodo, null, 150),
    new Item('potiball', 'potiball', false, true, 1, null, lancerPotiball, 'normal', null, 500),
    new Item('superPotiball', 'super potiball', false, true, 1, null, lancerPotiball, 'super', null, 1500),
]

function fetchItems(itemsId) {
    result = [];
    $.each(itemsId, function (index) {
        result.push(AllItems.find(x => x.id == itemsId[index]));
    });

    return result;
}

function fetchItem(itemId) {
    return AllItems.find(x => x.id == itemId);
}

function fetchItemByName(itemName) {
    return AllItems.find(x => x.name == itemName);
}

function isLootObtain(loot) {
    if (Math.random() < loot.chance) {
        return true;
    }

    return false;
}

function mapItemViewModel(listItem) {
    var result = [];
    $.each(listItem, function (index) {
        result.push(new ViewModelItem(listItem[index]))
    });

    return result;
}

function mapPotionMenuViewModel(listEquipe) {
    var result = [];
    $.each(listEquipe, function (index) {
        result.push(new MainMenuViewModel(this))
    });

    return result;
}

function potionHeal(itemName, playerId, progressBar) {
    var potionUsed = consumItem(itemName);
    var playerToHeal = Equipe.find(x => x.id == playerId);
    heal(playerToHeal, potionUsed.amount);
    updateProgressBar(progressBar, playerToHeal.currentHp, playerToHeal.hp);
}

function potionMana(itemName, playerId, progressBar) {
    var potionUsed = consumItem(itemName);
    var playerToHeal = Equipe.find(x => x.id == playerId);
    if (playerToHeal.mana - playerToHeal.currentMana > potionUsed.amount) {
        playerToHeal.currentMana += potionUsed.amount;
    } else {
        playerToHeal.currentMana = playerToHeal.mana;
    }
    updateProgressBar(progressBar, playerToHeal.currentMana, playerToHeal.mana);
}

function curePoison(itemName, playerId, progressBar) {
    var antidoteUsed = consumItem(itemName);
    var playerToHeal = Equipe.find(x => x.id == playerId);
    if (playerToHeal.etat === strPoison) {
        playerToHeal.etat = '';
    }
}

function cureSleep(itemName, playerId, progressBar) {
    var reveilleUsed = consumItem(itemName);
    var playerToHeal = Equipe.find(x => x.id == playerId);
    if (playerToHeal.etat === strDodo) {
        playerToHeal.etat = '';
    }
}

function consumItem(itemName) {
    var itemList = GetItems();
    var item = itemList.find(x => x.name == itemName);
    item.quantity = item.quantity - 1;

    return item;
}

function lancerPotiball(itemName, playerId, progressBar, listEnnemie, source, controllerCombat) {
    var potiballUsed = Items.find(x => x.name == itemName);
    potiballUsed.quantity = potiballUsed.quantity - 1;
    var target = listEnnemie.find(x => x.id == playerId);
    var calculCaptureResult = calculCapture(potiballUsed.category, target);
    var tickNumber = calculCaptureResult.tickNumber;
    var captureReussi = calculCaptureResult.captureReussi;
    var textAttackDisplay = '';
    var textAttackDisplayDelay = 1000;
    var dureeLancee = animateLancePotiball(source, target, potiballUsed);
    var duration = tickNumber * 1000 * 2;
    setTimeout(function () {
        $('#' + target.id).css('visibility', 'hidden');
        setTimeout(function () {
            if (captureReussi == false) {
                textAttackDisplay = 'Echec';
                controllerCombat.animateTextAttackDisplay(textAttackDisplay, textAttackDisplayDelay, target, 'red', controllerCombat);
                setTimeout(function () {
                    $('#' + target.id).css('visibility', 'visible');
                    $("#" + strPotiball + "Img").remove();
                }, textAttackDisplayDelay);
            } else {
                textAttackDisplay = 'Capture';
                controllerCombat.animateTextAttackDisplay(textAttackDisplay, textAttackDisplayDelay, target, 'green', controllerCombat);
                setTimeout(function () {
                    capture(target, controllerCombat);
                    $("#" + strPotiball + "Img").remove();
                }, textAttackDisplayDelay);
            }
        }, duration);
    }, dureeLancee);

    return duration + dureeLancee + textAttackDisplayDelay;
}

function capture(ennemie, controllerCombat) {
    controllerCombat.sortirPlayerCombat(ennemie, controllerCombat);
    ennemie.gentil = true;
    controllerCombat.listCapture.push(ennemie);
}

function calculCapture(potiballType, target) {
    var bonusBall = 1;
    var bonusStatus = 1;
    var tickNumber = 0;
    if (potiballType == 'super') {
        bonusBall = 1.5;
    }
    if (target.etat == strPoison) {
        bonusStatus = 1.5;
    }
    var a = (1 - (2 / 3) * target.currentHp / target.hp) * target.tauxDeCapture * bonusBall * bonusStatus;
    if (a >= 255) {
        tickNumber = 4;

        return { 'tickNumber': tickNumber, 'captureReussi': true };
    } else {
        var b = 65535 * Math.pow(a / 255, 1 / 4);
        for (var i = 0; i < 4; i++) {
            tickNumber = i + 1;
            var rand = entierAleatoire(0, 65535);
            if (rand > b) {
                return { 'tickNumber': tickNumber, 'captureReussi': false };
            }
        }

        return { 'tickNumber': tickNumber, 'captureReussi': true };
    }

}

function reformateItems(listToFormat) {
    if (listToFormat.length > 0) {
        var itemsNames = AllItems.map(x => x.name);
        $.each(itemsNames, function (index) {
            var items = listToFormat.filter(x => x.name == itemsNames[index]);
            if (items.length > 0) {
                var quantities = items.map(x => x.quantity);
                var reformatedItem = cloneItem(fetchItemByName(itemsNames[index]));
                reformatedItem.quantity = quantities.reduce(getSum);
                $.each(items, function (index) {
                    remove(listToFormat, items[index])
                })
                listToFormat.push(reformatedItem);
            }
        });
    }

    return listToFormat;
}
