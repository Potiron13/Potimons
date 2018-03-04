var SelectorController = function (listEnnemie) {
    this.selectedEnnemie;
    this.listEnnemie = listEnnemie;
};

SelectorController.prototype = {
    getSelectedEnnemie : function() {
        return this.selectedEnnemie;
    },

    setSelectedEnnemie : function(ennemie) {
        this.selectedEnnemie = ennemie;
    },

    deplacerSelectorClick : function(elementClicked) {
        $('#colonneSelector' + this.selectedEnnemie.id).attr('class', 'col-sm-12 noSelector');
        this.selectedEnnemie = listEnnemies.find(x=>x.id == elementClicked.id.replace('colonne', ''));
        $('#colonneSelector' + this.selectedEnnemie.id).attr('class', 'col-sm-12 selector');

        //return listEnnemies.find(x=>x.id == elementClicked.id.replace('colonne', ''));
    },

    deplacerSelectorClavier : function(event) {
        if(event.keyCode == 37) {
            this.selectedEnnemie = deplacerSelectorGauche(this.listEnnemie, this.selectedEnnemie);
        }
        else if(event.keyCode == 39) {
            this.selectedEnnemie = deplacerSelectorDroite(this.listEnnemie, this.selectedEnnemie);
        }
    }
}
