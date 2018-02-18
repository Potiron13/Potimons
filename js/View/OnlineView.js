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
        displayElementOnParent('div', 'onlineRow', 'row onlineRow', '', this.modalBody);
        this.renderDuelList(viewModels, userId, startDuel);
        this.renderChat();
    },

    renderDuelList: function(viewModels, userId, duelQuery){
        var view = this;
        var duelCol;
        if ($('#' + 'duelCol').length) {
            $('#' + 'duelCol').empty();
            duelCol = $('#' + 'duelCol');
        }else {
            duelCol = displayElementOnParent('div', 'duelCol', 'col-sm-2 duelCol', '', $('#onlineRow'));
        }
        var duelRow = displayElementOnParent('div', 'duelRow', 'row', '', duelCol);
        $.each(viewModels, function(index) {
            if (this.id != userId) {
                var user = this;
                var userRow = displayElementOnParent('div', 'userRow' + this.id, 'row', '', duelRow);
                var userCol = displayElementOnParent('div', 'userCol' + this.id, 'col-sm-10', this.name, userRow);
                displayButtons ('btnDuel' + this.id, 'Duel', 'BUTTON', function(){duelQuery(user)}, userRow);
            }
        });
    },

    renderChat: function(){
        var chatCol;
        if ($('#' + 'chatCol').length) {
            $('#' + 'chatCol').empty();
            chatCol = $('#' + 'chatCol')
        }else {
            chatCol = displayElementOnParent('div', 'chatCol', 'col-sm-10 chatCol', '', $('#onlineRow'));
        }
        var ulMessages = displayElementOnParent('ul', 'messages', '', '', chatCol);
        var messageForm = displayElementOnParent('form', 'messageForm', '', '', ulMessages);
        messageForm.attr('action', '');
        var messageContainer = displayElementOnParent('div', 'messageContainer', 'col-sm-12', '', messageForm);
        var messageInput = displayElementOnParent('input', 'm', '', '', messageForm);
        messageInput.attr('autocomplete', 'off');
        messageInput.css({
            'width' : '100%'
        });
        var buttonSend = displayElementOnParent('button', 'btnSendMessage', '', 'Envoyer', messageForm);
    },

    renderDuelQueryChallenging: function(viewModel) {
        var btn = $('#btnDuel' + viewModel.id);
        btn.html('En attente');
        btn.prop('disabled', true);
    },

    renderDuelQueryChallenged: function(viewModel) {
        var btn = $('#btnDuel' + viewModel.id);
        btn.html('Accepter');
    },
}
