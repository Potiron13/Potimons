var OnlineView = function () {
this.modalBody = null;
}

OnlineView.prototype = {
    render: function(viewModels, userId, startDuel) {
        var idModal = 'onlineModal';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        this.modalBody = createModal(idModal, 'Online');
        this.renderDuelList(viewModels, userId, startDuel);
        this.renderChat();
    },

    renderDuelList: function(viewModels, userId, startDuel){
        var view = this;
        if ($('#' + 'duelCol').length) {
            $('#' + 'duelCol').empty();
        }
        var duelCol = displayElementOnParent('div', 'duelCol', 'col-sm-2', '', this.modalBody);
        var userRow = displayElementOnParent('div', 'onlineRow' + this.id, 'row', '', duelCol);
        $.each(viewModels, function(index) {
            if (this.id != userId) {
                var user = this;
                var userCol = displayElementOnParent('div', 'userCol' + this.id, 'col-sm-12', this.name, userRow);
                displayButtons ('btnDuel' + this.id, 'Duel', 'BUTTON', function(){startDuel(user)}, view.modalBody);
            }
        });
    },

    renderChat: function(){
        if ($('#' + 'chatCol').length) {
            $('#' + 'chatCol').empty();
        }
        var chatCol = displayElementOnParent('div', 'chatCol', 'col-sm-10', '', this.modalBody);
        var ulMessages = displayElementOnParent('ul', 'messages', '', '', chatCol);
        var messageForm = displayElementOnParent('form', 'messageForm', '', '', ulMessages);
        messageForm.attr('action', '');
        var messageInput = displayElementOnParent('input', 'm', '', '', messageForm);
        messageInput.attr('autocomplete', 'off');
        var buttonSend = displayElementOnParent('button', 'btnSendMessage', '', 'Envoyer', messageForm);
    },
}
