var StartingScreenApp = {
    'controller' : new StartingScreenController(new StartingScreenView(), Reserve, Items, Cartes, TimeGame, MonstresCapture, Users),
}

$('document').ready(function(){
    StartingScreenApp.controller.init();
});
