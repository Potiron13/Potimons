var StartingScreenApp = {
    'controller' : new StartingScreenController(new StartingScreenView(), Equipe, Reserve, Items, Cartes),
}

$('document').ready(function(){
    StartingScreenApp.controller.init();
});
