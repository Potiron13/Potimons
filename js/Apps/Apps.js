var StartingScreenApp = {
    'controller' : new StartingScreenController(new StartingScreenView(), Equipe, Reserve, Items, Cartes, TimeGame, MonstresCapture),
}

$('document').ready(function(){
    StartingScreenApp.controller.init();
});
