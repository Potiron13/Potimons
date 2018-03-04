function allowDropReserve(ev, el) {
    if (el.id == 'rowEquipeActuel' && Equipe.length <= 2) {
        ev.preventDefault();
    }else if (el.id == 'rowReserve' && Equipe.length > 1) {
        ev.preventDefault();
    }
}

function dragReserve(ev) {
    var data = JSON.stringify({'id' : ev.target.id, 'parent' : ev.target.parentElement.getAttribute('listdata')});
    ev.dataTransfer.setData("data", data);
}

function dropReserve(ev, el) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("data"));
    var playerId = data.id.replace('Reserve', '');
    var elementToDrop = document.getElementById(data.id);
    el.appendChild(elementToDrop);
    if (data.parent == 'Reserve') {
        listPlayerSource = Reserve;
    }else {
        listPlayerSource = Equipe;
    }
    if (el.getAttribute('listdata') == 'Reserve') {
        listPlayerCible = Reserve
    }else {
        listPlayerCible = Equipe
    }
    listPlayerCible.push(listPlayerSource.find(x=>x.id == playerId));
    remove(listPlayerSource, listPlayerSource.find(x=>x.id == playerId));
    initialiserMainMenu(Equipe);
    initialiserSkillsMenu();
}

function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}
