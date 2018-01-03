function initialiserInsideHouse(Equipe) {
    listPlayer = [];
    $.each(Equipe, function(index){
        listPlayer.push(Equipe[index]);
    });
    var nombreMaximumEnnemie = 3;
    var listNomEnnemiePossible = ['potipuce','potimeche'];
    alimenterListeEnnemie(listNomEnnemiePossible, nombreMaximumEnnemie);
    var potironWalking = new GamingElement('potironWolrdMap', 'potironWalkingDown');
    var cristalSauvegarde = new GamingElement('cristalSauvegarde', 'savePoint');
    var listGamingElements = [potironWalking, cristalSauvegarde];
    $.each($('body').children(), function(index, child){
        if (!listGamingElements.find( x => x.id == child.id )) {
            child.remove();
        }
    });
    compteur = entierAleatoire(50, 100);
    document.body.style.backgroundImage =  "url(Images/worldMap.png)";
    initialiserMainMenu(Equipe);
    initialiserSaveMenu();
    initialiserEventWorldMap();
    displayListGamingElement(listGamingElements);
}
