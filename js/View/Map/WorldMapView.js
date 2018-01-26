var WorldMapView = function () {
    this.displayMainMenu = null;
    this.displaySaveMenu = null;
    this.initialiserSaveMenu = null;
    this.initialiserMainMenu = null;
}

WorldMapView.prototype = {

    render : function (listCarte){
        $.each($('body').children(), function(index, child){
            child.remove();
        });
        document.body.style.backgroundImage =  "url(Images/Maps/worldMap.png)";
        this.initialiserSaveMenu.init();
        this.initialiserMainMenu.init();
        var btnMenu = displayButtons('btnOuvrirMainMenu', 'Menu', 'btn btn-primary btnMainMenu', this.displayMainMenu, $('body'));
        var btnSaveMenu = displayButtons('btnOuvrirSaveMenu', 'Sauvegarder', 'btn btn-primary btnSaveMenu', this.displaySaveMenu, $('body'));
        var seperationTopRow = displayElementOnParent('div', 'seperationTopRow', 'col-sm-12', '', $('body'));
        seperationTopRow.css({
            'height' : '20%',
        });
        var wrapper = displayElementOnParent('div', 'lauchCombatWrapper', 'col-sm-12 btnWrapper', '', $('body'));
        wrapper.css({
            'height': '50%',
        })
        var container = displayElementOnParent('div', 'lauchCombatContainer', 'container', '', wrapper);
        container.css({
            'height': '100%',
        })
        var jumbotron = displayElementOnParent('div', 'lauchCombatJumbotron', 'jumbotron', '', container);
        jumbotron.css({
            'height': '100%',
        })
        var seperationTopBtnRow = displayElementOnParent('div', 'seperationTopBtnRow', 'col-sm-12', '', jumbotron);
        seperationTopBtnRow.css({
            'height': '20%',
        })
        $.each(listCarte, function() {
            var btnLauchCombat = displayButtons('btnLauchCombat' + this.id, 'niveau ' + this.levelMin + ' - ' + this.levelMax, 'btn btn-danger col-sm-4', null, jumbotron);
            btnLauchCombat.css({
                'height': '20%',
            })
            btnLauchCombat.hide();
        });
    },
}
