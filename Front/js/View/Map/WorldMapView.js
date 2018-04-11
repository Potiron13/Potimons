var WorldMapView = function () {
    this.displayMainMenu = null;
    this.displaySaveMenu = null;
    this.displayPotidex = null;
    this.displayOnline = null;
    this.displayProfil = null;
    this.displayShop = null;
    this.displaySaveMenu = null;
    this.deconnexion = null;
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
        $('body').on('hidden.bs.modal', function () {
            if($('.modal.in').length > 0)
            {
                $('body').addClass('modal-open');
            }
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
            {label: 'Déconnexion', id: 'liDeconnexion', functionOnClick: this.deconnexion},
        ]
        var navBar = createNavBar('navBarWorldMap', navItems, navBarcontainer);        
        var wrapper = displayElementOnParent('div', 'lauchCombatWrapper', 'col-sm-12 btnWrapper', '', $('body'));        
        var container = displayElementOnParent('div', 'lauchCombatContainer', 'container', '', wrapper);
        var jumbotron = displayElementOnParent('div', 'lauchCombatJumbotron', 'jumbotron', '', container);
        var jumbotronContainer = displayElementOnParent('div', 'lauchCombatJumbotronContainer', 'containerMarginTopBottom', '', jumbotron);        
        var btnRow = displayElementOnParent('div', 'btnLauchCombatRow', 'row', '', jumbotronContainer);
        $.each(listCarte, function() {
            const label = (this.arene === true) ? this.name : 'niveau ' + this.levelMin + ' - ' + this.levelMax;
            var btnLauchCombat = displayButtons('btnLauchCombat' + this.id, label, 'btnRed col-sm-4', null, btnRow);
            btnLauchCombat.css({height: '20%'});          
        });
    },

    renderTimeGame : function (timeGame) {
        var result = timeGame.toTimeString().split(' ')[0];
        $('#timer').html(result);
    },
}
