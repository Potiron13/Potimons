var WorldMapView = function () {
    this.displayMainMenu = null;
    this.displaySaveMenu = null;
    this.displayPotidex = null;
    this.displayOnline = null;
    this.displayProfil = null;
    this.displayShop = null;
    this.displaySaveMenu = null;
    this.initialiserMainMenu = null;
    this.initialiserPotidex = null;
    this.initialiserOnline = null;
    this.initialiserProfil = null;
    this.initialiserSaveMenu = null;
}

WorldMapView.prototype = {

    render : function (listCarte){
        $.each($('body').children(), function(index, child){
            child.remove();
        });
        document.body.style.backgroundImage =  "url(Images/Maps/worldMap.png)";
        this.initialiserMainMenu.init();
        this.initialiserPotidex.init();
        this.initialiserOnline.init();
        this.initialiserProfil.init();
        this.initialiserShop.init();
        this.initialiserSaveMenu.init();
        var navBarcontainer = displayElementOnParent('div', 'navBarcontainer', 'container', '', $('body'));
        var navItems = [
            {label: 'Menu', id: 'liMenu', functionOnClick: this.displayMainMenu},
            {label: 'Sauvegarder', id: 'liSauvegarder', functionOnClick: this.displaySaveMenu},
            {label: 'Potidex', id: 'liPotidex', functionOnClick: this.displayPotidex},
            {label: 'Online', id: 'liOnline', functionOnClick: this.displayOnline},
            {label: 'Profil', id: 'liProfil', functionOnClick: this.displayProfil},
            {label: 'Shop', id: 'liShop', functionOnClick: this.displayShop},
        ]
        var navBar = createNavBar('navBarWorldMap', navItems, navBarcontainer);
        var gameInfoRow = displayElementOnParent('div', 'gameInfoRow', 'row', '', $('body'));
        gameInfoRow.css({
            'color' : 'white'
        })
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
            'height': '20%'
        })
        var btnRow = displayElementOnParent('div', 'btnLauchCombatRow', 'row', '', jumbotron);
        $.each(listCarte, function() {
            var btnLauchCombat = displayButtons('btnLauchCombat' + this.id, 'niveau ' + this.levelMin + ' - ' + this.levelMax, 'btn btn-danger col-sm-4', null, btnRow);
            btnLauchCombat.css({height: '20%'});          
        });
    },

    renderTimeGame : function (timeGame) {
        var result = timeGame.toTimeString().split(' ')[0];
        $('#timer').html(result);
    }
}
