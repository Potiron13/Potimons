var StartingScreenView = function () {    
};

StartingScreenView.prototype = {

    render: function() {
            document.body.style.backgroundImage =  strPathStartingScreen;
            document.body.style.height = '100%';        
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";      
            var newGameContainer = displayElementOnParent('div', strNewGameContainer, 'container container-table', '', $('body'));
            var startingGameRow = displayElementOnParent('div', strNewGameRow, 'vertical-center-row rowBigBtn', '', newGameContainer);
            var modalBody = createModal(strLoadGameModal, strContinue);            
            displayButtons ('btnNewUser', 'New user', 'col-sm-4 col-sm-offset-4', this.displayNewUser, startingGameRow);
            displayButtons ('btnLogIn', 'Log in', 'col-sm-4 col-sm-offset-4', this.displayLogIn, startingGameRow);
    },

    renderLogIn: function(){
        var idModal = 'modalLogIn';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var modalBody = createModal(idModal, 'Log In');
        var inputList = [
            { label: 'Pseudo', id: 'logInPseudoId', type: 'text' },
            { label: 'Password', id: 'logInPasswordId', type: 'password' },
            { label: '', id: 'logInSubmitId', type: 'submit' },
        ];
        var form = createForm('LogInForm', inputList, modalBody);   
    },

    renderNewUser: function() {
        var idModal = 'modalNewUser';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var modalBody = createModal(idModal, 'New User');
        var inputList = [
            { label: 'Pseudo', id: 'newUserPseudoId', type: 'text' },
            { label: 'Email', id: 'newUserEmailId', type: 'email' },
            { label: 'Password', id: 'newUserPasswordId', type: 'password' },
            { label: '', id: 'newUserSubmitId', type: 'submit' },
        ];
        var form = createForm('NewUserForm', inputList, modalBody);
    },
    
    displayLogIn: function(){
        $('#modalLogIn').modal();
    },
    
    displayNewUser: function(){
        $('#modalNewUser').modal();
    },
}
