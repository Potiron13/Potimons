var StartingScreenView = function () {
    this.newUser = null;
    this.logIn = null;
};

StartingScreenView.prototype = {

    render: function() {
            document.body.style.backgroundImage =  strPathStartingScreen;
            var newGameContainer = displayElementOnParent('div', strNewGameContainer, 'container container-table', '', $('body'));
            var startingGameRow = displayElementOnParent('div', strNewGameRow, 'vertical-center-row', '', newGameContainer);
            var modalBody = createModal(strLoadGameModal, strContinue);            
            displayButtons ('btnNewUser', 'New user', 'btn col-sm-4 col-sm-offset-4', this.newUser, startingGameRow);
            displayButtons ('btnLogIn', 'Log in', 'btn col-sm-4 col-sm-offset-4', this.logIn, startingGameRow);
    },
}
