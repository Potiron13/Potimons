var WorldMapView = function () {
    this.displayMainMenu = null;
    this.displaySaveMenu = null;
    this.displayPotidex = null;
    this.displayOnline = null;
    this.initialiserSaveMenu = null;
    this.initialiserMainMenu = null;
    this.initialiserPotidex = null;
    this.initialiserOnline = null;
}

WorldMapView.prototype = {

    render : function (listCarte){
        $.each($('body').children(), function(index, child){
            child.remove();
        });
        document.body.style.backgroundImage =  "url(Images/Maps/worldMap.png)";
        this.initialiserSaveMenu.init();
        this.initialiserMainMenu.init();
        this.initialiserPotidex.init();
        this.initialiserOnline.init();
        var btnMenu = displayButtons('btnOuvrirMainMenu', 'Menu', 'btn btn-primary btnMainMenu', this.displayMainMenu, $('body'));
        var btnSaveMenu = displayButtons('btnOuvrirSaveMenu', 'Sauvegarder', 'btn btn-primary btnSaveMenu', this.displaySaveMenu, $('body'));
        var btnPotidex = displayButtons('btnOuvrirPotidex', 'Potidex', 'btn btn-primary btnPotidex', this.displayPotidex, $('body'));
        var btnOnline = displayButtons('btnGoOnline', 'Online', 'btn btn-primary btnOnline', this.displayOnline, $('body'));
        var timerRow = displayElementOnParent('div', 'timerRow', 'row', '', $('body'));
        timerRow.css({
            'color' : 'white'
        })
        var timerLabel = displayElementOnParent('div', 'timerLabel', 'col-sm-2', 'Temps de jeu : ', timerRow);
        var timer = displayElementOnParent('div', 'timer', 'col-sm-2', '', timerRow);
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
        var btnRow = displayElementOnParent('div', 'btnLauchCombatRow', 'row', '', jumbotron);
        $.each(listCarte, function() {
            var btnLauchCombat = displayButtons('btnLauchCombat' + this.id, 'niveau ' + this.levelMin + ' - ' + this.levelMax, 'btn btn-danger col-sm-4', null, btnRow);
            btnLauchCombat.css({
                'height': '20%',
            });
        });
    },

    renderTimeGame : function (timeGame) {
        var result = timeGame.toTimeString().split(' ')[0];
        $('#timer').html(result);
    }
}
