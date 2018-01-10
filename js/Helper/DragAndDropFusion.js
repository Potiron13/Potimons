function allowDropFusion(ev, el) {
    if (el.id == 'rowFusion' && Fusion.length < 2) {
        ev.preventDefault();
    }else if (el.id == 'rowReserveFusion') {
        ev.preventDefault();
    }
}

function dragFusion(ev) {
    var data = JSON.stringify({'id' : ev.target.id, 'parent' : ev.target.parentElement.getAttribute('listdata')});
    ev.dataTransfer.setData("data", data);
}

function dropFusion(ev, el) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("data"));
    var playerId = data.id.replace('ReserveFusion', '');
    var elementToDrop = document.getElementById(data.id);
    el.appendChild(elementToDrop);
    if (data.parent == 'Reserve') {
        listPlayerSource = ReserveFusion;
    }else {
        listPlayerSource = Fusion;
    }
    if (el.getAttribute('listdata') == 'Reserve') {
        listPlayerCible = ReserveFusion
    }else {
        listPlayerCible = Fusion
    }
    listPlayerCible.push(listPlayerSource.find(x=>x.id == playerId));
    remove(listPlayerSource, listPlayerSource.find(x=>x.id == playerId));
    if (Fusion.length == 2) {
        $('#btnFusionner').show();
    }else {
        $('#btnFusionner').hide();
    }
}

function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}
