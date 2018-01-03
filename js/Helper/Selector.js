function deplacerSelector(event) {
    if(event.keyCode == 37) {
        selectedEnnemie = deplacerSelectorGauche(listEnnemies, selectedEnnemie);
    }
    else if(event.keyCode == 39) {
        selectedEnnemie = deplacerSelectorDroite(listEnnemies, selectedEnnemie);
    }
}

function deplacerSelectorDroite(listEnnemies, selectedEnnemie) {
    index = listEnnemies.findIndex(x => x.id==selectedEnnemie.id);
    if (listEnnemies.length != index + 1) {
        selectedEnnemie = listEnnemies[index + 1];
        $('#selectorCol').remove();
        var elementSelector = document.createElement('div');
        elementSelector.id = "selectorCol";
        elementSelector.className = 'col-sm-' + 12 + " selector";
        $('#' + "colonne" + selectedEnnemie.id ).prepend(elementSelector);
    }
    return selectedEnnemie;
}

function deplacerSelectorGauche(listEnnemies, selectedEnnemie) {
    index = listEnnemies.findIndex(x => x.id==selectedEnnemie.id);
    if (index != 0) {
        selectedEnnemie = listEnnemies[index - 1];
        $('#selectorCol').remove();
        var elementSelector = document.createElement('div');
        elementSelector.id = "selectorCol";
        elementSelector.className = 'col-sm-' + 12 + " selector";
        $('#' + "colonne" + selectedEnnemie.id ).prepend(elementSelector);
    }
    return selectedEnnemie;
}

function deplacerSelectorPremierEnnemie(listEnnemies) {
        $('#selectorCol').remove();
        var elementSelector = document.createElement('div');
        elementSelector.id = "selectorCol";
        elementSelector.className = 'col-sm-' + 12 + " selector";
        $('#' + "colonne" + listEnnemies[0].id ).prepend(elementSelector);
    return listEnnemies[0];
}
