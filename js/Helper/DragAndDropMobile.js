
function dropOnRow(draggedElement, targetedElement, targetList, mainList, playerIdSufix) {
    var listSource;
    var playerId = draggedElement.id.replace(playerIdSufix, '')
    draggedElement.style = '';
    targetedElement.appendChild(draggedElement);
    if (mainList.find(x=>x.id == playerId)) {
        listSource = mainList;
    }else {
        listSource = targetList;
    }
    targetList.push(listSource.find(x=>x.id == playerId));
    if (listSource.length) {
        remove(listSource, listSource.find(x=>x.id == playerId));
    }
    initialiserMainMenu(Equipe);
    initialiserSkillsMenu();
}
