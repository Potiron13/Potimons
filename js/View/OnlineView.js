var OnlineView = function () {

}

OnlineView.prototype = {
    render: function(viewModels, userId, startDuel) {
        var idModal = 'onlineModal';
        var view = this;
        var colClass = 'col-sm-2';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Online');
        var container = displayElementOnParent('div', 'onlineContainer', 'container', '', parent);
        var userRow = displayElementOnParent('div', 'onlineRow' + this.id, 'row', '', container);
        $.each(viewModels, function(index) {
            if (this.id != userId) {
                var user = this;
                var userCol = displayElementOnParent('div', 'userCol' + this.id, 'col-sm-12', this.name, userRow);
                displayButtons ('btnDuel' + this.id, 'Duel', 'BUTTON', function(){startDuel(user)}, parent);
            }
        });
    },
}
