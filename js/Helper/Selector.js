function deplacerSelectorClavier(event) {
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
        $('#colonneSelector' + selectedEnnemie.id).attr('class', 'col-sm-12 noSelector');
        selectedEnnemie = listEnnemies[index + 1];
        $('#colonneSelector' + selectedEnnemie.id).attr('class', 'col-sm-12 selector');
    }

    return selectedEnnemie;
}

function deplacerSelectorGauche(listEnnemies, selectedEnnemie) {
    index = listEnnemies.findIndex(x => x.id==selectedEnnemie.id);
    if (index != 0) {
        $('#colonneSelector' + selectedEnnemie.id).attr('class', 'col-sm-12 noSelector');
        selectedEnnemie = listEnnemies[index - 1];
        $('#colonneSelector' + selectedEnnemie.id).attr('class', 'col-sm-12 selector')
    }

    return selectedEnnemie;
}

function deplacerSelectorPremierEnnemie(listEnnemies) {
    $('#colonneSelector' + listEnnemies[0].id).attr('class', 'col-sm-12 selector')

    return listEnnemies[0];
}

function deplacerSelectorClick(elementClicked) {
    $('#colonneSelector' + selectedEnnemie.id).attr('class', 'col-sm-12 noSelector');
    selectedEnnemie = listEnnemies.find(x=>x.id == elementClicked.id.replace('colonne', ''));
    $('#colonneSelector' + selectedEnnemie.id).attr('class', 'col-sm-12 selector');

    return listEnnemies.find(x=>x.id == elementClicked.id.replace('colonne', ''));
}
