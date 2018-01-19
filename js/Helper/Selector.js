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
