var CombatViewListEnnemie = function (parent) {
    this.parent = parent;
}

CombatViewListEnnemie.prototype = {
    displayEnnemieList : function (listEnnemie) {
        var parent = this.parent
        $.each(listEnnemie,function(index){
            var colonnePlayer = displayElementOnParent('div', "colonne" + listEnnemie[index].id, 'col-sm-' + 12/listEnnemie.length, '', parent);
            var colonneSelector = displayElementOnParent('div', "colonneSelector" + listEnnemie[index].id, 'col-sm-' + 12/listEnnemie.length + ' noSelector', '', colonnePlayer);
            var colImage = displayElementOnParent('div', listEnnemie[index].id, "col-sm-12 colonneIdle text-center", "", colonnePlayer);
            var playerImg = document.createElement('img');
            playerImg.src =  listEnnemie[index].gentil ? listEnnemie[index].srcDos : listEnnemie[index].src;
            colImage.append(playerImg);
        });
    }
}
